import apiClient from "./axios";

export async function getWishlist() {
  const { data } = await apiClient.get("/wishlist");
  return data;
}

export async function addToWishlist(opportunityId) {
  const { data } = await apiClient.post("/wishlist", { opportunityId });
  return data;
}

export async function removeFromWishlist(opportunityId) {
  const { data } = await apiClient.delete(`/wishlist/${opportunityId}`);
  return data;
}