import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../hooks/useLanguage";
import { useAuth } from "../hooks/useAuth";
import "../style/index.css";



const COUNTRIES = [
  { value: "Azerbaijan", key: "country_azerbaijan" },
  { value: "Germany", key: "country_germany" },
  { value: "Italy", key: "country_italy" },
  { value: "Poland", key: "country_poland" },
  { value: "Spain", key: "country_spain" },
  { value: "France", key: "country_france" },
  { value: "Netherlands", key: "country_netherlands" },
  { value: "Turkey", key: "country_turkey" },
  { value: "Georgia", key: "country_georgia" },
  { value: "Portugal", key: "country_portugal" },
  { value: "Greece", key: "country_greece" },
  { value: "Romania", key: "country_romania" },
  { value: "Ukraine", key: "country_ukraine" },
  { value: "Lithuania", key: "country_lithuania" },
  { value: "Latvia", key: "country_latvia" },
  { value: "Estonia", key: "country_estonia" },
  { value: "Czechia", key: "country_czechia" },
  { value: "Slovakia", key: "country_slovakia" },
  { value: "Hungary", key: "country_hungary" },
  { value: "Belgium", key: "country_belgium" },
];

const EDU_LEVELS = ["high_school", "bachelor", "master", "phd", "vocational"];

const EDU_LEVEL_ENUM_MAP = {
  high_school: "HIGH_SCHOOL",
  bachelor: "BACHELOR",
  master: "MASTER",
  phd: "PHD",
  vocational: "VOCATIONAL",
};

const CATEGORIES = [
  "volunteering", "internship", "training", "youth_exchange", "scholarship",
  "grant", "conference", "competition", "fellowship", "solidarity_project", "job",
];



function Field({ label, required, error, children, hint }) {
  return (
    <label className="ny-field">
      <span className="ny-field-label">
        {label} {required && <span className="ny-req">*</span>}
        {hint && <span className="ny-hint"> {hint}</span>}
      </span>
      {children}
      {error && <span className="ny-error">{error}</span>}
    </label>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button type="button" className={"ny-chip" + (active ? " ny-chip-active" : "")} onClick={onClick}>
      {children}
    </button>
  );
}



export default function NomadYouthOnboarding() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { completeProfile } = useAuth();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [profile, setProfile] = useState({
    firstName: "", lastName: "", phone: "", country: "", city: "",
    university: "", eduLevel: "", fieldOfStudy: "", dob: "", bio: "",
  });
  const [errors, setErrors] = useState({});

  const [prefs, setPrefs] = useState({
    interests: [],
    newsletter: true,
  });

  const setP = (k, v) => setProfile((p) => ({ ...p, [k]: v }));

  const toggleIn = (arr, val) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  function validateStep1() {
    const e = {};
    if (!profile.firstName.trim()) e.firstName = t("required");
    if (!profile.lastName.trim()) e.lastName = t("required");
    if (!profile.country.trim()) e.country = t("required");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleContinue() {
    if (validateStep1()) setStep(2);
  }

  
  async function handleFinish() {
    setSubmitError("");
    setSaving(true);
    try {
      const payload = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phone,
        country: profile.country,
        city: profile.city,
        university: profile.university,
        educationLevel: EDU_LEVEL_ENUM_MAP[profile.eduLevel] || null,
        major: profile.fieldOfStudy,
        birthDate: profile.dob,
        bio: profile.bio,
        interests: prefs.interests,
        newsletter: prefs.newsletter,
      };

      await completeProfile(payload);
      setDone(true);
      setTimeout(() => navigate("/profile", { replace: true }), 1200);
    } catch (err) {
      console.error("Profil tamamlanmadı:", err);
      setSubmitError(
        err.response?.data?.message || t("submit_error") || "Xəta baş verdi, yenidən cəhd edin."
      );
    } finally {
      setSaving(false);
    }
  }

  const progressPct = step === 1 ? 50 : 100;

  return (
    <div className="ny-root">
      

      <div className="ny-stage">
        <div className="ny-card">
          {done ? (
            <SuccessPanel text={t("redirecting_dashboard")} />
          ) : (
            <>
              <div className="ny-progress-wrap">
                <div className="ny-progress-track">
                  <div className="ny-progress-fill" style={{ width: progressPct + "%" }} />
                </div>
                <div className="ny-progress-label">{t(`onboarding_step${step}`)}</div>
              </div>

              <div className="ny-anim-wrap">
                {step === 1 ? (
                  <StepProfile
                    key="s1"
                    t={t}
                    profile={profile}
                    setP={setP}
                    errors={errors}
                    onContinue={handleContinue}
                    onBack={() => navigate("/profile")}
                  />
                ) : (
                  <StepPrefs
                    key="s2"
                    t={t}
                    prefs={prefs}
                    setPrefs={setPrefs}
                    toggleIn={toggleIn}
                    saving={saving}
                    submitError={submitError}
                    onBack={() => setStep(1)}
                    onFinish={handleFinish}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


function StepProfile({ t, profile, setP, errors, onContinue, onBack }) {
  return (
    <div className="ny-step ny-fade-in">
      <h1 className="ny-title">{t("s1_title")}</h1>
      <p className="ny-subtitle">{t("s1_sub")}</p>

      <div className="ny-grid-2">
        <Field label={t("first_name")} required error={errors.firstName}>
          <input className="ny-input" value={profile.firstName}
            onChange={(e) => setP("firstName", e.target.value)} />
        </Field>
        <Field label={t("last_name")} required error={errors.lastName}>
          <input className="ny-input" value={profile.lastName}
            onChange={(e) => setP("lastName", e.target.value)} />
        </Field>

        <Field label={t("phone")}>
          <input className="ny-input" type="tel" value={profile.phone}
            onChange={(e) => setP("phone", e.target.value)}
            placeholder={t("phone_placeholder") || "+994 50 000 00 00"} />
        </Field>
        <Field label={t("country")} required error={errors.country}>
          <select className="ny-input" value={profile.country}
            onChange={(e) => setP("country", e.target.value)}>
            <option value="">{t("select_placeholder")}</option>
           {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>
                    {t(c.key)}
                </option>
                ))}
          </select>
        </Field>

        <Field label={t("city")}>
          <input className="ny-input" value={profile.city}
            onChange={(e) => setP("city", e.target.value)} />
        </Field>
        <Field label={t("university")}>
          <input className="ny-input" value={profile.university}
            onChange={(e) => setP("university", e.target.value)} />
        </Field>

        <Field label={t("education_level")}>
          <select className="ny-input" value={profile.eduLevel}
            onChange={(e) => setP("eduLevel", e.target.value)}>
            <option value="">{t("select_placeholder")}</option>
            {EDU_LEVELS.map((k) => <option key={k} value={k}>{t(`edu_${k}`)}</option>)}
          </select>
        </Field>
        <Field label={t("major")}>
          <input className="ny-input" value={profile.fieldOfStudy}
            onChange={(e) => setP("fieldOfStudy", e.target.value)} />
        </Field>

        <Field label={t("date_of_birth")}>
          <input className="ny-input" type="date" value={profile.dob}
            onChange={(e) => setP("dob", e.target.value)} />
        </Field>
        <div />

        <div className="ny-span-2">
          <Field label={t("bio")} hint={t("bio_hint")}>
            <textarea className="ny-input ny-textarea" rows={3} value={profile.bio}
              placeholder={t("bio_placeholder")}
              onChange={(e) => setP("bio", e.target.value)} />
          </Field>
        </div>
      </div>

      <div className="ny-actions">
        <button type="button" className="ny-btn ny-btn-ghost" onClick={onBack}>
          {t("back")}
        </button>
        <button type="button" className="ny-btn ny-btn-primary" onClick={onContinue}>
          {t("continue")}
        </button>
      </div>
    </div>
  );
}


function StepPrefs({ t, prefs, setPrefs, toggleIn, saving, submitError, onBack, onFinish }) {
  return (
    <div className="ny-step ny-fade-in">
      <h1 className="ny-title">{t("s2_title")}</h1>
      <p className="ny-subtitle">{t("s2_sub")}</p>

      <section className="ny-section">
        <h2 className="ny-section-title">{t("opportunity_categories")}</h2>
        <p className="ny-section-hint">{t("opportunity_categories_hint")}</p>
        <div className="ny-chip-row">
          {CATEGORIES.map((k) => (
            <Chip key={k} active={prefs.interests.includes(k)}
              onClick={() => setPrefs((p) => ({ ...p, interests: toggleIn(p.interests, k) }))}>
              {t(`cat_${k}`)}
            </Chip>
          ))}
        </div>
      </section>

      <section className="ny-section">
        <h2 className="ny-section-title">{t("notification_channels")}</h2>
        <div className="ny-check-list">
          <label className="ny-check-row">
            <input type="checkbox" checked={prefs.newsletter}
              onChange={() => setPrefs((p) => ({ ...p, newsletter: !p.newsletter }))} />
            <span>{t("email_notifications")}</span>
          </label>
          <label className="ny-check-row ny-check-disabled">
            <input type="checkbox" disabled />
            <span>{t("push_notifications_soon")}</span>
          </label>
        </div>
      </section>

      {submitError && <p className="ny-error ny-submit-error">{submitError}</p>}

      <div className="ny-actions">
        <button type="button" className="ny-btn ny-btn-ghost" onClick={onBack} disabled={saving}>
          {t("back")}
        </button>
        <button type="button" className="ny-btn ny-btn-primary" onClick={onFinish} disabled={saving}>
          {saving ? t("saving_preferences") : t("finish_setup")}
        </button>
      </div>
    </div>
  );
}

function SuccessPanel({ text }) {
  return (
    <div className="ny-success ny-fade-in">
      <div className="ny-success-badge">✓</div>
      <p>{text}</p>
    </div>
  );
}