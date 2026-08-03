import apiClient from "../api/axios";

const BACKEND_ORIGIN = "http://localhost:8080";

function toAbsoluteUrl(url) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${BACKEND_ORIGIN}${url}`;
}

export async function uploadAvatar(userId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post("/profile/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return { avatarUrl: toAbsoluteUrl(data.profileImageUrl) };
}

export async function deleteAvatar() {
  await apiClient.delete("/profile/image");
  return { avatarUrl: null };
}