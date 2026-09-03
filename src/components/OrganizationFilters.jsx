import { translateCategory } from '../data/categoryTranslation'
import {
  ORG_CATEGORIES,
  ORG_SORT_OPTIONS,
} from '../utils/organizationFilters.constants'

const FilterChip = ({ label, active, onClick }) => (
  <button
    className={`filter-btn${active ? ' active' : ''}`}
    onClick={onClick}
    type="button"
  >
    {label}
  </button>
)

export default function OrganizationFilters({
  t,
  lang,
  categories,
  toggleCategory,
  sort,
  setSort,
}) {
  return (
    <div className="filter-group">
      <div className="filter-group__row">
        <span className="filter-group__label">
          {t('org_field_label') || 'Fəaliyyət sahəsi'}
        </span>

        <div className="filter-group__chips">
          {ORG_CATEGORIES.map(c => (
            <FilterChip
              key={c.id}
              label={
                c.labelKey
                  ? t(c.labelKey)
                  : translateCategory(c.id, lang)
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
        <label
          htmlFor="org-sort-select"
          className="filter-group__label"
        >
          {t('org_sort_label') || 'Sıralama'}
        </label>

        <select
          id="org-sort-select"
          className="search-bar__select filter-group__sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label={t('org_sort_label') || 'Sıralama'}
        >
          {ORG_SORT_OPTIONS.map(o => (
            <option key={o.id} value={o.id}>
              {t(o.labelKey)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}