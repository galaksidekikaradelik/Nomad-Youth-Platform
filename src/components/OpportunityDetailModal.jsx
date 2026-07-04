import { createPortal } from 'react-dom'
import { useLanguage } from '../hooks/useLanguage'
import { translateCategory } from '../data/categoryTranslation'
import { getCategoryStyle } from '../utils/categoryStyle'

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

export default function OpportunityDetailModal({ opportunity, open, onClose, onRequireAuth }) {
  const { t, lang } = useLanguage()
  if (!open || !opportunity) return null

  const { title, format, category, location, deadline, applyLink, description, publishedAt } = opportunity

  const locale = lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'az-AZ'
  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null
  const formattedPublished = publishedAt
    ? new Date(publishedAt).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null

  const typeLabel = format === 'Online' ? t('type_online') : format === 'Offline' ? t('type_offline') : format
  const categories = Array.isArray(category) ? category : (category ? [category] : [])

  return createPortal(
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-modal__close" onClick={onClose} aria-label="Bağla">×</button>

        <div className="detail-modal__header">
          <span className="detail-modal__location">{location}</span>
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

        {description && (
          <div className="detail-modal__section">
            <h4 className="detail-modal__section-title">{t('card_description') || 'Açıqlama'}</h4>
            <p className="detail-modal__description">{description}</p>
          </div>
        )}

        <div className="detail-modal__meta">
          {formattedDeadline && (
            <div className="detail-modal__meta-row">
              <strong>{t('card_deadline')}</strong> {formattedDeadline}
            </div>
          )}
          {formattedPublished && (
            <div className="detail-modal__meta-row detail-modal__meta-row--muted">
              <strong>{t('card_published')}</strong> {formattedPublished}
            </div>
          )}
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