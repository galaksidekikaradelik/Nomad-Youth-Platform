import { useCallback, useEffect, useState } from "react";
import { ApplicationStatusContext } from "./ApplicationStatusContext";
import { useAuth } from "../hooks/useAuth";
import * as applicationStatusService from "../services/applicationStatusService";
import { mapOpportunity } from "../api/mappers/opportunityMapper";

const INITIAL_STATE = {
  statusMap: {},
  statusItems: [],
  loading: false,
};

export function ApplicationStatusProvider({ children }) {
  const { user } = useAuth();
  const [state, setState] = useState(INITIAL_STATE);
  const { statusMap, statusItems, loading } = state;

  const refreshStatuses = useCallback(async (userId) => {
    if (!userId) {
      setState((prev) => ({ ...prev, statusMap: {}, statusItems: [] }));
      return;
    }

    const list = await applicationStatusService.fetchMyProjects(userId);
    const safeList = list || [];

    const map = {};
    const items = [];

    safeList.forEach((item) => {
      const oppId = item.opportunity?.id;
      const rawStatus = item.status;
      if (oppId == null || !rawStatus) return;
      if (rawStatus === "SAVED" || rawStatus === "FAVORITE") return;

      const statusKey = rawStatus.toLowerCase();
      map[oppId] = statusKey;

      const mappedOpp = mapOpportunity(item.opportunity);
      if (mappedOpp) {
        items.push({ opp: mappedOpp, status: statusKey });
      }
    });

    setState((prev) => ({ ...prev, statusMap: map, statusItems: items }));
  }, []);

  useEffect(() => {
    if (!user?.id) {
      // İstifadəçi çıxış edəndə (əvvəllər user olub, indi yoxdursa)
      // state-i sıfırlayırıq. Reference-bərabərlik yoxlaması ilə
      // React artıq INITIAL_STATE-də olan halda əlavə render-i
      // avtomatik bypass edir (updater eyni referansı qaytarsa,
      // React heç bir re-render tətikləmir).
      //
      // Qalan sinxron setState burada qəsdəndir: bu, Effects-in
      // məhz nəzərdə tutulduğu "xarici auth state-i React state-i
      // ilə sinxronlaşdırmaq" ssenarisidir, ona görə xəbərdarlığı
      // burada bilərəkdən susdururuq.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState((prev) => (prev === INITIAL_STATE ? prev : INITIAL_STATE));
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));
    refreshStatuses(user.id)
      .catch((err) => console.error("Application status yüklənmədi:", err))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, [user?.id, refreshStatuses]);

  const setStatus = useCallback(
    async (opportunityId, statusKey) => {
      if (!user?.id || opportunityId == null || !statusKey) return;

      let prevStatus;
      setState((prev) => {
        prevStatus = prev.statusMap[opportunityId];
        return {
          ...prev,
          statusMap: { ...prev.statusMap, [opportunityId]: statusKey },
        };
      });

      try {
        await applicationStatusService.setApplicationStatus(
          user.id,
          opportunityId,
          statusKey.toUpperCase()
        );
        await refreshStatuses(user.id);
      } catch (err) {
        console.error("Status yenilənmədi, geri qaytarılır:", err);
        setState((prev) => {
          const next = { ...prev.statusMap };
          if (prevStatus) next[opportunityId] = prevStatus;
          else delete next[opportunityId];
          return { ...prev, statusMap: next };
        });
      }
    },
    [user?.id, refreshStatuses]
  );

  return (
    <ApplicationStatusContext.Provider
      value={{ statusMap, statusItems, setStatus, loading }}
    >
      {children}
    </ApplicationStatusContext.Provider>
  );
}