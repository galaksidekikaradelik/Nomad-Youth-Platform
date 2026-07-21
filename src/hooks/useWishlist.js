import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist yalnız WishlistProvider daxilində işlədilə bilər");
  }
  return ctx;
}