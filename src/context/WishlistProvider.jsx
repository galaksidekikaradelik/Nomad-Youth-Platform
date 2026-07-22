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
        // DÜZƏLDİLDİ: statik opportunities.json-dan filtr etmək əvəzinə,
        // backend-in qaytardığı UserProject list-indən birbaşa daxili
        // "opportunity" obyektini çıxarırıq. Bu, elan Home-dan (statik
        // datadan) və ya İmkanlar-dan (backend-dən) saxlanmasından
        // asılı olmayaraq HƏMİŞƏ düzgün işləyir, çünki backend hər iki
        // halda öz DB-sindəki real Opportunity-ni qaytarır.
        const opps = items
          .map((item) => item.opportunity)
          .filter(Boolean);
        setSavedOpportunities(opps);
      })
      .catch((err) => console.error("Wishlist yüklənmədi:", err))
      .finally(() => setLoading(false));
  }, [user]);

  // savedIds indi savedOpportunities-dən törənir (Set kimi lazım olan
  // yerlərdə - məs. OpportunityCard-da "bu elan saxlanılıbmı?" sualı üçün)
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
          // Backend-dən təzə siyahını çəkirik ki, yeni saxlanılan elanın
          // tam (title, location, deadline və s.) datası da gəlsin.
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