
import { useEffect, useRef, useState } from 'react'
import {
  Heart,
  Bookmark,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react'

import { useLanguage } from '../../hooks/useLanguage'
import { useAuth } from '../../hooks/useAuth'

import { useMundusUserStatus } from '../../hooks/useMundusUserStatus'
import { mundusService } from '../../services/mundusService'

import MundusDetailModal from './MundusDetailModal'
import AuthPromptModal from '../AuthPromptModal'

import { COUNTRY_CODES } from '../../data/countryCodes'

import {
  getDaysLeft,
  URGENT_THRESHOLD_DAYS,
} from '../../utils/dateHelpers'

function parseDate(value) {
  if (!value) return null

  const match = String(value).match(
    /^(\d{4})-(\d{2})-(\d{2})$/
  )

  if (!match) return null

  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3])
  )

  if (
    date.getFullYear() !== Number(match[1]) ||
    date.getMonth() !== Number(match[2]) - 1 ||
    date.getDate() !== Number(match[3])
  ) {
    return null
  }

  return date
}

function getToday() {
  const now = new Date()

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )
}

function formatDate(value, locale) {
  const date = parseDate(value)

  if (!date) return value || null

  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function getProgramStatus(program) {
  const today = getToday()
  const deadline = parseDate(program.deadline)
  const opening = parseDate(program.applicationOpens)

  if (deadline && today > deadline) {
    return 'closed'
  }

  if (opening && today < opening) {
    return 'upcoming'
  }

  if (
    (opening && today >= opening) ||
    (deadline && today <= deadline)
  ) {
    return 'open'
  }

  return 'unknown'
}

function safeUrl(value) {
  if (typeof value !== 'string') return null

  try {
    const url = new URL(value)

    return ['https:', 'http:'].includes(url.protocol)
      ? url.href
      : null
  } catch {
    return null
  }
}

function CountryFlags({ countries = [] }) {
  const list = Array.isArray(countries)
    ? countries
    : []

  return (
    <div className="mundus-card__flags">
      {list.slice(0, 4).map((country, index) => {
        const code = COUNTRY_CODES[country]

        if (!code) {
          return (
            <span
              key={`${country}-${index}`}
              className="mundus-card__flag-fallback"
              title={country}
            >
              {String(country)
                .slice(0, 2)
                .toUpperCase()}
            </span>
          )
        }

        return (
          <span
            key={`${country}-${index}`}
            className="mundus-card__flag-wrap"
            title={country}
          >
            <img
              className="mundus-card__flag"
              src={`https://flagcdn.com/w80/${code}.png`}
              alt={country}
              loading="lazy"
            />
          </span>
        )
      })}

      {list.length > 4 && (
        <span className="mundus-card__more-countries">
          +{list.length - 4}
        </span>
      )}
    </div>
  )
}

function getCategory(program) {
  const category =
    program?.category ??
    program?.fieldOfStudy

  if (
    typeof category !== 'string' ||
    !category.trim()
  ) {
    return null
  }

  const normalized = category.trim()

  // Do not display the technical category identifier.
  if (
    normalized.toUpperCase() === 'ERASMUS_MUNDUS'
  ) {
    return null
  }

  return normalized
}

export default function MundusProgramCard({ program }) {
  const { t, lang } = useLanguage()
  const { user } = useAuth()

  const [showAuthPrompt, setShowAuthPrompt] =
    useState(false)

  const [showDetail, setShowDetail] =
    useState(false)

  const [detailData, setDetailData] =
    useState(null)

  const [detailLoading, setDetailLoading] =
    useState(false)

  const detailRequestRef = useRef(false)
  const detailSessionRef = useRef(0)
  const detailMountedRef = useRef(true)

  const id = program?.id

  const {
    liked,
    saved,
    loading: statusLoading,
    actionLoading,
    toggleLike: toggleLikeRemote,
    toggleSave: toggleSaveRemote,
  } = useMundusUserStatus(id, user)

  useEffect(() => {
    detailMountedRef.current = true

    return () => {
      detailMountedRef.current = false
      detailSessionRef.current += 1
    }
  }, [])

  if (!program) return null

  const title =
    program.programName ||
    program.title

  const locale =
    lang === 'en'
      ? 'en-GB'
      : lang === 'ru'
        ? 'ru-RU'
        : 'az-AZ'

  const dateNotSpecified =
    t('date_not_specified') ||
    'Müəyyən olunmayıb'

  const formattedDeadline =
    formatDate(program.deadline, locale) ||
    dateNotSpecified

  const formattedOpening =
    formatDate(program.applicationOpens, locale) ||
    dateNotSpecified

  const daysLeft = parseDate(program.deadline)
    ? getDaysLeft(program.deadline)
    : null

  const isUrgent =
    daysLeft !== null &&
    daysLeft >= 0 &&
    daysLeft <= URGENT_THRESHOLD_DAYS

  const status = getProgramStatus(program)

  const statusKey = {
    open: 'mundus_status_open',
    upcoming: 'mundus_status_upcoming',
    closed: 'mundus_status_closed',
    unknown: 'mundus_status_unknown',
  }[status]

  const category = getCategory(program)

  const applyLink = safeUrl(
    detailData?.applyLink || program.applyLink
  )

  function toggleLike(e) {
    e?.stopPropagation()

    if (!user) {
      setShowAuthPrompt(true)
      return
    }

    toggleLikeRemote()
  }

  function toggleSave(e) {
    e?.stopPropagation()

    if (!user) {
      setShowAuthPrompt(true)
      return
    }

    toggleSaveRemote()
  }

  async function openDetail(e) {
    e?.stopPropagation()

    if (!id || detailRequestRef.current) return

    detailRequestRef.current = true

    const session = ++detailSessionRef.current

    setShowDetail(true)
    setDetailLoading(true)
    setDetailData(null)

    try {
      const { data } =
        await mundusService.getById(id)

      if (
        !detailMountedRef.current ||
        session !== detailSessionRef.current
      ) {
        return
      }

      setDetailData(data)
    } catch (error) {
      console.error(
        'Mundus detail fetch failed:',
        error
      )
    } finally {
      if (
        detailMountedRef.current &&
        session === detailSessionRef.current
      ) {
        setDetailLoading(false)
        detailRequestRef.current = false
      }
    }

    if (
      detailMountedRef.current &&
      session === detailSessionRef.current
    ) {
      mundusService.trackView(id).catch(error => {
        console.error(
          'Mundus view tracking failed:',
          error
        )
      })
    }
  }

  function closeDetail() {
    detailSessionRef.current += 1
    detailRequestRef.current = false

    setShowDetail(false)
    setDetailData(null)
    setDetailLoading(false)
  }

  async function handleApplyClick(e) {
    e?.stopPropagation()

    if (!id) return

    try {
      await mundusService.trackApply(id)
    } catch (error) {
      console.error(
        'Mundus apply tracking failed:',
        error
      )
    }
  }

  const modalOpportunity = {
    ...program,
    ...(detailData || {}),

    title:
      detailData?.programName ||
      detailData?.title ||
      title,

    type: 'MUNDUS',
    category:
      detailData?.category ||
      program.category,

    requiredDocuments:
      detailData?.requiredDocuments ??
      detailData?.documents ??
      program.requiredDocuments ??
      program.documents ??
      [],
  }

  return (
    <div className="mundus-card">
      <div className="mundus-card__top">
        <div className="mundus-card__top-row">
          <CountryFlags
            countries={program.countries}
          />

          <div className="mundus-card__icons">
            <button
              type="button"
              className={`mundus-card__icon-btn mundus-card__icon-btn--heart${
                liked ? ' is-active' : ''
              }`}
              onClick={toggleLike}
              disabled={statusLoading || actionLoading}
              aria-label={t('mundus_like')}
              aria-pressed={liked}
            >
              <Heart
                size={21}
                fill={liked ? 'currentColor' : 'none'}
              />
            </button>

            <button
              type="button"
              className={`mundus-card__icon-btn mundus-card__icon-btn--bookmark${
                saved ? ' is-active' : ''
              }`}
              onClick={toggleSave}
              disabled={statusLoading || actionLoading}
              aria-label={t('mundus_save')}
              aria-pressed={saved}
            >
              <Bookmark
                size={21}
                fill={saved ? 'currentColor' : 'none'}
              />
            </button>
          </div>
        </div>

        <h3
          className="mundus-card__title"
          data-tooltip={title}
        >
          {title}
        </h3>
      </div>

      {/* PROGRAM TAGS */}

      <div className="mundus-card__topic">
        <div className="mundus-card__tags">
          <span className="mundus-card__tag mundus-card__tag--format">
            {t('mundus_format')}
          </span>

          <span className="mundus-card__tag mundus-card__tag--degree">
            {t('mundus_degree')}
          </span>

          {category && (
            <span
              className="mundus-card__tag mundus-card__tag--category"
              title={category}
            >
              {category}
            </span>
          )}
        </div>
      </div>

      <div className="mundus-card__divider" />

      <div className="mundus-card__footer">
        <div className="mundus-card__footer-top">
          <div className="mundus-card__dates">
            <div className="mundus-card__date-row">
              {t('card_deadline')}{' '}
              {formattedDeadline}{' '}

              {daysLeft !== null &&
                daysLeft >= 0 && (
                  <span
                    className={`mundus-card__days-left${
                      isUrgent
                        ? ' mundus-card__days-left--urgent'
                        : ''
                    }`}
                  >
                    {isUrgent && (
                      <AlertTriangle size={13} />
                    )}

                    {daysLeft}{' '}
                    {t('card_days_left')}
                  </span>
                )}
            </div>

            <div className="mundus-card__date-row mundus-card__date-row--muted">
              {t('mundus_application_opening')}{' '}
              {formattedOpening}
            </div>
          </div>

          <div className="mundus-card__status-wrap">
            <span
              className={`mundus-card__program-status mundus-card__program-status--${status}`}
            >
              <span className="mundus-card__program-status-dot" />
              {t(statusKey)}
            </span>
          </div>
        </div>

        <div className="mundus-card__footer-actions">
          <button
            type="button"
            className="mundus-card__detail-btn"
            onClick={openDetail}
          >
            {t('card_view_details') || 'Ətraflı bax'}
          </button>

          {applyLink ? (
            <a
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mundus-card__apply-btn"
              onClick={handleApplyClick}
            >
              {t('card_apply')}
              <ArrowRight size={18} />
            </a>
          ) : (
            <span className="mundus-card__apply-btn mundus-card__apply-btn--disabled">
              {t('card_apply')}
              <ArrowRight size={18} />
            </span>
          )}
        </div>
      </div>

      <MundusDetailModal
        opportunity={modalOpportunity}
        loading={detailLoading}
        open={showDetail}
        onClose={closeDetail}
        liked={liked}
        saved={saved}
        onToggleLike={toggleLike}
        onToggleSave={toggleSave}
        onApplyClick={handleApplyClick}
      />

      <AuthPromptModal
        open={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
      />
    </div>
  )
}
