import { useEffect, useState, useCallback, useMemo } from "react";
import { LikeContext } from "./LikeContext";
import { useAuth } from "../hooks/useAuth";
import * as likeService from "../services/likeService";
import opportunities from "../data/opportunities.json";

export function LikeProvider({ children }) {
  const { user } = useAuth();
  const [likedIds, setLikedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLikedIds(new Set());
      return;
    }
    setLoading(true);
    likeService
      .getUserLikes(user.id)
      .then((items) => {
        // DİQQƏT: backend cavabında layihə id-si hansı sahədədirsə
        // (projectId? project.id?), buraya uyğunlaşdırın
        const ids = items.map(
          (item) => item.projectId ?? item.project?.id ?? item.id
        );
        setLikedIds(new Set(ids));
      })
      .catch((err) => console.error("Like-lar yüklənmədi:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const likedOpportunities = useMemo(() => {
    if (likedIds.size === 0) return [];
    return opportunities.filter((opp) => likedIds.has(opp.id));
  }, [likedIds]);

  const toggleLike = useCallback(
    async (projectId) => {
      if (!user) return;
      const isLiked = likedIds.has(projectId);

      // Optimistic update
      setLikedIds((prev) => {
        const next = new Set(prev);
        isLiked ? next.delete(projectId) : next.add(projectId);
        return next;
      });

      try {
        if (isLiked) {
          await likeService.removeLike(user.id, projectId);
        } else {
          await likeService.addLike(user.id, projectId);
        }
      } catch (err) {
        console.error("Like yenilənmədi:", err);
        setLikedIds((prev) => {
          const next = new Set(prev);
          isLiked ? next.add(projectId) : next.delete(projectId);
          return next;
        });
      }
    },
    [user, likedIds]
  );

  return (
    <LikeContext.Provider
      value={{ likedIds, likedOpportunities, toggleLike, loading }}
    >
      {children}
    </LikeContext.Provider>
  );
}