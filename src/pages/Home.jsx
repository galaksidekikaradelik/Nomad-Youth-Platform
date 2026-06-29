import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import OpportunityCard from '../components/OpportunityCard'
import { opportunities } from '../data/opportunities'
import { useLanguage } from '../hooks/useLanguage'
import aboutImg from '../assets/images/about.png'
import servicesImg from '../assets/images/services.png'
import partnerImg from '../assets/images/partnership.png'

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function Home() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const preview = useMemo(() => opportunities.slice(0, 6), [])

  const handleSearch = ({ query, category }) => {
    const params = new URLSearchParams()
    if (query) params.set('query', query)
    if (category) params.set('category', category)
    navigate(`/opportunities${params.toString() ? '?' + params.toString() : ''}`)
  }

  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        <SearchBar onSearch={handleSearch} />
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

          <div className="grid-3">
            {preview.map(op => (
              <OpportunityCard key={op.id} opportunity={op} />
            ))}
          </div>
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
            <Link to="/services#terefdas" className="info-card">
              <img src={partnerImg} alt="Tərəfdaşlıq" className="info-card__image" />
              <span className="info-card__label">{t('info_partnership')}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}