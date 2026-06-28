import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import OpportunityCard from '../components/OpportunityCard'
import EventCard from '../components/EventCard'
import { opportunities } from '../data/opportunities'
import { events } from '../data/events'

const CATEGORIES = ['Hamısı', 'Könüllülük', 'Təcrübə', 'Qrant']
const FORMATS    = ['Hamısı', 'Online', 'Onsite']

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

  return (
    <div className="section">
      <div className="container">

        <div className="page-header">
          <div className="page-header__eyebrow">Kəşf Et</div>
          <h1 className="page-header__title">İmkanlar & Tədbirlər</h1>
          <p className="page-header__desc">
            Könüllülük, təcrübə, qrant — istədiyin filtrlə tap.
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
                <span className="filter-group__label">Əhatə</span>
                <div className="filter-group__chips">
                  {[
                    { id: 'hamisi',     label: 'Hamısı' },
                    { id: 'beynelxalq', label: 'Beynəlxalq' },
                    { id: 'yerli',      label: 'Yerli' },
                  ].map(s => (
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
                    <FilterChip key={f} label={f} active={format === f} onClick={() => setFormat(f)} />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-lg)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--brand-900)', fontWeight: 700 }}>{filtered.length}</span> imkan tapıldı
            </div>

            {filtered.length > 0 ? (
              <div className="grid-3">
                {filtered.map(op => <OpportunityCard key={op.id} opportunity={op} />)}
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
