import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import GoogleLoginButton from "../components/GoogleLoginButton";
import AuthLayout from "../components/AuthLayout";
import { trackLoginSuccess } from "../services/analytics";
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
      trackLoginSuccess("email");
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
    <AuthLayout>
      <div className="auth-card">
        <h1 className="auth-title">{t("auth_login_title")}</h1>

        <p className="auth-subtitle">{t("auth_login_subtitle")}</p>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <GoogleLoginButton
          onSuccess={() => {
            trackLoginSuccess("google");
            navigate("/");
          }}
        />

        <div className="auth-divider">
          <span>{t("auth_or")}</span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-group">
            <label htmlFor="login-email">{t("auth_email")}</label>
            <input
              id="login-email"
              className="auth-input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth_email_placeholder")}
            />
          </div>

          <div className="auth-group">
            <label htmlFor="login-password">{t("auth_password")}</label>
            <input
              id="login-password"
              className="auth-input"
              type="password"
              autoComplete="current-password"
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
          {t("auth_no_account")}{" "}
          <Link className="auth-link" to="/register">
            {t("auth_create_one")}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}