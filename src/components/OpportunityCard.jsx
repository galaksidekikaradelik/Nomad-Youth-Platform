import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'

const HeartIcon = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
)

const BookmarkIcon = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

function getDaysLeft(deadline) {
  const diff = new Date(deadline) - new Date()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days > 0 ? days : 0
}

export default function OpportunityCard({ opportunity }) {
  const { t, lang } = useLanguage()
  const { title, tags, deadline, publishedAt, paid } = opportunity
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const locale = lang === 'en' ? 'en-GB' : 'az-AZ'
  const formattedDeadline = new Date(deadline).toLocaleDateString(locale, {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })
  const daysLeft = getDaysLeft(deadline)
  const daysSincePublished = publishedAt ? getDaysLeft(publishedAt) : null

  return (
    <div className="opportunity-card">
      <div className="opportunity-card__top">
        <h3 className="opportunity-card__title">{title}</h3>
        <div className="opportunity-card__icons">
          <button
            className={`opportunity-card__icon-btn${liked ? ' is-active opportunity-card__icon-btn--heart' : ''}`}
            onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
            aria-label="Bəyən"
          >
            <HeartIcon active={liked} />
          </button>
          <button
            className={`opportunity-card__icon-btn${saved ? ' is-active opportunity-card__icon-btn--bookmark' : ''}`}
            onClick={(e) => { e.stopPropagation(); setSaved(!saved) }}
            aria-label="Yadda saxla"
          >
            <BookmarkIcon active={saved} />
          </button>
        </div>
      </div>

      <div className="opportunity-card__divider" />

      <div className="opportunity-card__topic">
        <span className="opportunity-card__topic-label">{t('card_topic')}</span>
        <div className="opportunity-card__tags">
          {tags.map(tag => (
            <span key={tag} className="opportunity-card__tag">{tag}</span>
          ))}
          <span className="opportunity-card__tag">{paid ? t('card_paid') : t('card_free')}</span>
        </div>
      </div>

      <div className="opportunity-card__divider" />

      <div className="opportunity-card__footer">
        <div className="opportunity-card__dates">
          <div className="opportunity-card__date-row">
            {t('card_deadline')} {formattedDeadline} <span className="opportunity-card__days-left">({daysLeft} {t('card_days_left')})</span>
          </div>
          {daysSincePublished !== null && (
            <div className="opportunity-card__date-row opportunity-card__date-row--muted">
              {t('card_published')} {daysSincePublished} {t('card_days_left')}
            </div>
          )}
        </div>
        <button className="opportunity-card__apply-btn">
          {t('card_apply')} <ArrowIcon />
        </button>
      </div>
    </div>
  )
}