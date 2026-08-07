import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

import { useLanguage } from "../hooks/useLanguage";

export default function AuthPromptModal({ open, onClose }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (!open) return null;

  const handleRegisterClick = () => {
    onClose();
    navigate("/register");
  };

  return createPortal(
    <div className="auth-modal-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="auth-modal__close"
          onClick={onClose}
          aria-label={t("auth_prompt_close")}
        >
          ×
        </button>

        <div className="auth-modal__icon">
          <LockKeyhole size={30} strokeWidth={1.8} />
        </div>

        <h3 className="auth-modal__title">
          {t("auth_prompt_title")}
        </h3>

        <p className="auth-modal__desc">
          {t("auth_prompt_description")}
        </p>

        <div className="auth-modal__actions">
          <button
            className="btn-primary auth-modal__btn"
            onClick={handleRegisterClick}
          >
            {t("auth_prompt_register")}
          </button>

          <button
            className="btn-outline auth-modal__btn"
            onClick={onClose}
          >
            {t("auth_prompt_close")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

