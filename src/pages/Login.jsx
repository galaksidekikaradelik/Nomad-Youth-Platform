import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import "../style/pages/auth.css";

export default function Login() {
  const { t } = useLanguage();

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">{t("auth_login_title")}</h1>

        <p className="auth-subtitle">
          {t("auth_login_subtitle")}
        </p>

        <form>

          <div className="auth-group">
            <label>{t("auth_email")}</label>
            <input
              className="auth-input"
              type="email"
              placeholder={t("auth_email_placeholder")}
            />
          </div>

          <div className="auth-group">
            <label>{t("auth_password")}</label>
            <input
              className="auth-input"
              type="password"
              placeholder={t("auth_password_placeholder")}
            />
          </div>

          <button className="auth-button">
            {t("auth_sign_in")}
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