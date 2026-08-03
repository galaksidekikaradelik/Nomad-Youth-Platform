import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../hooks/useLanguage";
import { useAuth } from "../hooks/useAuth";
import { updateNotificationSettings } from "../services/notificationService";
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

const PROJECT_TYPES = [
  { value: "ESC", key: "type_esc" },
  { value: "SALTO", key: "type_salto" },
  { value: "Activity", key: "type_activity" },
  { value: "Seminar", key: "type_seminar" },
  { value: "Webinar", key: "type_webinar" },
  { value: "Course", key: "type_course" },
  { value: "Conference", key: "type_conference" },
  { value: "International", key: "type_international" },
  { value: "Local", key: "type_local" },
];

const FORMATS = [
  { value: "Online", key: "format_online" },
  { value: "Offline", key: "format_offline" },
];

const CATEGORY_OPTIONS = [
  { value: "Education", key: "cat_education" },
  { value: "Technology", key: "cat_technology" },
  { value: "Entrepreneurship", key: "cat_entrepreneurship" },
  { value: "Leadership", key: "cat_leadership" },
  { value: "Partnership", key: "cat_partnership" },
  { value: "Ecology", key: "cat_ecology" },
  { value: "Wellbeing", key: "cat_wellbeing" },
  { value: "Culture", key: "cat_culture" },
  { value: "Media", key: "cat_media" },
  { value: "Law", key: "cat_law" },
  { value: "Peace", key: "cat_peace" },
  { value: "Youth", key: "cat_youth" },
];

const DURATIONS = [
  { value: "Short-term", key: "duration_short" },
  { value: "Long-term", key: "duration_long" },
];

const DEADLINE_OPTIONS = [1, 3, 7];



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
    university: "", eduLevel: "", fieldOfStudy: "", dob: "",
  });
  const [errors, setErrors] = useState({});

  const [prefs, setPrefs] = useState({
    countries: [],
    projectTypes: [],
    formats: [],
    categories: [],
    durations: [],
    deadlineReminderDays: 3,
  });
  const [pendingCountry, setPendingCountry] = useState("");

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
      const profilePayload = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phone,
        country: profile.country,
        city: profile.city,
        university: profile.university,
        educationLevel: EDU_LEVEL_ENUM_MAP[profile.eduLevel] || null,
        major: profile.fieldOfStudy,
        birthDate: profile.dob,
      };

      const notificationSettings = {
        emailNotifications: true,
        inAppNotifications: true,
        newOpportunities: true,
        deadlineReminders: true,
        savedProjectChanges: true,
        platformUpdates: true,
        countries: prefs.countries,
        projectTypes: prefs.projectTypes,
        categories: prefs.categories,
        formats: prefs.formats,
        deadlineReminderDays: prefs.deadlineReminderDays,
        durations: prefs.durations,
      };

      // 1. Profili tamamla
      await completeProfile(profilePayload);

      // 2. Bildiriş ayarlarını ayrıca yadda saxla
      await updateNotificationSettings(notificationSettings);

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
                    pendingCountry={pendingCountry}
                    setPendingCountry={setPendingCountry}
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


function StepPrefs({
  t, prefs, setPrefs, toggleIn,
  pendingCountry, setPendingCountry,
  saving, submitError, onBack, onFinish,
}) {
  const addCountry = () => {
    if (!pendingCountry) return;
    setPrefs((p) =>
      p.countries.includes(pendingCountry)
        ? p
        : { ...p, countries: [...p.countries, pendingCountry] }
    );
    setPendingCountry("");
  };

  const removeCountry = (val) => {
    setPrefs((p) => ({ ...p, countries: p.countries.filter((c) => c !== val) }));
  };

  const allCountriesSelected = prefs.countries.length === COUNTRIES.length;
  const toggleAllCountries = () => {
    setPrefs((p) => ({
      ...p,
      countries: allCountriesSelected ? [] : COUNTRIES.map((c) => c.value),
    }));
  };

  const allTypesSelected = prefs.projectTypes.length === PROJECT_TYPES.length;
  const toggleAllTypes = () => {
    setPrefs((p) => ({
      ...p,
      projectTypes: allTypesSelected ? [] : PROJECT_TYPES.map((o) => o.value),
    }));
  };

  const allFormatsSelected = prefs.formats.length === FORMATS.length;
  const toggleAllFormats = () => {
    setPrefs((p) => ({
      ...p,
      formats: allFormatsSelected ? [] : FORMATS.map((o) => o.value),
    }));
  };

  const allCategoriesSelected = prefs.categories.length === CATEGORY_OPTIONS.length;
  const toggleAllCategories = () => {
    setPrefs((p) => ({
      ...p,
      categories: allCategoriesSelected ? [] : CATEGORY_OPTIONS.map((o) => o.value),
    }));
  };

  const allDurationsSelected = prefs.durations.length === DURATIONS.length;
  const toggleAllDurations = () => {
    setPrefs((p) => ({
      ...p,
      durations: allDurationsSelected ? [] : DURATIONS.map((o) => o.value),
    }));
  };

  return (
    <div className="ny-step ny-fade-in">
      <h1 className="ny-title">{t("s2_title")}</h1>
      <p className="ny-subtitle">{t("s2_sub")}</p>

      {/* 1. Ölkə seçimi */}
     <section className="ny-section">
        <h2 className="ny-section-title">{t("country_selection")}</h2>

        <div className="ny-inline-add">
          <select
            className="ny-input ny-country-select"
            value={pendingCountry}
            onChange={(e) => setPendingCountry(e.target.value)}
          >
            <option value="">{t("select_placeholder")}</option>
            {COUNTRIES.filter((c) => !prefs.countries.includes(c.value)).map((c) => (
              <option key={c.value} value={c.value}>
                {t(c.key)}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="ny-add-btn"
            onClick={() => {
              if (pendingCountry) {
                addCountry(pendingCountry);
                setPendingCountry("");
              }
            }}
          >
            {t("add")}
          </button>
        </div>

        <div className="ny-chip-row">
          <Chip active={allCountriesSelected} onClick={toggleAllCountries}>
            {t("all")}
          </Chip>

          {prefs.countries.map((val) => {
            const meta = COUNTRIES.find((c) => c.value === val);

            return (
              <span key={val} className="ny-chip ny-chip-active ny-chip-removable">
                {meta ? t(meta.key) : val}
                <button
                  type="button"
                  className="ny-chip-remove"
                  onClick={() => removeCountry(val)}
                  aria-label={t("remove")}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
    </section>

      {/* 2. Növ seçimi */}
      <section className="ny-section">
        <h2 className="ny-section-title">{t("type_selection")}</h2>
        <div className="ny-chip-row">
          <Chip active={allTypesSelected} onClick={toggleAllTypes}>
            {t("all")}
          </Chip>
          {PROJECT_TYPES.map((opt) => (
            <Chip
              key={opt.value}
              active={prefs.projectTypes.includes(opt.value)}
              onClick={() =>
                setPrefs((p) => ({ ...p, projectTypes: toggleIn(p.projectTypes, opt.value) }))
              }
            >
              {t(opt.key)}
            </Chip>
          ))}
        </div>
      </section>

      {/* Format (Onlayn / Əyani) */}
      <section className="ny-section">
        <h2 className="ny-section-title">{t("format_selection")}</h2>
        <div className="ny-chip-row">
          <Chip active={allFormatsSelected} onClick={toggleAllFormats}>
            {t("all")}
          </Chip>
          {FORMATS.map((opt) => (
            <Chip
              key={opt.value}
              active={prefs.formats.includes(opt.value)}
              onClick={() =>
                setPrefs((p) => ({ ...p, formats: toggleIn(p.formats, opt.value) }))
              }
            >
              {t(opt.key)}
            </Chip>
          ))}
        </div>
      </section>

      {/* 3. Mövzu seçimi */}
      <section className="ny-section">
        <h2 className="ny-section-title">{t("topic_selection")}</h2>
        <div className="ny-chip-row">
          <Chip active={allCategoriesSelected} onClick={toggleAllCategories}>
            {t("all")}
          </Chip>
          {CATEGORY_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              active={prefs.categories.includes(opt.value)}
              onClick={() =>
                setPrefs((p) => ({ ...p, categories: toggleIn(p.categories, opt.value) }))
              }
            >
              {t(opt.key)}
            </Chip>
          ))}
        </div>
      </section>

      {/* Müddət */}
      <section className="ny-section">
        <h2 className="ny-section-title">{t("duration_selection")}</h2>
        <div className="ny-chip-row">
          <Chip active={allDurationsSelected} onClick={toggleAllDurations}>
            {t("all")}
          </Chip>
          {DURATIONS.map((opt) => (
            <Chip
              key={opt.value}
              active={prefs.durations.includes(opt.value)}
              onClick={() =>
                setPrefs((p) => ({ ...p, durations: toggleIn(p.durations, opt.value) }))
              }
            >
              {t(opt.key)}
            </Chip>
          ))}
        </div>
      </section>

      {/* 4. Deadline bildirişi */}
      <section className="ny-section">
        <h2 className="ny-section-title">{t("deadline_notification")}</h2>
        <div className="ny-check-list">
          {DEADLINE_OPTIONS.map((days) => (
            <label key={days} className="ny-check-row">
              <input
                type="radio"
                name="deadlineReminderDays"
                checked={prefs.deadlineReminderDays === days}
                onChange={() => setPrefs((p) => ({ ...p, deadlineReminderDays: days }))}
              />
              <span>
                {days === 1 && t("deadline_1_day")}
                {days === 3 && t("deadline_3_days")}
                {days === 7 && t("deadline_1_week")}
              </span>
            </label>
          ))}
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