import { useContext } from "react";
import { LikeContext } from "../context/LikeContext";

export function useLike() {
  const ctx = useContext(LikeContext);
  if (!ctx) {
    throw new Error("useLike yalnız LikeProvider daxilində işlədilə bilər");
  }
  return ctx;
}