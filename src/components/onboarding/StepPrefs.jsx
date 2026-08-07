import Chip from './Chip';
import {
  COUNTRIES,
  PROJECT_TYPES,
  FORMATS,
  CATEGORY_OPTIONS,
  DURATIONS,
  DEADLINE_OPTIONS,
} from '../../constants/onboardingOptions';

export default function StepPrefs({
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