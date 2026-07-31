import { useState } from "react";


import { useLanguage } from "../hooks/useLanguage";
import "../style/index.css";



const COUNTRIES = [
  "Azerbaijan", "Germany", "Italy", "Poland", "Spain", "France", "Netherlands",
  "Turkey", "Georgia", "Portugal", "Greece", "Romania", "Ukraine", "Lithuania",
  "Latvia", "Estonia", "Czechia", "Slovakia", "Hungary", "Belgium",
];

const EDU_LEVELS = ["high_school", "bachelor", "master", "phd", "vocational"];

const CATEGORIES = [
  "volunteering", "internship", "training", "youth_exchange", "scholarship",
  "grant", "conference", "competition", "fellowship", "solidarity_project", "job",
];

const FORMATS = ["online", "offline", "hybrid"];
const DEADLINES = ["1_day", "3_days", "1_week"];



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
  const t = useLanguage();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "", lastName: "", phone: "", country: "", city: "",
    university: "", eduLevel: "", fieldOfStudy: "", dob: "", bio: "",
  });
  const [errors, setErrors] = useState({});

  const [prefs, setPrefs] = useState({
    preferredCountries: [],
    categories: [],
    formats: [],
    deadline: "1_week",
    channels: { email: true },
  });

  const setP = (k, v) => setProfile((p) => ({ ...p, [k]: v }));

  const toggleIn = (arr, val) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  function validateStep1() {
    const e = {};
    if (!profile.firstName.trim()) e.firstName = t.required;
    if (!profile.lastName.trim()) e.lastName = t.required;
    if (!profile.country.trim()) e.country = t.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleContinue() {
    if (validateStep1()) setStep(2);
  }

  function handleFinish() {
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setDone(true);
    }, 900);
  }

  const progressPct = step === 1 ? 50 : 100;

  return (
    <div className="ny-root">
      

      <div className="ny-stage">
        <div className="ny-card">
          {done ? (
            <SuccessPanel text={t.redirecting} />
          ) : (
            <>
              <div className="ny-progress-wrap">
                <div className="ny-progress-track">
                  <div className="ny-progress-fill" style={{ width: progressPct + "%" }} />
                </div>
                <div className="ny-progress-label">{t.step(step)}</div>
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
                    onBack={() => {
                      console.log("Back pressed on step 1 — return to Google login");
                    }}
                  />
                ) : (
                  <StepPrefs
                    key="s2"
                    t={t}
                    prefs={prefs}
                    setPrefs={setPrefs}
                    toggleIn={toggleIn}
                    saving={saving}
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
      <h1 className="ny-title">{t.s1_title}</h1>
      <p className="ny-subtitle">{t.s1_sub}</p>

      <div className="ny-grid-2">
        <Field label={t.firstName} required error={errors.firstName}>
          <input className="ny-input" value={profile.firstName}
            onChange={(e) => setP("firstName", e.target.value)} />
        </Field>
        <Field label={t.lastName} required error={errors.lastName}>
          <input className="ny-input" value={profile.lastName}
            onChange={(e) => setP("lastName", e.target.value)} />
        </Field>

        <Field label={t.phone}>
          <input className="ny-input" type="tel" value={profile.phone}
            onChange={(e) => setP("phone", e.target.value)} placeholder="+994 50 000 00 00" />
        </Field>
        <Field label={t.country} required error={errors.country}>
          <select className="ny-input" value={profile.country}
            onChange={(e) => setP("country", e.target.value)}>
            <option value="">{t.selectPlaceholder}</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label={t.city}>
          <input className="ny-input" value={profile.city}
            onChange={(e) => setP("city", e.target.value)} />
        </Field>
        <Field label={t.university}>
          <input className="ny-input" value={profile.university}
            onChange={(e) => setP("university", e.target.value)} />
        </Field>

        <Field label={t.eduLevel}>
          <select className="ny-input" value={profile.eduLevel}
            onChange={(e) => setP("eduLevel", e.target.value)}>
            <option value="">{t.selectPlaceholder}</option>
            {EDU_LEVELS.map((k) => <option key={k} value={k}>{t.edu[k]}</option>)}
          </select>
        </Field>
        <Field label={t.fieldOfStudy}>
          <input className="ny-input" value={profile.fieldOfStudy}
            onChange={(e) => setP("fieldOfStudy", e.target.value)} />
        </Field>

        <Field label={t.dob}>
          <input className="ny-input" type="date" value={profile.dob}
            onChange={(e) => setP("dob", e.target.value)} />
        </Field>
        <div />

        <div className="ny-span-2">
          <Field label={t.bio} hint={t.bioHint}>
            <textarea className="ny-input ny-textarea" rows={3} value={profile.bio}
              placeholder={t.bioPlaceholder}
              onChange={(e) => setP("bio", e.target.value)} />
          </Field>
        </div>
      </div>

      <div className="ny-actions">
        <button type="button" className="ny-btn ny-btn-ghost" onClick={onBack}>
          {t.back}
        </button>
        <button type="button" className="ny-btn ny-btn-primary" onClick={onContinue}>
          {t.continueBtn}
        </button>
      </div>
    </div>
  );
}


function StepPrefs({ t, prefs, setPrefs, toggleIn, saving, onBack, onFinish }) {
  return (
    <div className="ny-step ny-fade-in">
      <h1 className="ny-title">{t.s2_title}</h1>
      <p className="ny-subtitle">{t.s2_sub}</p>

      <section className="ny-section">
        <h2 className="ny-section-title">{t.preferredCountries}</h2>
        <p className="ny-section-hint">{t.preferredCountriesHint}</p>
        <div className="ny-chip-row">
          {COUNTRIES.map((c) => (
            <Chip key={c} active={prefs.preferredCountries.includes(c)}
              onClick={() => setPrefs((p) => ({ ...p, preferredCountries: toggleIn(p.preferredCountries, c) }))}>
              {c}
            </Chip>
          ))}
        </div>
      </section>

      <section className="ny-section">
        <h2 className="ny-section-title">{t.oppCategories}</h2>
        <p className="ny-section-hint">{t.oppCategoriesHint}</p>
        <div className="ny-chip-row">
          {CATEGORIES.map((k) => (
            <Chip key={k} active={prefs.categories.includes(k)}
              onClick={() => setPrefs((p) => ({ ...p, categories: toggleIn(p.categories, k) }))}>
              {t.cat[k]}
            </Chip>
          ))}
        </div>
      </section>

      <div className="ny-grid-2 ny-section">
        <div>
          <h2 className="ny-section-title">{t.oppFormat}</h2>
          <div className="ny-check-list">
            {FORMATS.map((k) => (
              <label key={k} className="ny-check-row">
                <input type="checkbox" checked={prefs.formats.includes(k)}
                  onChange={() => setPrefs((p) => ({ ...p, formats: toggleIn(p.formats, k) }))} />
                <span>{t.fmt[k]}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="ny-section-title">{t.deadlineReminders}</h2>
          <div className="ny-check-list">
            {DEADLINES.map((k) => (
              <label key={k} className="ny-check-row">
                <input type="radio" name="deadline" checked={prefs.deadline === k}
                  onChange={() => setPrefs((p) => ({ ...p, deadline: k }))} />
                <span>{t.dl[k]}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <section className="ny-section">
        <h2 className="ny-section-title">{t.notifChannels}</h2>
        <div className="ny-check-list">
          <label className="ny-check-row">
            <input type="checkbox" checked={prefs.channels.email}
              onChange={() => setPrefs((p) => ({ ...p, channels: { ...p.channels, email: !p.channels.email } }))} />
            <span>{t.emailNotifications}</span>
          </label>
          <label className="ny-check-row ny-check-disabled">
            <input type="checkbox" disabled />
            <span>{t.pushSoon}</span>
          </label>
        </div>
      </section>

      <div className="ny-actions">
        <button type="button" className="ny-btn ny-btn-ghost" onClick={onBack} disabled={saving}>
          {t.back}
        </button>
        <button type="button" className="ny-btn ny-btn-primary" onClick={onFinish} disabled={saving}>
          {saving ? t.savingUp : t.finish}
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

