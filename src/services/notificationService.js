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

export async function fetchNotificationSettings() {
  const { data } = await apiClient.get("/notification-settings");
  return data;
}

export async function updateNotificationSettings(settings) {
  const { data } = await apiClient.put("/notification-settings", settings);
  return data;
}