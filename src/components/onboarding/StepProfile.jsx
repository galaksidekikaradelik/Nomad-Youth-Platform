import Field from './Field';
import { COUNTRIES, EDU_LEVELS } from '../../constants/onboardingOptions';

export default function StepProfile({ t, profile, setP, errors, onContinue, onBack }) {
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