const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

export default function OpportunityCard({ opportunity }) {
  const { title, organization, orgLogo, type, description, tags, location, deadline, featured, paid } = opportunity

  const formattedDeadline = new Date(deadline).toLocaleDateString('az-AZ', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="opportunity-card">
      <div className="opportunity-card__header">
        <div className="opportunity-card__org">
          <div className="opportunity-card__logo">{orgLogo}</div>
          <div>
            <div className="opportunity-card__org-name">{organization}</div>
          </div>
        </div>
        <span className={`opportunity-card__badge${featured ? ' opportunity-card__badge--featured' : ''}`}>
          {featured ? '⭐ Seçilmiş' : type}
        </span>
      </div>

      <h3 className="opportunity-card__title">{title}</h3>
      <p className="opportunity-card__desc">{description}</p>

      <div className="opportunity-card__tags">
        {tags.map(tag => (
          <span key={tag} className="opportunity-card__tag">{tag}</span>
        ))}
        <span className="opportunity-card__tag" style={{ color: paid ? 'var(--color-accent-3)' : 'var(--color-text-muted)' }}>
          {paid ? '💰 Ödənişli' : '🆓 Pulsuz'}
        </span>
      </div>

      <div className="opportunity-card__footer">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div className="opportunity-card__meta">
            <PinIcon /> {location}
          </div>
          <div className="opportunity-card__meta">
            <CalendarIcon /> Son tarix: {formattedDeadline}
          </div>
        </div>
        <span className="opportunity-card__apply">
          Müraciət et <ArrowIcon />
        </span>
      </div>
    </div>
  )
}
