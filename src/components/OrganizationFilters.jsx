import { translateCategory } from '../data/categoryTranslation'
import {
  ORG_CATEGORIES,
  ORG_SORT_OPTIONS,
} from '../utils/organizationFilters.constants'

function FilterChip({
  label,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`filter-btn${active ? ' active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

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
          {t('org_field_label') ||
            'Fəaliyyət sahəsi'}
        </span>

        <div className="filter-group__chips">
          {ORG_CATEGORIES.map(category => (
            <FilterChip
              key={category.id}
              label={
                category.labelKey
                  ? t(category.labelKey)
                  : translateCategory(
                      category.id,
                      lang
                    )
              }
              active={
                category.id === ''
                  ? categories.length === 0
                  : categories.includes(category.id)
              }
              onClick={() =>
                toggleCategory(category.id)
              }
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
          onChange={event =>
            setSort(event.target.value)
          }
          aria-label={
            t('org_sort_label') || 'Sıralama'
          }
        >
          {ORG_SORT_OPTIONS.map(option => (
            <option
              key={option.id}
              value={option.id}
            >
              {t(option.labelKey)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}