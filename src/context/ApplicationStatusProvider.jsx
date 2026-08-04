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
      if (!user?.id || opportunityId == null) return;

      const isReset = !statusKey || statusKey === "select";
      const backendStatus = isReset ? null : statusKey.toUpperCase();

      let prevStatus;
      setState((prev) => {
        prevStatus = prev.statusMap[opportunityId];
        const nextMap = { ...prev.statusMap };

        if (isReset) {
          delete nextMap[opportunityId];
        } else {
          nextMap[opportunityId] = statusKey;
        }

        return { ...prev, statusMap: nextMap };
      });

      try {
        await applicationStatusService.setApplicationStatus(
          user.id,
          opportunityId,
          backendStatus
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