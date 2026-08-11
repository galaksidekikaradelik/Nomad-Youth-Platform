import { createPortal } from 'react-dom'
import { useLanguage } from '../hooks/useLanguage'
import { translateCategory } from '../data/categoryTranslation'
import { getCategoryStyle } from '../utils/categoryStyle'
import {
  translateOpportunityValue,
  translateFinancialSupport,
  translateDuration,
  translateLanguageField,
} from '../data/opportunityValueTranslations'

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

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
)

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
  </svg>
)

const DateRangeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M8 14h2M14 14h2" />
  </svg>
)

const CoinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10M9 9.5c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5-1.3 2-3 2.5-3 1-3 2.5 1.3 2.5 3 2.5 3-1 3-2.5" />
  </svg>
)

function InfoItem({ icon, label, value }) {
  if (!value) return null
  return (
    <div className="detail-modal__info-item">
      <div className="detail-modal__info-icon">{icon}</div>
      <div className="detail-modal__info-text">
        <span className="detail-modal__info-label">{label}</span>
        <span className="detail-modal__info-value">{value}</span>
      </div>
    </div>
  )
}

export default function OpportunityDetailModal({ opportunity, open, onClose, onRequireAuth }) {
  const { t, lang } = useLanguage()
  if (!open || !opportunity) return null

  const {
    title, format, category, location, deadline, applyLink,
    description, descriptionTranslations,
    duration, language, eventDateRange, financialSupport,
  } = opportunity

  const locale = lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'az-AZ'
  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null

  const typeLabel = format === 'Online' ? t('type_online') : format === 'Offline' ? t('type_offline') : format
  const categories = Array.isArray(category) ? category : (category ? [category] : [])

  const translatedDescription = descriptionTranslations?.[lang]
  const fallbackDescription = descriptionTranslations?.az || description
  const showingFallback = !translatedDescription && lang !== 'az'
  const descriptionToShow = translatedDescription || fallbackDescription

  const translatedLocation = translateOpportunityValue(location, lang)
  const translatedLanguage = translateLanguageField(language, lang)
  const translatedFinancialSupport = translateFinancialSupport(financialSupport, lang)
  const translatedDuration = translateDuration(duration, lang)

  return createPortal(
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-modal__close" onClick={onClose} aria-label="Bağla">×</button>

        <div className="detail-modal__header">
          <span className="detail-modal__location">{translatedLocation}</span>
          <h2 className="detail-modal__title">{title}</h2>

          <div className="detail-modal__tags">
            {typeLabel && (
              <span className="opportunity-card__tag opportunity-card__tag--type">
                {typeLabel}
              </span>
            )}
            {categories.map(cat => (
              <span
                key={cat}
                className="opportunity-card__tag opportunity-card__category-badge"
                style={getCategoryStyle(cat)}
              >
                {translateCategory(cat, lang)}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-modal__divider" />

        {descriptionToShow && (
          <div className="detail-modal__section">
            <h4 className="detail-modal__section-title">{t('card_description') || 'Açıqlama'}</h4>
            {showingFallback && (
              <p className="detail-modal__translation-note">
                {t('card_description_untranslated')}
              </p>
            )}
            <p className="detail-modal__description">{descriptionToShow}</p>
          </div>
        )}

        <div className="detail-modal__info-grid">
          <InfoItem icon={<CalendarIcon />} label={t('card_deadline')} value={formattedDeadline} />
          <InfoItem icon={<PinIcon />} label={t('card_location')} value={translatedLocation} />
          <InfoItem icon={<ClockIcon />} label={t('card_duration')} value={translatedDuration} />
          <InfoItem icon={<GlobeIcon />} label={t('card_language')} value={translatedLanguage} />
          <InfoItem icon={<DateRangeIcon />} label={t('card_event_date_range')} value={eventDateRange} />
          <InfoItem icon={<CoinIcon />} label={t('card_financial_support')} value={translatedFinancialSupport} />
        </div>

        <div className="detail-modal__divider" />

        <div className="detail-modal__actions">
          <div className="detail-modal__icons">
            <button
              className="opportunity-card__icon-btn"
              onClick={onRequireAuth}
              aria-label="Bəyən"
            >
              <HeartIcon active={false} />
            </button>
            <button
              className="opportunity-card__icon-btn"
              onClick={onRequireAuth}
              aria-label="Yadda saxla"
            >
              <BookmarkIcon active={false} />
            </button>
          </div>

          {applyLink ? (
            <a
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="opportunity-card__apply-btn"
            >
              {t('card_apply')} <ArrowIcon />
            </a>
          ) : (
            <span className="opportunity-card__apply-btn opportunity-card__apply-btn--disabled">
              {t('card_apply')} <ArrowIcon />
            </span>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}