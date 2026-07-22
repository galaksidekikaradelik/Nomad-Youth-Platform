import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { translateCategory } from '../data/categoryTranslation'
import { CANONICAL_CATEGORIES } from '../utils/categoryMapping'
import SearchBar from '../components/SearchBar'
import OpportunityCard from '../components/OpportunityCard'
import { useOpportunities } from '../hooks/useOpportunities'
import { filterActiveOpportunities } from '../utils/opportunityStatus'


const WarningTriangleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const SearchIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const SCOPES = [
  { id: 'hamisi',     labelKey: 'scope_all' },
  { id: 'beynelxalq', labelKey: 'scope_international' },
  { id: 'yerli',      labelKey: 'scope_local' },
]

const CATEGORIES = [
  { id: '', labelKey: 'category_all' },
  ...CANONICAL_CATEGORIES.map(id => ({ id, labelKey: null })),
]

const TYPES = [
  { id: '',          labelKey: 'type_all' },
  { id: 'Seminar',   labelKey: 'type_seminar' },
  { id: 'Kurs',      labelKey: 'type_course' },
  { id: 'Konfrans',  labelKey: 'type_conference' },
  { id: 'Vebinar',   labelKey: 'type_webinar' },
  { id: 'Fəaliyyət', labelKey: 'type_activity' },
]

const FORMATS = [
  { id: 'Hamısı',  labelKey: 'format_all' },
  { id: 'Online',  labelKey: 'format_online' },
  { id: 'Offline', labelKey: 'format_onsite' },
]

const SORT_OPTIONS = [
  { id: 'deadline', labelKey: 'sort_deadline' },
  { id: 'newest',   labelKey: 'sort_newest' },
  { id: 'country',  labelKey: 'sort_country' },
]

const FilterChip = ({ label, active, onClick }) => (
  <button className={`filter-btn${active ? ' active' : ''}`} onClick={onClick}>{label}</button>
)

export default function Opportunities() {
  const { t, lang } = useLanguage()
  const [searchParams] = useSearchParams()
  const initialScope    = searchParams.get('scope') || 'hamisi'
  const initialQuery    = searchParams.get('query') || ''
  const initialCategory = searchParams.get('category') || ''
  // Bildiriş və ya digər yerlərdən "bu elanı göstər" keçidi üçün (məs. /opportunities?show=12)
  const highlightOppKey = searchParams.get('show') || null

  // Backend-dən opportunity cards çəkilir (əvvəlki statik import əvəzinə)
  const { opportunities, loading, error } = useOpportunities()

  const [search,     setSearch]     = useState(initialQuery)
  // Çoxlu kateqoriya seçimi üçün array. Boş array = "Hamısı" (filter yoxdur).
  const [categories, setCategories] = useState(initialCategory ? [initialCategory] : [])
  const [types,      setTypes]      = useState([])
  const [scope,      setScope]      = useState(initialScope)
  const [format,     setFormat]     = useState('Hamısı')
  const [sort,       setSort]       = useState('deadline')
  const [tab]        = useState('opportunities')

  const toggleCategory = (id) => {
    if (id === '') {
      setCategories([])
      return
    }
    setCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const toggleType = (id) => {
    if (id === '') {
      setTypes([])
      return
    }
    setTypes(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  // Fetch olunan datadan aktiv elanları çıxarıb "scope" sahəsini hesablayır.
  // Əvvəlki modul-səviyyəli `enriched` sabiti burada, opportunities dəyişdikdə
  // yenidən hesablanacaq şəkildə useMemo ilə saxlanılır.
  const enriched = useMemo(() => (
    filterActiveOpportunities(opportunities).map(op => ({
      ...op,
      scope: op.location === 'Azərbaycan' ? 'yerli' : 'beynelxalq',
    }))
  ), [opportunities])

  const filtered = useMemo(() => enriched.filter(op => {
    const matchCat    = categories.length === 0 ||
      (Array.isArray(op.categoryGroups) && categories.some(cat => op.categoryGroups.includes(cat)))
    const matchType   = types.length === 0 || types.includes(op.type)
    const matchScope  = scope === 'hamisi' || op.scope === scope
    const matchFormat = format === 'Hamısı' || op.format === format
    const q = search.toLocaleLowerCase('az')
    const matchSearch = !search ||
      op.title.toLocaleLowerCase('az').includes(q) ||
      op.location?.toLocaleLowerCase('az').includes(q) ||
      op.organization?.toLocaleLowerCase('az').includes(q) ||
      op.tags.some(tag => tag.toLocaleLowerCase('az').includes(q))
    return matchCat && matchType && matchScope && matchFormat && matchSearch
  }), [enriched, search, categories, types, scope, format])

  const sorted = useMemo(() => {
    const arr = [...filtered]
    if (sort === 'deadline') {
      arr.sort((a, b) => new Date(a.deadline || 0) - new Date(b.deadline || 0))
    } else if (sort === 'newest') {
      arr.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
    } else if (sort === 'country') {
      arr.sort((a, b) => a.location.localeCompare(b.location, 'az'))
    }
    return arr
  }, [filtered, sort])

  return (
    <div className="section">
      <div className="container">

        <div className="page-header">
          <div className="page-header__eyebrow">{t('opp_eyebrow')}</div>
          <h1 className="page-header__title">{t('opp_title')}</h1>
          <p className="page-header__desc">{t('opp_desc')}</p>
        </div>


        {tab === 'opportunities' && (
          <>
            <div className="opportunities-searchbar-wrap">
              <SearchBar
                placeholder={t('opp_search_placeholder')}
                query={search}
                category={categories[0] || ''}
                onQueryChange={setSearch}
                onCategoryChange={(id) => setCategories(id ? [id] : [])}
              />
            </div>

            {/* Filters */}
            <div className="filter-group">
              <div className="filter-group__row">
                <span className="filter-group__label">{t('filter_scope_label')}</span>
                <div className="filter-group__chips">
                  {SCOPES.map(s => (
                    <FilterChip key={s.id} label={t(s.labelKey)} active={scope === s.id} onClick={() => setScope(s.id)} />
                  ))}
                </div>
              </div>

              <div className="filter-group__row">
                <span className="filter-group__label">{t('filter_category_label')}</span>
                <div className="filter-group__chips">
                  {CATEGORIES.map(c => (
                    <FilterChip
                      key={c.id}
                      label={c.labelKey ? t(c.labelKey) : translateCategory(c.id, lang)}
                      active={c.id === '' ? categories.length === 0 : categories.includes(c.id)}
                      onClick={() => toggleCategory(c.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="filter-group__row">
                <span className="filter-group__label">{t('filter_type_label')}</span>
                <div className="filter-group__chips">
                  {TYPES.map(ty => (
                    <FilterChip
                      key={ty.id}
                      label={t(ty.labelKey)}
                      active={ty.id === '' ? types.length === 0 : types.includes(ty.id)}
                      onClick={() => toggleType(ty.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="filter-group__row">
                <span className="filter-group__label">{t('filter_format_label')}</span>
                <div className="filter-group__chips">
                  {FORMATS.map(f => (
                    <FilterChip key={f.id} label={t(f.labelKey)} active={format === f.id} onClick={() => setFormat(f.id)} />
                  ))}
                </div>
              </div>

              <div className="filter-group__row">
                <label htmlFor="opp-sort-select" className="filter-group__label">{t('filter_sort_label')}</label>
                <select
                  id="opp-sort-select"
                  className="search-bar__select filter-group__sort-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label={t('filter_sort_label')}
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.id} value={o.id}>{t(o.labelKey)}</option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="empty-state">
                <div className="empty-state__title">{t('opp_loading') || 'Yüklənir...'}</div>
              </div>
            ) : error ? (
              <div className="empty-state">
                <div className="empty-state__icon" style={{ color: 'var(--color-warning, #f59e0b)' }}>
                  <WarningTriangleIcon />
                </div>
                <div className="empty-state__title">{t('opp_error') || 'Elanları yükləmək mümkün olmadı.'}</div>
                <p className="empty-state__desc">Zəhmət olmasa bir az sonra yenidən cəhd edin.</p>
              </div>
            ) : (
              <>
                <div className="opportunities-results-count">
                  {t('opp_results_prefix')} <span className="opportunities-results-count__number">{sorted.length}</span> {t('opp_results_suffix')}
                </div>

                {sorted.length > 0 ? (
                  <div className="grid-3">
                    {sorted.map(op => (
                      <OpportunityCard
                        key={op.id}
                        opportunity={op}
                        autoOpenDetail={highlightOppKey !== null && String(op.id || op.title) === String(highlightOppKey)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-state__icon" style={{ color: 'var(--color-text-muted, #94a3b8)' }}>
                      <SearchIcon />
                    </div>
                    <div className="empty-state__title">{t('opp_empty_title')}</div>
                    <p className="empty-state__desc">{t('opp_empty_desc')}</p>
                  </div>
                )}
              </>
            )}
          </>
        )}

        

      </div>
    </div>
  )
}