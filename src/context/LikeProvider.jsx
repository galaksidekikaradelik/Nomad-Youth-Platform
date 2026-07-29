import { useEffect, useState, useCallback } from "react";
import { LikeContext } from "./LikeContext";
import { useAuth } from "../hooks/useAuth";
import * as likeService from "../services/likeService";

export function LikeProvider({ children }) {
  const { user } = useAuth();
  const [likedOpportunities, setLikedOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLikedOpportunities([]);
      return;
    }
    setLoading(true);
    likeService
      .getUserLikes(user.id)
      .then((items) => {
        const opps = items
          .map((item) => item.opportunity)
          .filter(Boolean);
        setLikedOpportunities(opps);
      })
      .catch((err) => console.error("Like-lar yüklənmədi:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const likedIds = new Set(likedOpportunities.map((opp) => opp.id));

  const toggleLike = useCallback(
    async (projectId) => {
      if (!user) return;
      const isLiked = likedOpportunities.some((opp) => opp.id === projectId);

      try {
        if (isLiked) {
          await likeService.removeLike(user.id, projectId);
          setLikedOpportunities((prev) => prev.filter((opp) => opp.id !== projectId));
        } else {
          await likeService.addLike(user.id, projectId);
          const items = await likeService.getUserLikes(user.id);
          setLikedOpportunities(items.map((item) => item.opportunity).filter(Boolean));
        }
      } catch (err) {
        console.error("Like yenilənmədi:", err);
      }
    },
    [user, likedOpportunities]
  );

  return (
    <LikeContext.Provider
      value={{ likedIds, likedOpportunities, toggleLike, loading }}
    >
      {children}
    </LikeContext.Provider>
  );
}