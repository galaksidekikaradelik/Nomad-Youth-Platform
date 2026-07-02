import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import OpportunityCard from '../components/OpportunityCard'
import EventCard from '../components/EventCard'
import { opportunities } from '../data/opportunities'
import { events } from '../data/events'

const SCOPES = [
  { id: 'hamisi',     label: 'Hamısı' },
  { id: 'beynelxalq', label: '🌍 Beynəlxalq' },
  { id: 'yerli',      label: '🇦🇿 Yerli' },
]

const CATEGORIES = ['Hamısı', 'Könüllülük', 'Erasmus+', 'ESC', 'Təcrübə', 'Təlim', 'Qrant', 'Konfrans']

const FORMATS = [
  { id: 'Hamısı', label: 'Hamısı' },
  { id: 'Online', label: '💻 Onlayn' },
  { id: 'Onsite', label: '📍 Əyani' },
]

const SORT_OPTIONS = [
  { id: 'deadline',  label: 'Deadline (yaxın)' },
  { id: 'newest',    label: 'Əlavə olunma tarixi (yeni)' },
  { id: 'country',   label: 'Ölkəyə görə (A-Z)' },
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
  const [searchParams] = useSearchParams()
  const initialScope   = searchParams.get('scope') || 'hamisi'

  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('Hamısı')
  const [scope,    setScope]    = useState(initialScope)
  const [format,   setFormat]   = useState('Hamısı')
  const [sort,     setSort]     = useState('deadline')
  const [tab,      setTab]      = useState('opportunities')

  const filtered = useMemo(() => enriched.filter(op => {
    const matchCat    = category === 'Hamısı' || op.type === category
    const matchScope  = scope === 'hamisi' || op.scope === scope
    const matchFormat = format === 'Hamısı' || op.format === format
    const matchSearch = !search ||
      op.title.toLowerCase().includes(search.toLowerCase()) ||
      op.organization.toLowerCase().includes(search.toLowerCase()) ||
      op.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
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
          <div className="page-header__eyebrow">Kəşf Et</div>
          <h1 className="page-header__title">İmkanlar</h1>
          <p className="page-header__desc">
            Maraqlarına uyğun imkanları filterlə və özünə ən uyğun layihəni tap.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="tab-switcher">
          <button className={`tab-btn${tab === 'opportunities' ? ' active' : ''}`} onClick={() => setTab('opportunities')}>
            📋 İmkanlar
          </button>
          <button className={`tab-btn${tab === 'events' ? ' active' : ''}`} onClick={() => setTab('events')}>
            📅 Yaxınlaşan Tədbirlər
          </button>
        </div>

        {tab === 'opportunities' && (
          <>
            <div style={{ marginBottom: 'var(--space-xl)' }}>
              <SearchBar
                placeholder="İmkan, təşkilat və ya açar söz axtar..."
                onSearch={({ query }) => setSearch(query)}
              />
            </div>

            {/* Filters */}
            <div className="filter-group">
              <div className="filter-group__row">
                <span className="filter-group__label">Layihənin növü</span>
                <div className="filter-group__chips">
                  {SCOPES.map(s => (
                    <FilterChip key={s.id} label={s.label} active={scope === s.id} onClick={() => setScope(s.id)} />
                  ))}
                </div>
              </div>

              <div className="filter-group__row">
                <span className="filter-group__label">Kateqoriya</span>
                <div className="filter-group__chips">
                  {CATEGORIES.map(c => (
                    <FilterChip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
                  ))}
                </div>
              </div>

              <div className="filter-group__row">
                <span className="filter-group__label">Format</span>
                <div className="filter-group__chips">
                  {FORMATS.map(f => (
                    <FilterChip key={f.id} label={f.label} active={format === f.id} onClick={() => setFormat(f.id)} />
                  ))}
                </div>
              </div>

              <div className="filter-group__row">
                <span className="filter-group__label">Sırala</span>
                <select
                  className="search-bar__select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{ border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '8px 16px' }}
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-lg)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Sənin üçün <span style={{ color: 'var(--brand-900)', fontWeight: 700 }}>{sorted.length}</span> imkan tapıldı
            </div>

            {sorted.length > 0 ? (
              <div className="grid-3">
                {sorted.map(op => <OpportunityCard key={op.id} opportunity={op} />)}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state__icon">🔍</div>
                <div className="empty-state__title">Nəticə tapılmadı</div>
                <p className="empty-state__desc">Filtri dəyişdirərək yenidən cəhd edin.</p>
              </div>
            )}
          </>
        )}

        {tab === 'events' && (
          <>
            <div style={{ marginBottom: 'var(--space-lg)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--brand-900)', fontWeight: 700 }}>{events.length}</span> yaxınlaşan tədbir
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