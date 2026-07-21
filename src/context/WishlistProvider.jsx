import { useEffect, useState, useCallback, useMemo } from "react";
import { WishlistContext } from "./WishlistContext";
import { useAuth } from "../hooks/useAuth";
import * as wishlistService from "../services/wishlistService";
import opportunities from "../data/opportunities.json";

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setSavedIds(new Set());
      return;
    }
    setLoading(true);
    wishlistService
      .getUserWishlist(user.id)
      .then((items) => {
        // DİQQƏT: backend cavabında layihə id-si hansı sahədədirsə
        // (projectId? project.id?), buraya uyğunlaşdırın
        const ids = items.map(
          (item) => item.projectId ?? item.project?.id ?? item.id
        );
        setSavedIds(new Set(ids));
      })
      .catch((err) => console.error("Wishlist yüklənmədi:", err))
      .finally(() => setLoading(false));
  }, [user]);

  // savedIds-ə uyğun tam opportunity obyektlərini opportunities.json-dan
  // çıxarırıq (Profile.jsx-də likedOpportunities-in etdiyi kimi)
  const savedOpportunities = useMemo(() => {
    if (savedIds.size === 0) return [];
    return opportunities.filter((opp) => savedIds.has(opp.id));
  }, [savedIds]);

  const toggleSave = useCallback(
    async (projectId) => {
      if (!user) return;
      const isSaved = savedIds.has(projectId);

      setSavedIds((prev) => {
        const next = new Set(prev);
        isSaved ? next.delete(projectId) : next.add(projectId);
        return next;
      });

      try {
        if (isSaved) {
          await wishlistService.removeFromWishlist(user.id, projectId);
        } else {
          await wishlistService.addToWishlist(user.id, projectId);
        }
      } catch (err) {
        console.error("Wishlist yenilənmədi:", err);
        setSavedIds((prev) => {
          const next = new Set(prev);
          isSaved ? next.add(projectId) : next.delete(projectId);
          return next;
        });
      }
    },
    [user, savedIds]
  );

  return (
    <WishlistContext.Provider
      value={{ savedIds, savedOpportunities, toggleSave, loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
}