import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import EventCard from '../components/EventCard'
import { events } from '../data/events'

const typeFilters = [
  { id: 'hamisi', label: 'Hamısı' },
  { id: 'online', label: 'Online' },
  { id: 'offline', label: 'Offline' },
]

const priceFilters = ['Hamısı', 'Pulsuz', 'Pullu']

export default function Events() {
  const [activeType, setActiveType]   = useState('hamisi')
  const [activePrice, setActivePrice] = useState('Hamısı')
  const [search, setSearch]           = useState('')

  const filtered = events.filter(ev => {
    const matchType  = activeType === 'hamisi' || ev.type === activeType
    const matchPrice = activePrice === 'Hamısı' || ev.price === activePrice
    const matchSearch = !search ||
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.category.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase())
    return matchType && matchPrice && matchSearch
  })

  return (
    <div className="section">
      <div className="container">

        <div className="page-header">
          <div className="page-header__eyebrow">Tədbirlər</div>
          <h1 className="page-header__title">Yaxınlaşan Tədbirlər</h1>
          <p className="page-header__desc">
            Sammitlər, vebinarlar, bootcamplar və daha çox — bilik və networking üçün doğru yerə gəldin.
          </p>
        </div>

        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <SearchBar
            placeholder="Tədbir, yer və ya kateqoriya axtar..."
            onSearch={({ query }) => setSearch(query)}
          />
        </div>

        <div className="filters">
          {typeFilters.map(t => (
            <button
              key={t.id}
              className={`filter-btn${activeType === t.id ? ' active' : ''}`}
              onClick={() => setActiveType(t.id)}
            >
              {t.label}
            </button>
          ))}

          <div style={{ width: 1, height: 24, background: 'var(--color-border)', margin: '0 4px' }} />

          {priceFilters.map(p => (
            <button
              key={p}
              className={`filter-btn${activePrice === p ? ' active' : ''}`}
              onClick={() => setActivePrice(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{filtered.length}</span> tədbir tapıldı
        </div>

        {filtered.length > 0 ? (
          <div className="grid-3">
            {filtered.map(ev => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">📅</div>
            <div className="empty-state__title">Tədbir tapılmadı</div>
            <p className="empty-state__desc">Filtri dəyişdirərək yenidən axtarın.</p>
          </div>
        )}

      </div>
    </div>
  )
}
