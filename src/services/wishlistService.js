import apiClient from "./apiClient";

export async function addToWishlist(userId, projectId) {
  const { data } = await apiClient.post(
    `/v1/wishlist/add?userId=${userId}&projectId=${projectId}`
  );
  return data;
}

export async function removeFromWishlist(userId, projectId) {
  await apiClient.delete(
    `/v1/wishlist/remove?userId=${userId}&projectId=${projectId}`
  );
}

export async function getUserWishlist(userId) {
  const { data } = await apiClient.get(`/v1/wishlist/${userId}`);
  return data;
}