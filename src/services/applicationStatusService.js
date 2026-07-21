import apiClient from "../api/axios";

export async function fetchMyProjects(userId) {
  const { data } = await apiClient.get(`/v1/projects/mine`, {
    params: { userId },
  });
  return data;
}

export async function setApplicationStatus(userId, opportunityId, status) {
  const { data } = await apiClient.put(`/v1/projects/status`, null, {
    params: { userId, opportunityId, status },
  });
  return data;
}