import { useState } from 'react'
import { useLanguage } from '..//hooks/useLanguage'
import AuthPromptModal from './AuthPromptModal'

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

const WarningIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
  </svg>
)

function getDaysLeft(deadline) {
  if (!deadline) return null
  const diff = new Date(deadline) - new Date()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days > 0 ? days : 0
}

const COUNTRY_CODES = {
  'Gürcüstan': 'ge',
  'İtaliya': 'it',
  'Macarıstan': 'hu',
  'Polşa': 'pl',
  'İspaniya': 'es',
  'Çexiya': 'cz',
  'İsveç': 'se',
  'Livan': 'lb',
  'Yunanistan': 'gr',
  'Finlandiya': 'fi',
  'Belçika': 'be',
  'Xorvatiya': 'hr',
  'Azərbaycan': 'az',
  'Türkiyə': 'tr',
  'Almaniya': 'de',
  'Fransa': 'fr',
  'Portuqaliya': 'pt',
  'Rumıniya': 'ro',
  'Bolqarıstan': 'bg',
  'Estoniya': 'ee',
  'Latviya': 'lv',
  'Litva': 'lt',
  'Sloveniya': 'si',
  'Slovakiya': 'sk',
  'Niderland': 'nl',
  'Avstriya': 'at',
  'Malta': 'mt',
  'Kipr': 'cy',
  'Serbiya': 'rs',
  'Şimali Makedoniya': 'mk',
  'Albaniya': 'al',
  'Çernoqoriya': 'me',
  'Bosniya və Herseqovina': 'ba',
  'Ukrayna': 'ua',
  'Moldova': 'md',
}

function FlagIcon({ location }) {
  const code = COUNTRY_CODES[location]
  if (!code) return <span className="opportunity-card__flag-fallback">🌍</span>
  return <span className={`fi fi-${code} opportunity-card__flag`} title={location} />
}

const URGENT_THRESHOLD_DAYS = 3

export default function OpportunityCard({ opportunity }) {
  const { t, lang } = useLanguage()
  const { title, format, location, deadline, applyLink, publishedAt } = opportunity
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)

  const locale = lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'az-AZ'

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null

  const daysLeft = getDaysLeft(deadline)
  const isUrgent = daysLeft !== null && daysLeft <= URGENT_THRESHOLD_DAYS
  const formattedPublished = publishedAt
    ? new Date(publishedAt).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null

  const typeLabel = format === 'Online' ? t('type_online') : format === 'Onsite' ? t('type_offline') : format
  const typeModifier = format === 'Online' ? 'online' : format === 'Onsite' ? 'offline' : null

  return (
    <div className="opportunity-card">
      <div className="opportunity-card__top">
        <h3 className="opportunity-card__title">{title}</h3>
        <div className="opportunity-card__icons">
          <button
            className="opportunity-card__icon-btn"
            onClick={(e) => { e.stopPropagation(); setShowAuthPrompt(true) }}
            aria-label="Bəyən"
          >
            <HeartIcon active={false} />
          </button>
          <button
            className="opportunity-card__icon-btn"
            onClick={(e) => { e.stopPropagation(); setShowAuthPrompt(true) }}
            aria-label="Yadda saxla"
          >
            <BookmarkIcon active={false} />
          </button>
        </div>
      </div>

      <div className="opportunity-card__divider" />

      <div className="opportunity-card__topic">
        <span className="opportunity-card__topic-label">{t('card_topic')}</span>
        <div className="opportunity-card__tags">
          <span className="opportunity-card__tag opportunity-card__tag--flag">
            <FlagIcon location={location} /> {location}
          </span>
          {typeLabel && (
            <span className={`opportunity-card__tag opportunity-card__tag--type${typeModifier ? ` opportunity-card__tag--${typeModifier}` : ''}`}>
              {typeLabel}
            </span>
          )}
        </div>
      </div>

      <div className="opportunity-card__divider" />

      <div className="opportunity-card__footer">
        <div className="opportunity-card__dates">
          {formattedDeadline && (
            <div className="opportunity-card__date-row">
              {t('card_deadline')} {formattedDeadline}
              {daysLeft !== null && (
                <span className={`opportunity-card__days-left${isUrgent ? ' opportunity-card__days-left--urgent' : ''}`}>
                  {isUrgent && <WarningIcon />} {daysLeft} {t('card_days_left')}
                </span>
              )}
            </div>
          )}
          {formattedPublished && (
            <div className="opportunity-card__date-row opportunity-card__date-row--muted">
              {t('card_published')} {formattedPublished}
            </div>
          )}
        </div>

        {applyLink ? (
          <a
            href={applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="opportunity-card__apply-btn"
            onClick={(e) => e.stopPropagation()}
          >
            {t('card_apply')} <ArrowIcon />
          </a>
        ) : (
          <span className="opportunity-card__apply-btn opportunity-card__apply-btn--disabled">
            {t('card_apply')} <ArrowIcon />
          </span>
        )}
      </div>

      <AuthPromptModal open={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />
    </div>
  )
}