import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import { trainings, trainingCategories } from '../data/trainings'

const formatFilters = [
  { id: 'hamisi', label: 'Hamısı' },
  { id: 'online', label: 'Online' },
  { id: 'offline', label: 'Offline' },
  { id: 'hybrid', label: 'Hibrid' },
]

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const UsersIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

function TrainingCard({ training }) {
  const { title, provider, providerLogo, level, duration, format, price, language, description, tags, rating, students } = training

  const formatLabel = { online: 'Online', offline: 'Offline', hybrid: 'Hibrid' }
  const levelColor  = { 'Başlanğıc': 'var(--color-accent-3)', 'Orta': 'var(--color-primary)', 'İrəliləmiş': 'var(--color-accent-2)' }

  return (
    <div className="opportunity-card">
      <div className="opportunity-card__header">
        <div className="opportunity-card__org">
          <div className="opportunity-card__logo">{providerLogo}</div>
          <div>
            <div className="opportunity-card__org-name">{provider}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <span style={{ color: 'gold', display: 'flex' }}><StarIcon /></span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{rating} · {students} tələbə</span>
            </div>
          </div>
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: levelColor[level] || 'var(--color-text-muted)',
          background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
          padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
          {level}
        </span>
      </div>

      <h3 className="opportunity-card__title">{title}</h3>
      <p className="opportunity-card__desc">{description}</p>

      <div className="opportunity-card__tags">
        {tags.map(tag => (
          <span key={tag} className="opportunity-card__tag">{tag}</span>
        ))}
      </div>

      <div className="opportunity-card__footer">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div className="opportunity-card__meta">
            <ClockIcon /> {duration} · {formatLabel[format]}
          </div>
          <div className="opportunity-card__meta">
            <UsersIcon /> {language}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem',
            color: price === 'Pulsuz' ? 'var(--color-accent-3)' : 'var(--color-text)' }}>
            {price}
          </span>
          <span className="opportunity-card__apply">
            Qeydiyyat <ArrowIcon />
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Trainings() {
  const [activeCategory, setActiveCategory] = useState('hamisi')
  const [activeFormat, setActiveFormat]     = useState('hamisi')
  const [search, setSearch]                 = useState('')

  const filtered = trainings.filter(tr => {
    const matchCat    = activeCategory === 'hamisi' || tr.category === activeCategory
    const matchFormat = activeFormat === 'hamisi' || tr.format === activeFormat
    const matchSearch = !search ||
      tr.title.toLowerCase().includes(search.toLowerCase()) ||
      tr.provider.toLowerCase().includes(search.toLowerCase()) ||
      tr.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchFormat && matchSearch
  })

  return (
    <div className="section">
      <div className="container">

        <div className="page-header">
          <div className="page-header__eyebrow">Təlimlər</div>
          <h1 className="page-header__title">Təlim & Kurslar</h1>
          <p className="page-header__desc">
            Peşəkar inkişaf üçün onlayn və oflayn kurslar — öz sürətinlə öyrən, bilikini artır.
          </p>
        </div>

        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <SearchBar
            placeholder="Kurs, mövzu və ya provayder axtar..."
            onSearch={({ query }) => setSearch(query)}
          />
        </div>

        <div className="filters">
          {trainingCategories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="filters" style={{ marginTop: 'calc(var(--space-sm) * -1)' }}>
          {formatFilters.map(f => (
            <button
              key={f.id}
              className={`filter-btn${activeFormat === f.id ? ' active' : ''}`}
              onClick={() => setActiveFormat(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{filtered.length}</span> kurs tapıldı
        </div>

        {filtered.length > 0 ? (
          <div className="grid-3">
            {filtered.map(tr => (
              <TrainingCard key={tr.id} training={tr} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">📚</div>
            <div className="empty-state__title">Kurs tapılmadı</div>
            <p className="empty-state__desc">Filtri dəyişdirərək yenidən axtarın.</p>
          </div>
        )}

      </div>
    </div>
  )
}
