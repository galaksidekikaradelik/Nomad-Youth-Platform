import apiClient from "./axios";

export async function login(credentials) {
  // Login
  const { data } = await apiClient.post("/auth/login", credentials);

  if (!data.token) {
    throw new Error("Login uğursuz oldu. Token tapılmadı.");
  }

  // JWT-ni saxla
  localStorage.setItem("authToken", data.token);

  // Token ilə istifadəçini götür
  const meResponse = await apiClient.get("/auth/me");

  const user = meResponse.data.user;

  // İstifadəçini localStorage-də saxla
  localStorage.setItem("user", JSON.stringify(user));

  return user;
}

export async function register(payload) {
  const { data } = await apiClient.post("/auth/register", payload);

  // Register accessToken qaytarır
  if (data.accessToken) {
    localStorage.setItem("authToken", data.accessToken);

    const meResponse = await apiClient.get("/auth/me");

    const user = meResponse.data.user;

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  }

  return data;
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
}

export async function getCurrentUser() {
  const { data } = await apiClient.get("/auth/me");
  return data.user;
}