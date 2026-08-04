import { useEffect, useState, useCallback, useMemo } from "react";
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
        const opps = items.map((item) => item.opportunity).filter(Boolean);
        setLikedOpportunities(opps);
      })
      .catch((err) => console.error("Like-lar yüklənmədi:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const likedIds = useMemo(
    () => new Set(likedOpportunities.map((opp) => opp.id)),
    [likedOpportunities]
  );

  const toggleLike = useCallback(
    async (opportunity) => {
      if (!user || !opportunity?.id) return;

      const projectId = opportunity.id;
      const isLiked = likedOpportunities.some((opp) => opp.id === projectId);
      const previous = [...likedOpportunities];

      if (isLiked) {
        setLikedOpportunities((prev) =>
          prev.filter((opp) => opp.id !== projectId)
        );

        try {
          await likeService.removeLike(user.id, projectId);
        } catch (err) {
          console.error("Like silinmədi:", err);
          setLikedOpportunities(previous); 
        }
      } else {
        setLikedOpportunities((prev) => [...prev, opportunity]);

        try {
          const created = await likeService.addLike(user.id, projectId);

          setLikedOpportunities((prev) =>
            prev.map((opp) =>
              opp.id === projectId ? created.opportunity : opp
            )
          );
        } catch (err) {
          console.error("Like əlavə olunmadı:", err);
          setLikedOpportunities(previous); 
        }
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