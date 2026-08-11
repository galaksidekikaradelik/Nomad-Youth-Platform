import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import GoogleLoginButton from "../components/GoogleLoginButton";
import "../style/index.css";

export default function Login() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError(t("auth_error_login_required"));
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      const message =
        err?.response?.status === 401 || err?.response?.status === 400
          ? t("auth_error_invalid_credentials")
          : t("auth_error_login_failed");
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">{t("auth_login_title")}</h1>

        <p className="auth-subtitle">
          {t("auth_login_subtitle")}
        </p>

        {error && <p className="auth-error">{error}</p>}

        <GoogleLoginButton onSuccess={() => navigate("/")} />

        <div className="auth-divider">
          <span>{t("auth_or")}</span>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          <div className="auth-group">
            <label>{t("auth_email")}</label>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth_email_placeholder")}
            />
          </div>

          <div className="auth-group">
            <label>{t("auth_password")}</label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth_password_placeholder")}
            />
          </div>

          <button className="auth-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("auth_submitting") : t("auth_sign_in")}
          </button>

        </form>

        <div className="auth-footer">
          {t("auth_no_account")}
          {" "}
          <Link className="auth-link" to="/register">
            {t("auth_create_one")}
          </Link>
        </div>

      </div>
    </div>
  );
}