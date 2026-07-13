import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import "../style/pages/auth.css";

const EDUCATION_LEVELS = [
  "Orta təhsil",
  "Peşə təhsili",
  "Subbakalavr",
  "Bakalavr",
  "Magistratura",
  "Doktorantura",
  "Məzun",
];

const PASSWORD_MIN_LENGTH = 8;

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  birthDate: "",
  interests: [],
  university: "",
  educationLevel: "",
  major: "",
  acceptTerms: false,
  acceptMarketing: false,
};

// Kiçik yardımçı: məcburi sahələrin yanında qırmızı "*" göstərir.
function RequiredMark() {
  return (
    <span className="auth-required-mark" aria-hidden="true">
      *
    </span>
  );
}

export default function Register() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [errors, setErrors] = useState({});
  const [modalTab, setModalTab] = useState(null); // null | "privacy" | "terms"
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Frontend-only demo. Real Google OAuth backend/Supabase qoşulanda
  // bu funksiya əsl auth axını ilə əvəz olunacaq (authService.js üzərindən).
  const handleGoogleSignup = () => {
    setFormData((prev) => ({
      ...prev,
      firstName: prev.firstName || "Google",
      lastName: prev.lastName || "İstifadəçi",
      email: prev.email || "google.istifadeci@example.com",
    }));
    setIsGoogleSignup(true);
  };

  const validate = () => {
    const newErrors = {};

    if (!isGoogleSignup) {
      if (!formData.firstName.trim()) newErrors.firstName = t("auth_error_first_name");
      if (!formData.lastName.trim()) newErrors.lastName = t("auth_error_last_name");
      if (!formData.email.trim()) newErrors.email = t("auth_error_email");

      if (!formData.password) {
        newErrors.password = t("auth_error_password_required");
      } else if (formData.password.length < PASSWORD_MIN_LENGTH) {
        newErrors.password = t("auth_error_password_length");
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t("auth_error_confirm_password_required");
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t("auth_error_confirm_password");
      }
    }

    if (!formData.phone.trim()) newErrors.phone = t("auth_error_phone");
    if (!formData.birthDate) newErrors.birthDate = t("auth_error_birth_date");
    if (!formData.university.trim()) newErrors.university = t("auth_error_university");
    if (!formData.educationLevel) newErrors.educationLevel = t("auth_error_education_level");
    if (!formData.major.trim()) newErrors.major = t("auth_error_major");
    if (!formData.acceptTerms) newErrors.acceptTerms = t("auth_error_terms");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // eslint-disable-next-line no-unused-vars
    const { password, confirmPassword, ...userData } = formData;
    login(userData);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{t("auth_register_title")}</h1>
        <p className="auth-subtitle">{t("auth_register_subtitle")}</p>

        {!isGoogleSignup && (
          <>
            <button type="button" className="auth-google-btn" onClick={handleGoogleSignup}>
              <GoogleIcon />
              {t("auth_google_signup")}
            </button>
            <div className="auth-divider">
              <span>{t("auth_or")}</span>
            </div>
          </>
        )}

        {isGoogleSignup && (
          <div className="auth-banner">
            {t("auth_google_banner")} ({formData.email}). {t("auth_google_banner_cont")}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {!isGoogleSignup && (
            <>
              <div className="auth-row">
                <div className="auth-group">
                  <label>
                    {t("auth_first_name")}
                    <RequiredMark />
                  </label>
                  <input
                    className="auth-input"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={t("auth_first_name_placeholder")}
                  />
                  {errors.firstName && <p className="auth-error">{errors.firstName}</p>}
                </div>

                <div className="auth-group">
                  <label>
                    {t("auth_last_name")}
                    <RequiredMark />
                  </label>
                  <input
                    className="auth-input"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={t("auth_last_name_placeholder")}
                  />
                  {errors.lastName && <p className="auth-error">{errors.lastName}</p>}
                </div>
              </div>

              <div className="auth-group">
                <label>
                  {t("auth_email")}
                  <RequiredMark />
                </label>
                <input
                  className="auth-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("auth_email_placeholder")}
                />
                {errors.email && <p className="auth-error">{errors.email}</p>}
              </div>

              <div className="auth-group">
                <label>
                  {t("auth_password")}
                  <RequiredMark />
                </label>
                <input
                  className="auth-input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("auth_password_create_placeholder")}
                />
                <p className="auth-hint">{t("auth_password_hint")}</p>
                {errors.password && <p className="auth-error">{errors.password}</p>}
              </div>

              <div className="auth-group">
                <label>
                  {t("auth_confirm_password")}
                  <RequiredMark />
                </label>
                <input
                  className="auth-input"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t("auth_confirm_password_placeholder")}
                />
                {errors.confirmPassword && (
                  <p className="auth-error">{errors.confirmPassword}</p>
                )}
              </div>
            </>
          )}

          <div className="auth-row">
            <div className="auth-group">
              <label>
                {t("auth_phone")}
                <RequiredMark />
              </label>
              <input
                className="auth-input"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+994 XX XXX XX XX"
              />
              {errors.phone && <p className="auth-error">{errors.phone}</p>}
            </div>

            <div className="auth-group">
              <label>
                {t("auth_birth_date")}
                <RequiredMark />
              </label>
              <input
                className="auth-input"
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
              {errors.birthDate && <p className="auth-error">{errors.birthDate}</p>}
            </div>
          </div>

          <div className="auth-group">
            <label>
              {t("auth_university")}
              <RequiredMark />
            </label>
            <input
              className="auth-input"
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder={t("auth_university_placeholder")}
            />
            {errors.university && <p className="auth-error">{errors.university}</p>}
          </div>

          <div className="auth-row">
            <div className="auth-group">
              <label>
                {t("auth_education_level")}
                <RequiredMark />
              </label>
              <select
                className="auth-input"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
              >
                <option value="">{t("auth_select_placeholder")}</option>
                {EDUCATION_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.educationLevel && <p className="auth-error">{errors.educationLevel}</p>}
            </div>

            <div className="auth-group">
              <label>
                {t("auth_major")}
                <RequiredMark />
              </label>
              <input
                className="auth-input"
                type="text"
                name="major"
                value={formData.major}
                onChange={handleChange}
                placeholder={t("auth_major_placeholder")}
              />
              {errors.major && <p className="auth-error">{errors.major}</p>}
            </div>
          </div>

          <div className="auth-checkbox-group">
            <label className="auth-checkbox-row">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <span>
                {t("auth_terms_text_before")}{" "}
                <button
                  type="button"
                  className="auth-inline-link"
                  onClick={() => setModalTab("privacy")}
                >
                  {t("auth_privacy_policy_label")}
                </button>{" "}
                {t("auth_terms_text_middle")}{" "}
                <button
                  type="button"
                  className="auth-inline-link"
                  onClick={() => setModalTab("terms")}
                >
                  {t("auth_terms_link_label")}
                </button>{" "}
                {t("auth_terms_text_after")}
                <RequiredMark />
              </span>
            </label>
            {errors.acceptTerms && <p className="auth-error">{errors.acceptTerms}</p>}

            <label className="auth-checkbox-row">
              <input
                type="checkbox"
                name="acceptMarketing"
                checked={formData.acceptMarketing}
                onChange={handleChange}
              />
              <span>{t("auth_marketing_label")}</span>
            </label>
          </div>

          <button type="submit" className="auth-button">
            {isGoogleSignup ? t("auth_complete_profile") : t("auth_create_account")}
          </button>
        </form>

        <div className="auth-footer">
          {t("auth_already_have_account")}{" "}
          <Link to="/login" className="auth-link">
            {t("auth_sign_in")}
          </Link>
        </div>
      </div>

      {modalTab && (
        <div
          className="auth-modal-overlay"
          role="presentation"
          onClick={() => setModalTab(null)}
        >
          <div
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="auth-modal-header">
              <div className="auth-modal-tabs">
                <button
                  type="button"
                  className={`auth-modal-tab ${modalTab === "privacy" ? "active" : ""}`}
                  onClick={() => setModalTab("privacy")}
                >
                  {t("modal_privacy_title")}
                </button>
                <button
                  type="button"
                  className={`auth-modal-tab ${modalTab === "terms" ? "active" : ""}`}
                  onClick={() => setModalTab("terms")}
                >
                  {t("modal_terms_title")}
                </button>
              </div>
              <button
                type="button"
                className="auth-modal-close"
                aria-label={t("modal_close_aria")}
                onClick={() => setModalTab(null)}
              >
                ×
              </button>
            </div>

            <div className="auth-modal-body">
              {(modalTab === "privacy"
                ? t("modal_privacy_content")
                : t("modal_terms_content")
              )
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
            </div>

            <div className="auth-modal-footer">
              <button
                type="button"
                className="auth-modal-close-btn"
                onClick={() => setModalTab(null)}
              >
                {t("modal_close_btn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.87-3.04.87-2.34 0-4.32-1.58-5.03-3.7H.94v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.73A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.19.29-1.73V4.94H.94A9 9 0 0 0 0 9c0 1.45.35 2.83.94 4.06l3.03-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .94 4.94l3.03 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}