import apiClient from "../api/axios";

export async function sendContactMessage({ name, email, subject, message }) {
  const { data } = await apiClient.post("/contact/send", {
    name,
    email,
    subject,
    message,
  });
  return data;
}