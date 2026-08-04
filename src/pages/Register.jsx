import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import GoogleLoginButton from "../components/GoogleLoginButton";
import EmailVerificationBanner from "../components/EmailVerificationBanner";
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
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalTab, setModalTab] = useState(null); 
  const [registeredEmail, setRegisteredEmail] = useState(""); 
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

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

    if (!formData.phone.trim()) newErrors.phone = t("auth_error_phone");
    if (!formData.birthDate) newErrors.birthDate = t("auth_error_birth_date");
    if (!formData.university.trim()) newErrors.university = t("auth_error_university");
    if (!formData.educationLevel) newErrors.educationLevel = t("auth_error_education_level");
    if (!formData.major.trim()) newErrors.major = t("auth_error_major");
    if (!formData.acceptTerms) newErrors.acceptTerms = t("auth_error_terms");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await register(formData);
      setRegisteredEmail(formData.email);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        (err?.response?.status === 409
          ? t("auth_error_email_taken")
          : t("auth_error_register_failed"));
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registeredEmail) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">{t("auth_register_title")}</h1>
          <p className="auth-subtitle">
            Hesabınız uğurla yaradıldı. Davam etmək üçün e-mail ünvanınızı təsdiqləyin.
          </p>

          <EmailVerificationBanner email={registeredEmail} />

          <div className="auth-footer">
            <Link to="/login" className="auth-link">
              {t("auth_sign_in")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{t("auth_register_title")}</h1>
        <p className="auth-subtitle">{t("auth_register_subtitle")}</p>

        <GoogleLoginButton onSuccess={() => navigate("/")} />

        <div className="auth-divider">
          <span>{t("auth_or")}</span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
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

          {submitError && <p className="auth-error">{submitError}</p>}

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? t("auth_submitting") : t("auth_create_account")}
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