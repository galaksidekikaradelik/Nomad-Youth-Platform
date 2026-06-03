const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

export default function EventCard({ event }) {
  const { title, category, emoji, type, date, time, location, price, priceAmount } = event

  return (
    <div className="event-card">
      <div className="event-card__image">
        {emoji}
        <div className="event-card__date-badge">
          <div className="event-card__date-day">{date.day}</div>
          <div className="event-card__date-month">{date.month}</div>
        </div>
        <span className={`event-card__type-badge event-card__type-badge--${type}`}>
          {type === 'online' ? 'Online' : 'Offline'}
        </span>
      </div>

      <div className="event-card__body">
        <div className="event-card__category">{category}</div>
        <h3 className="event-card__title">{title}</h3>
        <div className="event-card__info">
          <div className="event-card__info-row">
            <ClockIcon /> {time}
          </div>
          <div className="event-card__info-row">
            <PinIcon /> {location}
          </div>
        </div>
      </div>

      <div className="event-card__footer">
        <span className={`event-card__price${price === 'Pulsuz' ? ' event-card__price--free' : ''}`}>
          {price === 'Pulsuz' ? '🆓 Pulsuz' : `💳 ${priceAmount}`}
        </span>
        <span className="event-card__register">
          Qeydiyyat <ArrowIcon />
        </span>
      </div>
    </div>
  )
}