import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="section">
      <div className="container">
        <div className="empty-state">
          <div className="empty-state__title">
            404
          </div>

          <h1 className="empty-state__title">
            {t("not_found_title")}
          </h1>

          <p className="empty-state__desc">
            {t("not_found_desc")}
          </p>

          <Link to="/" className="btn btn-primary">
            {t("back_home")}
          </Link>
        </div>
      </div>
    </div>
  );
}