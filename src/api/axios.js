import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  console.log("========== REQUEST ==========");
  console.log("REQUEST URL:", config.baseURL + config.url);
  console.log("METHOD:", config.method);
  console.log("REQUEST BODY:", config.data);
  console.log("AUTH TOKEN:", token ? "Var" : "Yox");
  console.log("=============================");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`API Error [${error.response.status}]:`, error.response.data);
    } else if (error.request) {
      console.error("API Error: no response received", error.request);
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;