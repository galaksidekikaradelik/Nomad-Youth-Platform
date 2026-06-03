import { Link } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import OpportunityCard from '../components/OpportunityCard/OpportunityCard'
import { opportunities } from '../data/opportunities'

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function Home() {
  return (
    <>
      <Hero />

      {/* ── Bütün Elanlar birbaşa görünür ── */}
      <section className="section" id="opportunities">
        <div className="container">
          <div className="section-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div>
              <div className="section-heading__eyebrow">İmkanlar</div>
              <h2 className="section-heading__title">Bütün Elanlar</h2>
              <p className="section-heading__desc">
                Sənə uyğun imkanı tap, müraciət et, inkişaf et.
              </p>
            </div>
            <Link to="/opportunities" className="btn-outline">
              Hamısına bax <ArrowIcon />
            </Link>
          </div>

          <div className="grid-3">
            {opportunities.map(op => (
              <OpportunityCard key={op.id} opportunity={op} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
