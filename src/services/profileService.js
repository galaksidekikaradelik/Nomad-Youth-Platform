import apiClient from "../api/axios";

export async function completeProfile(payload) {
  const { data } = await apiClient.post("/profile/complete", payload);
  return data.user ?? data;
}