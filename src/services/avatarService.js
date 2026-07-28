import apiClient from "../api/axios";

/**
 * Avatar upload/removal.
 *
 * BACKEND CONTRACT (to be implemented — see AVATAR_API_SPEC.md shared
 * alongside this file for full details):
 *
 *   PUT    /v1/users/avatar?userId={userId}   (multipart/form-data, field "file")
 *          -> { avatarUrl: string }
 *
 *   DELETE /v1/users/avatar?userId={userId}
 *          -> { avatarUrl: null }
 *
 * ---------------------------------------------------------------------
 * TEST MODE (until the backend is ready)
 * ---------------------------------------------------------------------
 * Set USE_MOCK = true below to test the full flow (upload → AuthContext
 * → Navbar/Profile sync → delete) without any backend at all. The image
 * is base64-encoded and kept in this browser's localStorage, per user id
 * — it's only for local testing, not a real upload, and won't be visible
 * to other users or persist across browsers/devices.
 *
 * When the backend is live: just flip USE_MOCK to false (or delete the
 * mock block entirely). Nothing in AuthProvider.jsx, Avatar.jsx, or
 * Profile.jsx needs to change — they only call uploadAvatar/deleteAvatar
 * from this file.
 */
const USE_MOCK = true;

const MOCK_DELAY_MS = 600;
const mockKey = (userId) => `nomad_mock_avatar_${userId}`;

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Fayl oxunmadı"));
    reader.readAsDataURL(file);
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mockUploadAvatar(userId, file) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Yalnız şəkil faylları qəbul olunur");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Şəkil 5MB-dan böyük ola bilməz");
  }

  const dataUrl = await fileToDataUrl(file);
  await wait(MOCK_DELAY_MS);
  localStorage.setItem(mockKey(userId), dataUrl);
  return { avatarUrl: dataUrl };
}

async function mockDeleteAvatar(userId) {
  await wait(MOCK_DELAY_MS);
  localStorage.removeItem(mockKey(userId));
  return { avatarUrl: null };
}

export async function uploadAvatar(userId, file) {
  if (USE_MOCK) return mockUploadAvatar(userId, file);

  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.put(`/v1/users/avatar`, formData, {
    params: { userId },
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function deleteAvatar(userId) {
  if (USE_MOCK) return mockDeleteAvatar(userId);

  const { data } = await apiClient.delete(`/v1/users/avatar`, {
    params: { userId },
  });
  return data;
}