import { useEffect, useState, useCallback, useMemo } from "react";
import { WishlistContext } from "./WishlistContext";
import { useAuth } from "../hooks/useAuth";
import * as wishlistService from "../services/wishlistService";

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setSavedOpportunities([]);
      return;
    }
    setLoading(true);
    wishlistService
      .getUserWishlist(user.id)
      .then((items) => {
        const opps = items.map((item) => item.opportunity).filter(Boolean);
        setSavedOpportunities(opps);
      })
      .catch((err) => console.error("Wishlist yüklənmədi:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const savedIds = useMemo(
    () => new Set(savedOpportunities.map((opp) => opp.id)),
    [savedOpportunities]
  );

  const toggleSave = useCallback(
    async (opportunity) => {
      if (!user || !opportunity?.id) return;

      const projectId = opportunity.id;
      const isSaved = savedOpportunities.some((opp) => opp.id === projectId);
      const previous = [...savedOpportunities];

      if (isSaved) {
        setSavedOpportunities((prev) =>
          prev.filter((opp) => opp.id !== projectId)
        );

        try {
          await wishlistService.removeFromWishlist(user.id, projectId);
        } catch (err) {
          console.error("Wishlist-dən silinmədi:", err);
          setSavedOpportunities(previous);
        }
      } else {
        setSavedOpportunities((prev) => [...prev, opportunity]);

        try {
          const created = await wishlistService.addToWishlist(user.id, projectId);

          setSavedOpportunities((prev) =>
            prev.map((opp) =>
              opp.id === projectId ? created.opportunity : opp
            )
          );
        } catch (err) {
          console.error("Wishlist-ə əlavə olunmadı:", err);
          setSavedOpportunities(previous); 
        }
      }
    },
    [user, savedOpportunities]
  );

  return (
    <WishlistContext.Provider
      value={{ savedIds, savedOpportunities, toggleSave, loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
}