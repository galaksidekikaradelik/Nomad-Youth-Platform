import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import OpportunityCard from '../components/OpportunityCard'
import { useOpportunities } from '../hooks/useOpportunities'
import { filterActiveOpportunities } from '../utils/opportunityStatus'
import { useLanguage } from '../hooks/useLanguage'
import aboutImg from '../assets/images/aboutUs.webp'
import servicesImg from '../assets/images/services.webp'
import partnerImg from '../assets/images/partnership.webp'

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const WarningTriangleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

export default function Home() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  
  const { opportunities, loading, error } = useOpportunities()

  const preview = useMemo(
    () => filterActiveOpportunities(opportunities).slice(0, 6),
    [opportunities]
  )

  const handleSearchSubmit = ({ query, category }) => {
    const params = new URLSearchParams()
    if (query) params.set('query', query)
    if (category) params.set('category', category)
    navigate(`/opportunities${params.toString() ? '?' + params.toString() : ''}`)
  }

  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        <SearchBar
          query={query}
          category={category}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
          onSubmit={handleSearchSubmit}
          showButton
        />
      </div>

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
            </div>
          ) : (
            <div className="grid-3">
              {preview.map(op => (
                <OpportunityCard key={op.id} opportunity={op} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Hero />

      <section className="section info-cards-section">
        <div className="container">
          <div className="grid-3 info-cards-grid">
            <Link to="/about" className="info-card">
              <img src={aboutImg} alt="Haqqımızda" className="info-card__image" />
              <span className="info-card__label">{t('info_about')}</span>
            </Link>
            <Link to="/services" className="info-card">
              <img src={servicesImg} alt="Xidmətlər" className="info-card__image" />
              <span className="info-card__label">{t('info_services')}</span>
            </Link>
            <Link to="/contact" className="info-card">
              <img src={partnerImg} alt="Tərəfdaşlıq" className="info-card__image" />
              <span className="info-card__label">{t('info_partnership')}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}