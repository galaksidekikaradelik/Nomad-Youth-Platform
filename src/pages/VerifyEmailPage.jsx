import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, AlertCircle, LoaderCircle } from "lucide-react";

import { verifyEmail } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");

  const { refreshUser } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    verifyEmail(token)
      .then(async () => {
        setStatus("success");

        if (refreshUser) {
          await refreshUser();
        }
      })
      .catch((err) => {
        console.error("Email təsdiqi uğursuz oldu:", err);
        setStatus("error");
      });
  }, [searchParams, refreshUser]);

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="empty-state">

          {status === "loading" && (
            <>
              <div className="empty-state__icon">
                <LoaderCircle size={42} strokeWidth={1.8} />
              </div>

              <div className="empty-state__title">
                {t("verify_email_loading_title")}
              </div>

              <p className="empty-state__desc">
                {t("verify_email_loading_description")}
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="empty-state__icon">
                <CheckCircle size={42} strokeWidth={1.8} />
              </div>

              <div className="empty-state__title">
                {t("verify_email_success_title")}
              </div>

              <p className="empty-state__desc">
                {t("verify_email_success_description")}
              </p>

              <Link to="/dashboard" className="btn btn-primary">
                {t("verify_email_dashboard_button")}
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="empty-state__icon">
                <AlertCircle size={42} strokeWidth={1.8} />
              </div>

              <div className="empty-state__title">
                {t("verify_email_error_title")}
              </div>

              <p className="empty-state__desc">
                {t("verify_email_error_description")}
              </p>

              <Link to="/dashboard" className="btn btn-primary">
                {t("verify_email_dashboard_button")}
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  );
}