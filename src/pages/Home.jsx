import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import SearchBar from '../components/SearchBar/SearchBar'
import OpportunityCard from '../components/OpportunityCard/OpportunityCard'
import { opportunities } from '../data/opportunities'
import { useLanguage } from '../hooks/useLanguage'

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function Home() {
  const { t } = useLanguage()
  const [filters, setFilters] = useState({ query: '', category: '' })

  const filtered = useMemo(() => {
    return opportunities.filter(op => {
      const matchesQuery = filters.query.trim() === '' ||
        op.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        op.organization?.toLowerCase().includes(filters.query.toLowerCase()) ||
        op.tags?.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()))

      const matchesCategory = filters.category === '' || op.type === filters.category

      return matchesQuery && matchesCategory
    })
  }, [filters])

  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        <SearchBar onSearch={setFilters} />
      </div>

      {/* ── Bütün Elanlar birbaşa görünür ── */}
      <section className="section" id="opportunities">
        <div className="container">
          <div className="section-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div>
              <div className="section-heading__eyebrow">{t('opportunities_eyebrow')}</div>
              <h2 className="section-heading__title">{t('opportunities_title')}</h2>
              <p className="section-heading__desc">
                {t('opportunities_desc')}
              </p>
            </div>
            <Link to="/opportunities" className="btn-outline">
              {t('opportunities_see_all')} <ArrowIcon />
            </Link>
          </div>

          {filtered.length > 0 ? (
            <div className="grid-3">
              {filtered.map(op => (
                <OpportunityCard key={op.id} opportunity={op} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">🔍</div>
              <div className="empty-state__title">{t('opportunities_empty_title')}</div>
              <p className="empty-state__desc">{t('opportunities_empty_desc')}</p>
            </div>
          )}
        </div>
      </section>

      <Hero />

      <section className="section info-cards-section">
        <div className="container">
          <div className="grid-3 info-cards-grid">
            <Link to="/about" className="info-card">
              <span className="info-card__label">{t('info_about')}</span>
            </Link>
            <Link to="/services" className="info-card">
              <span className="info-card__label">{t('info_services')}</span>
            </Link>
            <Link to="/services#terefdas" className="info-card">
              <span className="info-card__label">{t('info_partnership')}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}