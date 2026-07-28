import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '..//hooks/useLanguage'
import { useAuth } from '../hooks/useAuth'
import { translateCategory } from '../data/categoryTranslation'
import { getCategoryStyle } from '../utils/categoryStyle'
import { useWishlist } from '../hooks/useWishlist'
import { useLike } from '../hooks/useLike'
import StatusSelector from './StatusSelector'
import AuthPromptModal from './AuthPromptModal'
import OpportunityDetailModal from './OpportunityDetailModal'
import ApplyConfirmModal from './ApplyConfirmModal'

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

const TYPE_LABEL_KEYS = {
  'Seminar':   'type_seminar',
  'Kurs':      'type_course',
  'Konfrans':  'type_conference',
  'Vebinar':   'type_webinar',
  'Fəaliyyət': 'type_activity',
}

export default function OpportunityCard({ opportunity, autoOpenDetail = false }) {
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const { title, format, category, type, location, deadline, applyLink, publishedAt } = opportunity
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [showDetail, setShowDetail] = useState(autoOpenDetail)
  const [showApplyConfirm, setShowApplyConfirm] = useState(false)
  const cardRef = useRef(null)


  useEffect(() => {
    if (!autoOpenDetail) return
    const timer = setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // "Bəyən" (heart) - artıq backend like-inə bağlıdır.
  // Vəziyyət (liked) və dəyişdirmə (toggleLike) mərkəzi LikeContext-dən
  // gəlir, hər kart öz-özünə backend-i çağırmır.
  const { likedIds, toggleLike: toggleLikeRemote } = useLike()
  const liked = opportunity.id ? likedIds.has(opportunity.id) : false

  function toggleLike(e) {
    e.stopPropagation()
    if (!user) { setShowAuthPrompt(true); return }
    if (!opportunity.id) return // like üçün real backend id lazımdır
    toggleLikeRemote(opportunity.id)
  }

  // "Yadda saxla" (bookmark) - artıq backend wishlist-inə bağlıdır.
  // Vəziyyət (saved) və dəyişdirmə (toggleSave) mərkəzi WishlistContext-dən
  // gəlir, hər kart öz-özünə backend-i çağırmır.
  const { savedIds, toggleSave: toggleWishlist } = useWishlist()
  const saved = opportunity.id ? savedIds.has(opportunity.id) : false

  function toggleSave(e) {
    e.stopPropagation()
    if (!user) { setShowAuthPrompt(true); return }
    if (!opportunity.id) return // wishlist üçün real backend id lazımdır
    toggleWishlist(opportunity.id)
  }

  // "Müraciət et" - birbaşa xarici linkə açmaq əvəzinə, əvvəlcə
  // istifadəçini platformadan ayrılacağı barədə xəbərdar edən təsdiq
  // pəncərəsi göstərilir. Yalnız "Davam et" seçiləndə rəsmi müraciət
  // linki yeni tab-da açılır.
  function handleApplyClick(e) {
    e.stopPropagation()
    e.preventDefault()
    if (!applyLink) return
    setShowApplyConfirm(true)
  }

  function confirmApply() {
    setShowApplyConfirm(false)
    window.open(applyLink, '_blank', 'noopener,noreferrer')
  }

  const locale = lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'az-AZ'

  // DƏYİŞDİ: tarix yoxdursa artıq sətir gizlənmir, "Müəyyən olunmayıb"
  // (dilə uyğun tərcümə açarı: date_not_specified) göstərilir.
  const dateNotSpecified = t('date_not_specified') || 'Müəyyən olunmayıb'

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : dateNotSpecified

  const daysLeft = getDaysLeft(deadline)
  const isUrgent = daysLeft !== null && daysLeft <= URGENT_THRESHOLD_DAYS
  const formattedPublished = publishedAt
    ? new Date(publishedAt).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : dateNotSpecified

  const formatLabel = format === 'Online' ? t('type_online') : format === 'Offline' ? t('type_offline') : format
  const formatModifier = format === 'Online' ? 'online' : format === 'Offline' ? 'offline' : null

  const typeLabelKey = type ? TYPE_LABEL_KEYS[type] : null
  const typeLabel = typeLabelKey ? t(typeLabelKey) : type

  const categories = Array.isArray(category) ? category : (category ? [category] : [])

  return (
    <div className="opportunity-card" ref={cardRef}>
      <div className="opportunity-card__top">
        <div className="opportunity-card__top-row">
          <span className="opportunity-card__tag opportunity-card__tag--flag opportunity-card__tag--flag-top">
            <FlagIcon location={location} />
          </span>
          <div className="opportunity-card__icons">
            <button
              className={`opportunity-card__icon-btn opportunity-card__icon-btn--heart${liked ? ' is-active' : ''}`}
              onClick={toggleLike}
              aria-label="Bəyən"
            >
              <HeartIcon active={liked} />
            </button>
            <button
              className={`opportunity-card__icon-btn opportunity-card__icon-btn--bookmark${saved ? ' is-active' : ''}`}
              onClick={toggleSave}
              aria-label="Yadda saxla"
            >
              <BookmarkIcon active={saved} />
            </button>
          </div>
        </div>
        <h3 className="opportunity-card__title" data-tooltip={title}>{title}</h3>
      </div>

      <div className="opportunity-card__topic">
        <div className="opportunity-card__tags">
          {formatLabel && (
            <span className={`opportunity-card__tag opportunity-card__tag--type${formatModifier ? ` opportunity-card__tag--${formatModifier}` : ''}`}>
              {formatLabel}
            </span>
          )}
          {typeLabel && (
            <span
              className="opportunity-card__tag opportunity-card__category-badge"
              style={getCategoryStyle(type)}
            >
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

      <div className="opportunity-card__divider" />

      <div className="opportunity-card__footer">
        <div className="opportunity-card__footer-top">
          <div className="opportunity-card__dates">
            <div className="opportunity-card__date-row">
              {t('card_deadline')} {formattedDeadline}{' '}
              {daysLeft !== null && (
                <span className={`opportunity-card__days-left${isUrgent ? ' opportunity-card__days-left--urgent' : ''}`}>
                  {isUrgent && <WarningIcon />} {daysLeft} {t('card_days_left')}
                </span>
              )}
            </div>
            <div className="opportunity-card__date-row opportunity-card__date-row--muted">
              {t('card_published')} {formattedPublished}
            </div>
          </div>

          <StatusSelector opportunity={opportunity} t={t} />
        </div>

        <div className="opportunity-card__footer-actions">
          <button
            type="button"
            className="opportunity-card__detail-btn"
            onClick={(e) => { e.stopPropagation(); setShowDetail(true) }}
          >
            {t('card_view_details') || 'Ətraflı bax'}
          </button>

          {applyLink ? (
            <a
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="opportunity-card__apply-btn"
              onClick={handleApplyClick}
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

      <OpportunityDetailModal
        opportunity={opportunity}
        open={showDetail}
        onClose={() => setShowDetail(false)}
        onRequireAuth={() => { setShowDetail(false); setShowAuthPrompt(true) }}
      />

      <AuthPromptModal open={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />

      <ApplyConfirmModal
        open={showApplyConfirm}
        onCancel={() => setShowApplyConfirm(false)}
        onConfirm={confirmApply}
      />
    </div>
  )
}