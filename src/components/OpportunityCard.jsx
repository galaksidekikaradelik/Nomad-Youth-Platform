import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '..//hooks/useLanguage'
import { useAuth } from '../hooks/useAuth'
import { translateCategory } from '../data/categoryTranslation'
import { getCategoryStyle } from '../utils/categoryStyle'
import { STATUS_CONFIG, getStatusStorageKey, readStoredStatuses } from '../utils/applicationStatus'
import AuthPromptModal from './AuthPromptModal'
import OpportunityDetailModal from './OpportunityDetailModal'

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

// "Növ" sahəsi (Seminar/Kurs/Konfrans/Vebinar/Fəaliyyət) üçün tərcümə açarları.
// Opportunities.jsx-dəki TYPES sabitiylə eyni açarlardan istifadə edir.
const TYPE_LABEL_KEYS = {
  'Seminar':   'type_seminar',
  'Kurs':      'type_course',
  'Konfrans':  'type_conference',
  'Vebinar':   'type_webinar',
  'Fəaliyyət': 'type_activity',
}

// Like/Save da status kimi user-ə görə localStorage-da saxlanır (backend hazır olana qədər).
function getLikeStorageKey(user) {
  const uid = user?.id ?? user?.email ?? user?.username ?? 'anon'
  return `nomad_opportunity_likes_${uid}`
}

function getSaveStorageKey(user) {
  const uid = user?.id ?? user?.email ?? user?.username ?? 'anon'
  return `nomad_opportunity_saves_${uid}`
}

function readStoredSet(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '{}')
  } catch {
    return {}
  }
}

function StatusSelector({ opportunity, t }) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  // opportunity.id yoxdursa title-a fallback edir (unikal olmasa da işə yarayır)
  const oppKey = opportunity.id || opportunity.title

  // Effect əvəzinə lazy init + render zamanı sinxronlaşdırma (React-in rəsmi
  // tövsiyəsi: "adjusting state when a prop changes"). Bu, useEffect daxilində
  // mount zamanı setState çağırışının yaratdığı əlavə render dövrəsini aradan qaldırır.
  const [trackedUser, setTrackedUser] = useState(user)
  const [status, setStatus] = useState(() =>
    user ? (readStoredStatuses(user)[oppKey] || null) : null
  )

  if (user !== trackedUser) {
    setTrackedUser(user)
    setStatus(user ? (readStoredStatuses(user)[oppKey] || null) : null)
  }

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  if (!user) return null

  function selectStatus(newStatus) {
    const key = getStatusStorageKey(user)
    const stored = readStoredStatuses(user)
    stored[oppKey] = newStatus
    localStorage.setItem(key, JSON.stringify(stored))
    setStatus(newStatus)
    setOpen(false)
  }

  const config = status ? STATUS_CONFIG[status] : null

  return (
    <div
      className="opportunity-card__status-selector"
      ref={wrapperRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={`opportunity-card__status-badge${config ? ` opportunity-card__status-badge--${config.modifier}` : ' opportunity-card__status-badge--empty'}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className="opportunity-card__status-dot" />
        {config ? t(config.labelKey) : (t('status_select') || 'Status seç')}
      </button>

      {open && (
        <div className="opportunity-card__status-dropdown">
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              type="button"
              className={`opportunity-card__status-option opportunity-card__status-option--${cfg.modifier}`}
              onClick={() => selectStatus(key)}
            >
              <span className="opportunity-card__status-dot" />
              {t(cfg.labelKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function OpportunityCard({ opportunity }) {
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const { title, format, category, type, location, deadline, applyLink, publishedAt } = opportunity
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  // opportunity.id yoxdursa title-a fallback edir (status selector-dakı ilə eyni məntiq)
  const oppKey = opportunity.id || opportunity.title

  const [liked, setLiked] = useState(() =>
    user ? !!readStoredSet(getLikeStorageKey(user))[oppKey] : false
  )
  const [saved, setSaved] = useState(() =>
    user ? !!readStoredSet(getSaveStorageKey(user))[oppKey] : false
  )

  // Effect əvəzinə lazy init + render zamanı sinxronlaşdırma — user login/logout
  // olanda (məs. kart mount olaraq qalıb, amma auth vəziyyəti dəyişib) yenidən oxuyur.
  const [trackedAuthUser, setTrackedAuthUser] = useState(user)
  if (user !== trackedAuthUser) {
    setTrackedAuthUser(user)
    setLiked(user ? !!readStoredSet(getLikeStorageKey(user))[oppKey] : false)
    setSaved(user ? !!readStoredSet(getSaveStorageKey(user))[oppKey] : false)
  }

  function toggleLike(e) {
    e.stopPropagation()
    if (!user) { setShowAuthPrompt(true); return }
    const key = getLikeStorageKey(user)
    const likes = readStoredSet(key)
    const next = !liked
    if (next) likes[oppKey] = true
    else delete likes[oppKey]
    localStorage.setItem(key, JSON.stringify(likes))
    setLiked(next)
  }

  function toggleSave(e) {
    e.stopPropagation()
    if (!user) { setShowAuthPrompt(true); return }
    const key = getSaveStorageKey(user)
    const saves = readStoredSet(key)
    const next = !saved
    if (next) saves[oppKey] = true
    else delete saves[oppKey]
    localStorage.setItem(key, JSON.stringify(saves))
    setSaved(next)
  }

  const locale = lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'az-AZ'

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null

  const daysLeft = getDaysLeft(deadline)
  const isUrgent = daysLeft !== null && daysLeft <= URGENT_THRESHOLD_DAYS
  const formattedPublished = publishedAt
    ? new Date(publishedAt).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null

  const formatLabel = format === 'Online' ? t('type_online') : format === 'Offline' ? t('type_offline') : format
  const formatModifier = format === 'Online' ? 'online' : format === 'Offline' ? 'offline' : null

  const typeLabelKey = type ? TYPE_LABEL_KEYS[type] : null
  const typeLabel = typeLabelKey ? t(typeLabelKey) : type

  const categories = Array.isArray(category) ? category : (category ? [category] : [])

  return (
    <div className="opportunity-card">
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
            {formattedDeadline && (
              <div className="opportunity-card__date-row">
                {t('card_deadline')} {formattedDeadline}{' '}
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
      </div>

      <OpportunityDetailModal
        opportunity={opportunity}
        open={showDetail}
        onClose={() => setShowDetail(false)}
        onRequireAuth={() => { setShowDetail(false); setShowAuthPrompt(true) }}
      />

      <AuthPromptModal open={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />
    </div>
  )
}