import apiClient from "../api/axios";

export async function fetchMyNotifications() {
  const { data } = await apiClient.get("/notifications");
  return data;
}

export async function markAsRead(notificationId) {
  const { data } = await apiClient.patch(`/notifications/${notificationId}/read`);
  return data;
}

export async function fetchUnreadCount() {
  const { data } = await apiClient.get("/notifications/unread-count");
  return data; 
}