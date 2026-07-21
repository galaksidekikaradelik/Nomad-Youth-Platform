import apiClient from "./apiClient";

export async function addLike(userId, projectId) {
  const { data } = await apiClient.post(
    `/v1/likes/add?userId=${userId}&projectId=${projectId}`
  );
  return data;
}

export async function removeLike(userId, projectId) {
  await apiClient.delete(
    `/v1/likes/remove?userId=${userId}&projectId=${projectId}`
  );
}

export async function getUserLikes(userId) {
  const { data } = await apiClient.get(`/v1/likes/${userId}`);
  return data;
}