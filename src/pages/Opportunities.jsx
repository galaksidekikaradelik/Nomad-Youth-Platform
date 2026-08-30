import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { translateCategory } from '../data/categoryTranslation'
import { CANONICAL_CATEGORIES } from '../utils/categoryMapping'
import SearchBar from '../components/SearchBar'
import OpportunityCard from '../components/OpportunityCard'
import { OpportunitySkeletonGrid } from '../components/OpportunitySkeleton'
import Pagination from '../components/Pagination'
import { useOpportunities } from '../hooks/useOpportunities'
import { filterActiveOpportunities } from '../utils/opportunityStatus'


const WarningTriangleIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const SearchIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)


// ============================================================
// ƏSAS TABLAR
// ============================================================

const PROJECT_TABS = [
  {
    id: 'erasmus',
    label: 'Erasmus layihələri',
  },
  {
    id: 'international',
    label: 'Beynəlxalq imkanlar',
  },
  {
    id: 'local',
    label: 'Yerli imkanlar',
  },
]


// ============================================================
// CATEGORIES
// ============================================================

const CATEGORIES = [
  { id: '', labelKey: 'category_all' },
  ...CANONICAL_CATEGORIES.map(id => ({
    id,
    labelKey: null,
  })),
]


// ============================================================
// TYPES
// ============================================================

const TYPES = [
  { id: '', labelKey: 'type_all' },
  { id: 'Seminar', labelKey: 'type_seminar' },
  { id: 'Kurs', labelKey: 'type_course' },
  { id: 'Konfrans', labelKey: 'type_conference' },
  { id: 'Vebinar', labelKey: 'type_webinar' },
  { id: 'Fəaliyyət', labelKey: 'type_activity' },
]


// ============================================================
// FORMATS
// ============================================================

const FORMATS = [
  { id: 'Hamısı', labelKey: 'format_all' },
  { id: 'Online', labelKey: 'format_online' },
  { id: 'Offline', labelKey: 'format_onsite' },
]


// ============================================================
// SORT
// ============================================================

const SORT_OPTIONS = [
  { id: 'deadline', labelKey: 'sort_deadline' },
  { id: 'newest', labelKey: 'sort_newest' },
  { id: 'country', labelKey: 'sort_country' },
]


const PAGE_SIZE = 12


// ============================================================
// FILTER CHIP
// ============================================================

const FilterChip = ({ label, active, onClick }) => (
  <button
    className={`filter-btn${active ? ' active' : ''}`}
    onClick={onClick}
    type="button"
  >
    {label}
  </button>
)


// ============================================================
// OPPORTUNITY GROUP
// ============================================================
//
// Mövcud sistemdə:
// - Azərbaycan -> yerli
// - Xarici -> beynəlxalq
//
// İndi isə ESC və SALTO xarici imkanlardan çıxarılır
// və ayrıca Erasmus layihələri kimi göstərilir.
//
// Yəni:
//
// ESC       -> Erasmus
// SALTO     -> Erasmus
// digər xarici imkan -> Beynəlxalq
// Azərbaycan -> Yerli
//
// Yerli məntiqinə toxunmuruq.
// ============================================================

const getOpportunityGroup = (op) => {
  const escOrSalto = String(op.escOrSalto || '')
    .trim()
    .toUpperCase()

  // ESC və SALTO -> Erasmus layihələri
  if (
    escOrSalto === 'ESC' ||
    escOrSalto === 'SALTO'
  ) {
    return 'erasmus'
  }

  // Əvvəlki yerli/beynəlxalq məntiqi
  const location = String(op.location || '')
    .trim()
    .toLocaleLowerCase('az')

  if (location === 'azərbaycan') {
    return 'local'
  }

  return 'international'
}


export default function Opportunities() {
  const { t, lang } = useLanguage()
  const [searchParams] = useSearchParams()

  const initialQuery =
    searchParams.get('query') || ''

  const initialCategory =
    searchParams.get('category') || ''

  const highlightOppKey =
    searchParams.get('show') || null


  const {
    opportunities,
    loading,
    error,
  } = useOpportunities()


  // ==========================================================
  // STATES
  // ==========================================================

  const [search, setSearch] =
    useState(initialQuery)

  const [categories, setCategories] =
    useState(
      initialCategory
        ? [initialCategory]
        : []
    )

  const [types, setTypes] =
    useState([])

  const [format, setFormat] =
    useState('Hamısı')

  const [durations, setDurations] =
    useState([])

  const [visaType, setVisaType] =
    useState('')

  const [sort, setSort] =
    useState('deadline')

  // İlk açılışda Erasmus layihələri
  const [activeTab, setActiveTab] =
    useState('erasmus')

  const [page, setPage] =
    useState(0)


  // ==========================================================
  // CATEGORY TOGGLE
  // ==========================================================

  const toggleCategory = (id) => {
    if (id === '') {
      setCategories([])
      return
    }

    setCategories(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    )
  }


  // ==========================================================
  // TYPE TOGGLE
  // ==========================================================

  const toggleType = (id) => {
    if (id === '') {
      setTypes([])
      return
    }

    setTypes(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  }


  // ==========================================================
  // FORMAT
  // ==========================================================

  const toggleFormat = (id) => {
    setFormat(id)
  }


  // ==========================================================
  // ENRICHED DATA
  // ==========================================================

  const enriched = useMemo(() => {
    return filterActiveOpportunities(
      opportunities
    ).map(op => ({
      ...op,
      opportunityGroup:
        getOpportunityGroup(op),
    }))
  }, [opportunities])


  // ==========================================================
  // FILTERED
  // ==========================================================

  const filtered = useMemo(() => {
    return enriched.filter(op => {

      // ------------------------------------------------------
      // TAB
      // ------------------------------------------------------

      const matchTab =
        op.opportunityGroup === activeTab


      // ------------------------------------------------------
      // CATEGORY
      // ------------------------------------------------------

      const matchCat =
        categories.length === 0 ||
        (
          Array.isArray(op.categoryGroups) &&
          categories.some(cat =>
            op.categoryGroups.includes(cat)
          )
        )


      // ------------------------------------------------------
      // TYPE
      // ------------------------------------------------------

      const matchType =
        types.length === 0 ||
        types.includes(op.type)


      // ------------------------------------------------------
      // FORMAT
      // ------------------------------------------------------

      const matchFormat =
        format === 'Hamısı' ||
        op.typeDetail === format


      // ------------------------------------------------------
      // DURATION
      // ------------------------------------------------------

      const matchDuration =
        durations.length === 0 ||
        durations.includes(
          op.durationType
        )


      // ------------------------------------------------------
      // VISA
      // ------------------------------------------------------

      const matchVisa =
        !visaType ||
        op.visaType === visaType


      // ------------------------------------------------------
      // SEARCH
      // ------------------------------------------------------

      const q =
        search.toLocaleLowerCase('az')


      const matchSearch =
        !search ||

        op.title
          ?.toLocaleLowerCase('az')
          .includes(q) ||

        op.location
          ?.toLocaleLowerCase('az')
          .includes(q) ||

        op.organization
          ?.toLocaleLowerCase('az')
          .includes(q) ||

        (
          Array.isArray(op.tags) &&
          op.tags.some(tag =>
            String(tag)
              .toLocaleLowerCase('az')
              .includes(q)
          )
        )


      return (
        matchTab &&
        matchCat &&
        matchType &&
        matchFormat &&
        matchDuration &&
        matchVisa &&
        matchSearch
      )
    })
  }, [
    enriched,
    activeTab,
    search,
    categories,
    types,
    format,
    durations,
    visaType,
  ])


  // ==========================================================
  // SORT
  // ==========================================================

  const sorted = useMemo(() => {
    const arr = [...filtered]


    if (sort === 'deadline') {
      arr.sort((a, b) => {
        if (!a.deadline) return 1
        if (!b.deadline) return -1

        return (
          new Date(a.deadline) -
          new Date(b.deadline)
        )
      })
    }


    else if (sort === 'newest') {
      arr.sort(
        (a, b) =>
          Number(b.id) -
          Number(a.id)
      )
    }


    else if (sort === 'country') {
      arr.sort((a, b) =>
        String(a.location || '')
          .localeCompare(
            String(b.location || ''),
            'az'
          )
      )
    }


    return arr
  }, [filtered, sort])


  // ==========================================================
  // RESET PAGE
  // ==========================================================

  useEffect(() => {
    setPage(0)
  }, [
    activeTab,
    search,
    categories,
    types,
    format,
    durations,
    visaType,
    sort,
  ])


  // ==========================================================
  // PAGINATION
  // ==========================================================

  const totalPages =
    Math.ceil(
      sorted.length / PAGE_SIZE
    )


  const paginated = useMemo(() => {
    const start =
      page * PAGE_SIZE

    return sorted.slice(
      start,
      start + PAGE_SIZE
    )
  }, [sorted, page])


  const handlePageChange = (p) => {
    setPage(p)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="section">
      <div className="container">

        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <div className="page-header">

          <div className="page-header__eyebrow">
            {t('opp_eyebrow')}
          </div>

          <h1 className="page-header__title">
            {t('opp_title')}
          </h1>

          <p className="page-header__desc">
            {t('opp_desc')}
          </p>

        </div>


        {/* ==================================================
            PROJECT TABS
        ================================================== */}

        <div className="opportunities-tabs">

          {PROJECT_TABS.map(tab => (

            <button
              key={tab.id}
              type="button"
              className={`opportunities-tab ${
                activeTab === tab.id
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                setActiveTab(tab.id)
                setPage(0)
              }}
            >
              {tab.label}
            </button>

          ))}

        </div>


        {/* ==================================================
            SEARCH
        ================================================== */}

        <div className="opportunities-searchbar-wrap">

          <SearchBar
            placeholder={
              t('opp_search_placeholder')
            }
            query={search}
            category={
              categories[0] || ''
            }
            onQueryChange={
              setSearch
            }
            onCategoryChange={(id) =>
              setCategories(
                id ? [id] : []
              )
            }
          />

        </div>


        {/* ==================================================
            FILTERS
        ================================================== */}

        <div className="filter-group">


          {/* CATEGORY */}

          <div className="filter-group__row">

            <span className="filter-group__label">
              {t('filter_category_label')}
            </span>

            <div className="filter-group__chips">

              {CATEGORIES.map(c => (

                <FilterChip
                  key={c.id}
                  label={
                    c.labelKey
                      ? t(c.labelKey)
                      : translateCategory(
                          c.id,
                          lang
                        )
                  }
                  active={
                    c.id === ''
                      ? categories.length === 0
                      : categories.includes(c.id)
                  }
                  onClick={() =>
                    toggleCategory(c.id)
                  }
                />

              ))}

            </div>

          </div>


          {/* TYPE */}

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
                    ty.id === ''
                      ? types.length === 0
                      : types.includes(ty.id)
                  }
                  onClick={() =>
                    toggleType(ty.id)
                  }
                />

              ))}

            </div>

          </div>


          {/* FORMAT */}

          <div className="filter-group__row">

            <span className="filter-group__label">
              {t('filter_format_label')}
            </span>

            <div className="filter-group__chips">

              {FORMATS.map(f => (

                <FilterChip
                  key={f.id}
                  label={t(f.labelKey)}
                  active={
                    format === f.id
                  }
                  onClick={() =>
                    toggleFormat(f.id)
                  }
                />

              ))}

            </div>

          </div>


          {/* DURATION + VISA */}

          <div className="filter-group__row">

            <span className="filter-group__label">
              {t(
                'filter_duration_visa_label'
              )}
            </span>

            <div className="filter-group__chips">


              <FilterChip
                label={t('format_all')}
                active={
                  durations.length === 0 &&
                  !visaType
                }
                onClick={() => {
                  setDurations([])
                  setVisaType('')
                }}
              />


              <FilterChip
                label={t(
                  'format_short_term'
                )}
                active={
                  durations.includes(
                    'SHORT_TERM'
                  )
                }
                onClick={() =>
                  setDurations(prev =>
                    prev.includes(
                      'SHORT_TERM'
                    )
                      ? []
                      : ['SHORT_TERM']
                  )
                }
              />


              <FilterChip
                label={t(
                  'format_long_term'
                )}
                active={
                  durations.includes(
                    'LONG_TERM'
                  )
                }
                onClick={() =>
                  setDurations(prev =>
                    prev.includes(
                      'LONG_TERM'
                    )
                      ? []
                      : ['LONG_TERM']
                  )
                }
              />


              <FilterChip
                label={t(
                  'format_visa_required'
                )}
                active={
                  visaType ===
                  'VISA_REQUIRED'
                }
                onClick={() =>
                  setVisaType(prev =>
                    prev ===
                    'VISA_REQUIRED'
                      ? ''
                      : 'VISA_REQUIRED'
                  )
                }
              />


              <FilterChip
                label={t(
                  'format_visa_free'
                )}
                active={
                  visaType ===
                  'VISA_FREE'
                }
                onClick={() =>
                  setVisaType(prev =>
                    prev ===
                    'VISA_FREE'
                      ? ''
                      : 'VISA_FREE'
                  )
                }
              />

            </div>

          </div>


          {/* SORT */}

          <div className="filter-group__row">

            <label
              htmlFor="opp-sort-select"
              className="filter-group__label"
            >
              {t('filter_sort_label')}
            </label>

            <select
              id="opp-sort-select"
              className="search-bar__select filter-group__sort-select"
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              aria-label={
                t('filter_sort_label')
              }
            >

              {SORT_OPTIONS.map(o => (

                <option
                  key={o.id}
                  value={o.id}
                >
                  {t(o.labelKey)}
                </option>

              ))}

            </select>

          </div>

        </div>


        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (

          <OpportunitySkeletonGrid
            count={8}
            gridClassName="grid-3"
          />

        ) : error ? (

          /* ==================================================
             ERROR
          ================================================== */

          <div className="empty-state">

            <div
              className="empty-state__icon"
              style={{
                color:
                  'var(--color-warning, #f59e0b)',
              }}
            >
              <WarningTriangleIcon />
            </div>

            <div className="empty-state__title">
              {t('opp_error') ||
                'Elanları yükləmək mümkün olmadı.'}
            </div>

            <p className="empty-state__desc">
              Zəhmət olmasa bir az sonra
              yenidən cəhd edin.
            </p>

          </div>

        ) : (

          <>


            {/* ==================================================
                RESULTS COUNT
            ================================================== */}

            <div className="opportunities-results-count">

              {t('opp_results_prefix')}

              <span className="opportunities-results-count__number">
                {sorted.length}
              </span>

              {t('opp_results_suffix')}

            </div>


            {/* ==================================================
                RESULTS
            ================================================== */}

            {sorted.length > 0 ? (

              <>

                <div className="grid-3">

                  {paginated.map(op => (

                    <OpportunityCard
                      key={op.id}
                      opportunity={op}
                      autoOpenDetail={
                        highlightOppKey !== null &&
                        String(
                          op.id || op.title
                        ) ===
                        String(
                          highlightOppKey
                        )
                      }
                    />

                  ))}

                </div>


                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={
                    handlePageChange
                  }
                />

              </>

            ) : (

              <div className="empty-state">

                <div
                  className="empty-state__icon"
                  style={{
                    color:
                      'var(--color-text-muted, #94a3b8)',
                  }}
                >
                  <SearchIcon />
                </div>

                <div className="empty-state__title">
                  {t('opp_empty_title')}
                </div>

                <p className="empty-state__desc">
                  {t('opp_empty_desc')}
                </p>

              </div>

            )}

          </>

        )}

      </div>
    </div>
  )
}