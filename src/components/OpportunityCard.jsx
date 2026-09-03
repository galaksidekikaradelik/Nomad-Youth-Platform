import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { useAuth } from '../hooks/useAuth'
import { translateCategory } from '../data/categoryTranslation'
import { getCategoryStyle } from '../utils/categoryStyle'
import { useWishlist } from '../hooks/useWishlist'
import { useLike } from '../hooks/useLike'
import apiClient from '../services/apiClient'
import {
  trackOpportunityClick,
  trackOpportunitySave,
  trackOpportunityUnsave,
  trackOpportunityApply,
} from '../services/analytics'
import StatusSelector from './StatusSelector'
import AuthPromptModal from './AuthPromptModal'
import OpportunityDetailModal from './OpportunityDetailModal'
import ApplyConfirmModal from './ApplyConfirmModal'
import {
  HeartIcon,
  BookmarkIcon,
  ArrowIcon,
  WarningIcon,
  FlagIcon
} from './OpportunityCardIcons'
import {
  TYPE_LABEL_KEYS,
  ESC_SALTO_LABEL_KEYS,
  VOLUNTEERING_TYPE_LABEL_KEYS
} from '../data/opportunityCardLabels'
import {
  getDaysLeft,
  URGENT_THRESHOLD_DAYS
} from '../utils/dateHelpers'

export default function OpportunityCard({ opportunity, autoOpenDetail = false }) {

  const { t, lang } = useLanguage()
  const { user } = useAuth()

  const {
    title,
    typeDetail,
    category,
    type,
    country: location,
    deadline,
    applyLink,
    eventDateRange,
    escOrSalto,
    volunteeringType,
  } = opportunity

  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [showDetail, setShowDetail] = useState(autoOpenDetail)
  const [showApplyConfirm, setShowApplyConfirm] = useState(false)
  const [detailData, setDetailData] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const cardRef = useRef(null)

  useEffect(() => {
    if (!autoOpenDetail) return

    const timer = setTimeout(() => {
      cardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // =========================
  // LIKE
  // =========================

  const {
    likedIds,
    toggleLike: toggleLikeRemote
  } = useLike()

  const liked = opportunity.id
    ? likedIds.has(opportunity.id)
    : false

  function toggleLike(e) {
    e.stopPropagation()

    if (!user) {
      setShowAuthPrompt(true)
      return
    }

    if (!opportunity.id) return

    toggleLikeRemote(opportunity)
  }

  // =========================
  // SAVE / WISHLIST
  // =========================

  const {
    savedIds,
    toggleSave: toggleWishlist
  } = useWishlist()

  const saved = opportunity.id
    ? savedIds.has(opportunity.id)
    : false

  function toggleSave(e) {
    e.stopPropagation()

    if (!user) {
      setShowAuthPrompt(true)
      return
    }

    if (!opportunity.id) return

    if (saved) {
      trackOpportunityUnsave(opportunity)
    } else {
      trackOpportunitySave(opportunity)
    }

    toggleWishlist(opportunity)
  }

  // =========================
  // APPLY
  // =========================

  function handleApplyClick(e) {
    e.stopPropagation()
    e.preventDefault()

    if (!applyLink) return

    setShowApplyConfirm(true)
  }

  function confirmApply() {
    trackOpportunityApply(opportunity)

    setShowApplyConfirm(false)

    window.open(
      applyLink,
      '_blank',
      'noopener,noreferrer'
    )
  }

  // =========================
  // OPEN DETAIL
  // =========================

  async function openDetail(e) {
    e.stopPropagation()

    trackOpportunityClick(opportunity)

    setShowDetail(true)

    if (!opportunity.id) return

    setDetailLoading(true)

    try {
      const res = await apiClient.get(
        `/opportunities/${opportunity.id}/details`,
        {
          params: {
            userId: user?.id,
            lang
          },
        }
      )

      setDetailData(res.data)

    } catch (err) {
      console.error(
        'Opportunity detail fetch failed:',
        err
      )

    } finally {
      setDetailLoading(false)
    }
  }

  // =========================
  // CLOSE DETAIL
  // =========================

  function closeDetail() {
    setShowDetail(false)
    setDetailData(null)
  }

  // =========================
  // MERGE DETAIL DATA
  // =========================

  const mergedDetailOpportunity = detailData
    ? {
        ...opportunity,

        deadline:
          detailData.deadline ??
          opportunity.deadline,

        applyLink:
          detailData.applyLink ??
          opportunity.applyLink,

        description:
          detailData.description ??
          opportunity.description,

        descriptionTranslations: {
          ...opportunity.descriptionTranslations,

          [lang]:
            detailData.description ??
            opportunity.descriptionTranslations?.[lang],
        },

        duration:
          detailData.duration ?? null,

        language:
          detailData.language ?? null,

        eventDateRange:
          detailData.eventDateRange ?? null,

        financialSupport:
          detailData.financialSupport ?? null,
      }
    : opportunity

  // =========================
  // DATE
  // =========================

  const locale =
    lang === 'en'
      ? 'en-GB'
      : lang === 'ru'
        ? 'ru-RU'
        : 'az-AZ'

  const dateNotSpecified =
    t('date_not_specified') ||
    'Müəyyən olunmayıb'

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString(
        locale,
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }
      )
    : dateNotSpecified

  const daysLeft = getDaysLeft(deadline)

  const isUrgent =
    daysLeft !== null &&
    daysLeft <= URGENT_THRESHOLD_DAYS

  // =========================
  // FORMAT
  // =========================

  const formatLabel =
    typeDetail === 'Online'
      ? t('type_online')
      : typeDetail === 'Offline'
        ? t('type_offline')
        : typeDetail

  const formatModifier =
    typeDetail === 'Online'
      ? 'online'
      : typeDetail === 'Offline'
        ? 'offline'
        : null

  // =========================
  // TYPE
  // =========================

  const typeLabelKey =
    type
      ? TYPE_LABEL_KEYS[type]
      : null

  const typeLabel =
    typeLabelKey
      ? t(typeLabelKey)
      : type

  // =========================
  // CATEGORY
  // =========================

  const categories =
    Array.isArray(category)
      ? category
      : category
        ? [category]
        : []

  // =========================
  // ESC / SALTO
  // =========================

  const escSaltoLabelKey =
    escOrSalto
      ? ESC_SALTO_LABEL_KEYS[escOrSalto]
      : null

  const escSaltoLabel =
    escSaltoLabelKey
      ? t(escSaltoLabelKey)
      : escOrSalto

  const escSaltoModifier =
    escOrSalto === 'ESC'
      ? 'esc'
      : escOrSalto === 'SALTO'
        ? 'salto'
        : null

  // =========================
  // VOLUNTEERING TYPE
  // =========================

  const normalizedVolunteeringType =
    volunteeringType?.replace('İ', 'I')

  const volunteeringLabelKey =
    normalizedVolunteeringType
      ? VOLUNTEERING_TYPE_LABEL_KEYS[
          normalizedVolunteeringType
        ]
      : null

  const volunteeringLabel =
    volunteeringLabelKey
      ? t(volunteeringLabelKey)
      : normalizedVolunteeringType

  const volunteeringModifier =
    normalizedVolunteeringType === 'Individual'
      ? 'individual'
      : normalizedVolunteeringType === 'Team'
        ? 'team'
        : null

  // =========================
  // RENDER
  // =========================

  return (
    <div
      className="opportunity-card"
      ref={cardRef}
    >

      {/* TOP */}

      <div className="opportunity-card__top">

        <div className="opportunity-card__top-row">

          <span className="opportunity-card__tag opportunity-card__tag--flag opportunity-card__tag--flag-top">
            <FlagIcon location={location} />
          </span>

          <div className="opportunity-card__icons">

            {/* LIKE */}

            <button
              className={`opportunity-card__icon-btn opportunity-card__icon-btn--heart${
                liked ? ' is-active' : ''
              }`}
              onClick={toggleLike}
              aria-label="Bəyən"
            >
              <HeartIcon active={liked} />
            </button>

            {/* SAVE */}

            <button
              className={`opportunity-card__icon-btn opportunity-card__icon-btn--bookmark${
                saved ? ' is-active' : ''
              }`}
              onClick={toggleSave}
              aria-label="Yadda saxla"
            >
              <BookmarkIcon active={saved} />
            </button>

          </div>
        </div>

        <h3
          className="opportunity-card__title"
          data-tooltip={title}
        >
          {title}
        </h3>

      </div>

      {/* TOPICS / TAGS */}

      <div className="opportunity-card__topic">

        <div className="opportunity-card__tags">

          {formatLabel && (
            <span
              className={`opportunity-card__tag opportunity-card__tag--type${
                formatModifier
                  ? ` opportunity-card__tag--${formatModifier}`
                  : ''
              }`}
            >
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

          {escSaltoModifier && (
            <span
              className={`opportunity-card__tag opportunity-card__tag--${escSaltoModifier}`}
            >
              {escSaltoLabel}
            </span>
          )}

          {volunteeringModifier && (
            <span
              className={`opportunity-card__tag opportunity-card__tag--${volunteeringModifier}`}
            >
              {volunteeringLabel}
            </span>
          )}

        </div>

      </div>

      <div className="opportunity-card__divider" />

      {/* FOOTER */}

      <div className="opportunity-card__footer">

        <div className="opportunity-card__footer-top">

          <div className="opportunity-card__dates">

            <div className="opportunity-card__date-row">

              {t('card_deadline')} {formattedDeadline}{' '}

              {daysLeft !== null && (
                <span
                  className={`opportunity-card__days-left${
                    isUrgent
                      ? ' opportunity-card__days-left--urgent'
                      : ''
                  }`}
                >
                  {isUrgent && <WarningIcon />}

                  {daysLeft}{' '}

                  {t('card_days_left')}
                </span>
              )}

            </div>

            <div className="opportunity-card__date-row opportunity-card__date-row--muted">

              {t('card_event_date')}{' '}

              {eventDateRange || dateNotSpecified}

            </div>

          </div>

          <StatusSelector
            opportunity={opportunity}
            t={t}
          />

        </div>

        {/* ACTIONS */}

        <div className="opportunity-card__footer-actions">

          <button
            type="button"
            className="opportunity-card__detail-btn"
            onClick={openDetail}
          >
            {t('card_view_details') ||
              'Ətraflı bax'}
          </button>

          {applyLink ? (

            <a
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="opportunity-card__apply-btn"
              onClick={handleApplyClick}
            >
              {t('card_apply')}

              <ArrowIcon />

            </a>

          ) : (

            <span className="opportunity-card__apply-btn opportunity-card__apply-btn--disabled">

              {t('card_apply')}

              <ArrowIcon />

            </span>

          )}

        </div>

      </div>

      {/* DETAIL MODAL */}

      <OpportunityDetailModal
        opportunity={mergedDetailOpportunity}
        loading={detailLoading}
        open={showDetail}
        onClose={closeDetail}

        onRequireAuth={() => {
          closeDetail()
          setShowAuthPrompt(true)
        }}

        onToggleLike={toggleLike}
        onToggleSave={toggleSave}

        liked={liked}
        saved={saved}
      />

      {/* AUTH MODAL */}

      <AuthPromptModal
        open={showAuthPrompt}
        onClose={() =>
          setShowAuthPrompt(false)
        }
      />

      {/* APPLY CONFIRM MODAL */}

      <ApplyConfirmModal
        open={showApplyConfirm}
        onCancel={() =>
          setShowApplyConfirm(false)
        }
        onConfirm={confirmApply}
      />

    </div>
  )
}