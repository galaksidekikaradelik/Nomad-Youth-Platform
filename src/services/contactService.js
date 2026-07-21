import apiClient from "../api/axios";

// POST /api/contact/send
// Backend ResponseEntity<String> qaytarır (JSON yox, sadə mətn).
export async function sendContactMessage({ name, email, subject, message }) {
  const { data } = await apiClient.post("/contact/send", {
    name,
    email,
    subject,
    message,
  });
  return data;
}