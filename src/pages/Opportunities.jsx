import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import SearchBar from '../components/SearchBar'
import OpportunityCard from '../components/OpportunityCard'
import EventCard from '../components/EventCard'
import { opportunities } from '../data/opportunities'
import { events } from '../data/events'

const SCOPES = [
  { id: 'hamisi',     labelKey: 'scope_all' },
  { id: 'beynelxalq', labelKey: 'scope_international' },
  { id: 'yerli',      labelKey: 'scope_local' },
]

// id-lər data-dakı `type` dəyərləri ilə eyni olmalıdır (filtrasiya üçün)
const CATEGORIES = [
  { id: '',            labelKey: 'category_all' },
  { id: 'Könüllülük',  labelKey: null },
  { id: 'Erasmus+',    labelKey: null },
  { id: 'ESC',         labelKey: null },
  { id: 'Təcrübə',     labelKey: null },
  { id: 'Təlim',       labelKey: null },
  { id: 'Qrant',       labelKey: null },
  { id: 'Konfrans',    labelKey: null },
]

const FORMATS = [
  { id: 'Hamısı', labelKey: 'format_all' },
  { id: 'Online', labelKey: 'format_online' },
  { id: 'Onsite', labelKey: 'format_onsite' },
]

const SORT_OPTIONS = [
  { id: 'deadline', labelKey: 'sort_deadline' },
  { id: 'newest',   labelKey: 'sort_newest' },
  { id: 'country',  labelKey: 'sort_country' },
]

const enriched = opportunities.map((op, i) => ({
  ...op,
  scope:  ['beynelxalq', 'beynelxalq', 'beynelxalq', 'beynelxalq', 'yerli', 'yerli'][i] || 'yerli',
  format: ['Onsite', 'Onsite', 'Online', 'Online', 'Onsite', 'Onsite'][i] || 'Onsite',
}))

const FilterChip = ({ label, active, onClick }) => (
  <button className={`filter-btn${active ? ' active' : ''}`} onClick={onClick}>{label}</button>
)

export default function Opportunities() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const initialScope   = searchParams.get('scope') || 'hamisi'

  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('')
  const [scope,    setScope]    = useState(initialScope)
  const [format,   setFormat]   = useState('Hamısı')
  const [sort,     setSort]     = useState('deadline')
  const [tab,      setTab]      = useState('opportunities')

  const filtered = useMemo(() => enriched.filter(op => {
    const matchCat    = category === '' || op.type === category
    const matchScope  = scope === 'hamisi' || op.scope === scope
    const matchFormat = format === 'Hamısı' || op.format === format
    const q = search.toLocaleLowerCase('az')
  const matchSearch = !search ||
    op.title.toLocaleLowerCase('az').includes(q) ||
    op.location?.toLocaleLowerCase('az').includes(q) ||
    op.organization?.toLocaleLowerCase('az').includes(q) ||
    op.tags.some(tag => tag.toLocaleLowerCase('az').includes(q))
    return matchCat && matchScope && matchFormat && matchSearch
  }), [search, category, scope, format])

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

        {/* Tab switcher */}
        <div className="tab-switcher">
          <button className={`tab-btn${tab === 'opportunities' ? ' active' : ''}`} onClick={() => setTab('opportunities')}>
            {t('opp_tab_opportunities')}
          </button>
          <button className={`tab-btn${tab === 'events' ? ' active' : ''}`} onClick={() => setTab('events')}>
            {t('opp_tab_events')}
          </button>
        </div>

        {tab === 'opportunities' && (
          <>
            <div style={{ marginBottom: 'var(--space-xl)' }}>
              <SearchBar
                placeholder={t('opp_search_placeholder')}
                query={search}
                category={category}
                onQueryChange={setSearch}
                onCategoryChange={setCategory}
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
                    <FilterChip key={c.id} label={c.labelKey ? t(c.labelKey) : c.id} active={category === c.id} onClick={() => setCategory(c.id)} />
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
                <span className="filter-group__label">{t('filter_sort_label')}</span>
                <select
                  className="search-bar__select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{ border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '8px 16px' }}
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.id} value={o.id}>{t(o.labelKey)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-lg)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {t('opp_results_prefix')} <span style={{ color: 'var(--brand-900)', fontWeight: 700 }}>{sorted.length}</span> {t('opp_results_suffix')}
            </div>

            {sorted.length > 0 ? (
              <div className="grid-3">
                {sorted.map(op => <OpportunityCard key={op.id} opportunity={op} />)}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state__icon">🔍</div>
                <div className="empty-state__title">{t('opp_empty_title')}</div>
                <p className="empty-state__desc">{t('opp_empty_desc')}</p>
              </div>
            )}
          </>
        )}

        {tab === 'events' && (
          <>
            <div style={{ marginBottom: 'var(--space-lg)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--brand-900)', fontWeight: 700 }}>{events.length}</span> {t('events_upcoming_suffix')}
            </div>
            <div className="grid-3">
              {events.map(ev => <EventCard key={ev.id} event={ev} />)}
            </div>
          </>
        )}

      </div>
    </div>
  )
}