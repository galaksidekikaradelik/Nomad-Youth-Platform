import apiClient from "./axios";

export async function login(credentials) {
  const { data } = await apiClient.post("/auth/login", credentials);

  if (!data.token) {
    throw new Error("Login uğursuz oldu. Token tapılmadı.");
  }
  localStorage.setItem("authToken", data.token);
  const meResponse = await apiClient.get("/auth/me");
  const user = meResponse.data.user;
  localStorage.setItem("user", JSON.stringify(user));

  return user;
}

export async function register(payload) {
  const { data } = await apiClient.post("/auth/register", payload);

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