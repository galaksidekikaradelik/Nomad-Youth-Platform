import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";

const STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

// Backend-dən gələn RuntimeException mesajlarını istifadəçi dostu mətnə çeviririk.
// Uyğunluq tapılmasa, backend-dən gələn mesaj olduğu kimi göstərilir.
const ERROR_MESSAGES = {
  "Token tapılmadı": "Token etibarsızdır.",
  "Token müddəti bitib": "Tokenin müddəti bitib.",
};

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(STATUS.LOADING);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus(STATUS.ERROR);
      setErrorMessage("Token etibarsızdır.");
      return;
    }

    let isMounted = true;

    authService
      .verifyEmail(token)
      .then(() => {
        if (!isMounted) return;
        setStatus(STATUS.SUCCESS);
      })
      .catch((err) => {
        if (!isMounted) return;
        const backendMessage = err?.response?.data?.message || err?.message;
        setErrorMessage(ERROR_MESSAGES[backendMessage] || backendMessage || "Email təsdiqlənmədi.");
        setStatus(STATUS.ERROR);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="verify-email-page">
      <div className="verify-email-card">
        {status === STATUS.LOADING && (
          <>
            <div className="verify-email-spinner" aria-hidden="true" />
            <p>Email təsdiqlənir...</p>
          </>
        )}

        {status === STATUS.SUCCESS && (
          <>
            <div className="verify-email-icon verify-email-icon--success">✓</div>
            <h1>Uğurlu!</h1>
            <p>Email ünvanınız uğurla təsdiqləndi.</p>
            <button
              type="button"
              className="verify-email-button"
              onClick={() => navigate("/login")}
            >
              Login səhifəsinə keç
            </button>
          </>
        )}

        {status === STATUS.ERROR && (
          <>
            <div className="verify-email-icon verify-email-icon--error">✕</div>
            <h1>Xəta baş verdi</h1>
            <p>{errorMessage}</p>
            <button
              type="button"
              className="verify-email-button"
              onClick={() => navigate("/login")}
            >
              Login səhifəsinə keç
            </button>
          </>
        )}
      </div>
    </div>
  );
}