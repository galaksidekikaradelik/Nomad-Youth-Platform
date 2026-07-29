import { useEffect, useState, useCallback } from "react";
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
        const opps = items
          .map((item) => item.opportunity)
          .filter(Boolean);
        setSavedOpportunities(opps);
      })
      .catch((err) => console.error("Wishlist yüklənmədi:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const savedIds = new Set(savedOpportunities.map((opp) => opp.id));

  const toggleSave = useCallback(
    async (projectId) => {
      if (!user) return;
      const isSaved = savedOpportunities.some((opp) => opp.id === projectId);

      try {
        if (isSaved) {
          await wishlistService.removeFromWishlist(user.id, projectId);
          setSavedOpportunities((prev) => prev.filter((opp) => opp.id !== projectId));
        } else {
          await wishlistService.addToWishlist(user.id, projectId);
          const items = await wishlistService.getUserWishlist(user.id);
          setSavedOpportunities(items.map((item) => item.opportunity).filter(Boolean));
        }
      } catch (err) {
        console.error("Wishlist yenilənmədi:", err);
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