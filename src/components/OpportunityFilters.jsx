import { translateCategory } from '../data/categoryTranslation'
import {
  CATEGORIES,
  TYPES,
  FORMATS,
  SORT_OPTIONS,
} from '../utils/opportunityFilters.constants'

const FilterChip = ({ label, active, onClick }) => (
  <button
    className={`filter-btn${active ? ' active' : ''}`}
    onClick={onClick}
    type="button"
  >
    {label}
  </button>
)

export default function OpportunityFilters({
  t,
  lang,
  categories,
  toggleCategory,
  types,
  toggleType,
  format,
  toggleFormat,
  durations,
  toggleDuration,
  visaType,
  toggleVisaType,
  clearDurationAndVisa,
  sort,
  setSort,
}) {
  return (
    <div className="filter-group">
      <div className="filter-group__row">
        <span className="filter-group__label">
          {t('filter_category_label')}
        </span>

        <div className="filter-group__chips">
          {CATEGORIES.map(c => (
            <FilterChip
              key={c.id}
              label={
                c.labelKey ? t(c.labelKey) : translateCategory(c.id, lang)
              }
              active={
                c.id === ''
                  ? categories.length === 0
                  : categories.includes(c.id)
              }
              onClick={() => toggleCategory(c.id)}
            />
          ))}
        </div>
      </div>

      <div className="filter-group__row">
        <span className="filter-group__label">
          {t('filter_type_label')}
        </span>

        <div className="filter-group__chips">
          {TYPES.map(ty => (
            <FilterChip
              key={ty.id}
              label={t(ty.labelKey)}
              active={
                ty.id === '' ? types.length === 0 : types.includes(ty.id)
              }
              onClick={() => toggleType(ty.id)}
            />
          ))}
        </div>
      </div>

      <div className="filter-group__row">
        <span className="filter-group__label">
          {t('filter_format_label')}
        </span>

        <div className="filter-group__chips">
          {FORMATS.map(f => (
            <FilterChip
              key={f.id}
              label={t(f.labelKey)}
              active={format === f.id}
              onClick={() => toggleFormat(f.id)}
            />
          ))}
        </div>
      </div>

      <div className="filter-group__row">
        <span className="filter-group__label">
          {t('filter_duration_visa_label')}
        </span>

        <div className="filter-group__chips">
          <FilterChip
            label={t('format_all')}
            active={durations.length === 0 && !visaType}
            onClick={clearDurationAndVisa}
          />

          <FilterChip
            label={t('format_short_term')}
            active={durations.includes('SHORT_TERM')}
            onClick={() => toggleDuration('SHORT_TERM')}
          />

          <FilterChip
            label={t('format_long_term')}
            active={durations.includes('LONG_TERM')}
            onClick={() => toggleDuration('LONG_TERM')}
          />

          <FilterChip
            label={t('format_visa_required')}
            active={visaType === 'VISA_REQUIRED'}
            onClick={() => toggleVisaType('VISA_REQUIRED')}
          />

          <FilterChip
            label={t('format_visa_free')}
            active={visaType === 'VISA_FREE'}
            onClick={() => toggleVisaType('VISA_FREE')}
          />
        </div>
      </div>

      <div className="filter-group__row">
        <label htmlFor="opp-sort-select" className="filter-group__label">
          {t('filter_sort_label')}
        </label>

        <select
          id="opp-sort-select"
          className="search-bar__select filter-group__sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label={t('filter_sort_label')}
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.id} value={o.id}>
              {t(o.labelKey)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}