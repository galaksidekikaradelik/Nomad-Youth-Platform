
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

import {
  X,
  Heart,
  Bookmark,
  ArrowUpRight,
  Globe2,
  GraduationCap,
  CalendarDays,
  Clock3,
  Languages,
  Building2,
  BookOpen,
  FileText,
  Wallet,
  BadgeCheck,
  CircleDollarSign,
  MapPin,
  Award,
  ClipboardList,
} from 'lucide-react'

import { useLanguage } from '../../hooks/useLanguage'

function hasValue(value) {
  if (value === null || value === undefined) {
    return false
  }

  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  if (Array.isArray(value)) {
    return value.length > 0
  }

  return true
}

function toList(value) {
  if (!hasValue(value)) return []

  if (Array.isArray(value)) {
    return value.filter(hasValue)
  }

  if (typeof value === 'string') {
    return value
      .split(/\n|;/)
      .map(item => item.trim())
      .filter(Boolean)
  }

  return [value]
}

function displayValue(value, fallback = '—') {
  if (!hasValue(value)) return fallback

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  if (Array.isArray(value)) {
    return value
      .map(item => displayValue(item, ''))
      .filter(Boolean)
      .join(', ')
  }

  if (typeof value === 'object') {
    return (
      value.name ||
      value.title ||
      value.universityName ||
      value.fieldName ||
      value.label ||
      fallback
    )
  }

  return String(value)
}

function formatDate(value, locale) {
  if (!value) return null

  const match = String(value).match(
    /^(\d{4})-(\d{2})-(\d{2})$/
  )

  if (!match) return String(value)

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
    return String(value)
  }

  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
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

/* =========================================
   INFO ITEM
========================================= */

function InfoItem({
  icon: Icon,
  label,
  value,
  fallback = '—',
}) {
  if (!hasValue(value)) return null

  return (
    <div className="mundus-modal__info">
      <div className="mundus-modal__info-icon">
        <Icon size={19} />
      </div>

      <div className="mundus-modal__info-content">
        <span className="mundus-modal__info-label">
          {label}
        </span>

        <span className="mundus-modal__info-value">
          {displayValue(value, fallback)}
        </span>
      </div>
    </div>
  )
}

/* =========================================
   SECTION
========================================= */

function ModalSection({ title, children }) {
  return (
    <section className="mundus-modal__section">
      <h3 className="mundus-modal__section-title">
        {title}
      </h3>

      {children}
    </section>
  )
}

/* =========================================
   MAIN MODAL
========================================= */

export default function MundusDetailModal({
  opportunity,
  open,
  onClose,
  loading = false,
  liked = false,
  saved = false,
  onToggleLike,
  onToggleSave,
  onApplyClick,
}) {
  const { t, lang } = useLanguage()

  const titleId = useId()
  const closeRef = useRef(null)
  const modalRef = useRef(null)

  const locale =
    lang === 'en'
      ? 'en-GB'
      : lang === 'ru'
        ? 'ru-RU'
        : 'az-AZ'

  const labels = {
    az: {
      program: 'Erasmus Mundus Magistr Proqramı',
      description: 'Proqram haqqında',
      general: 'Ümumi məlumat',
      universities: 'Tərəfdaş universitetlər',
      fields: 'Uyğun bakalavr ixtisasları',
      requirements: 'Qəbul tələbləri',
      scholarship: 'Təqaüd və maliyyələşmə',
      documents: 'Tələb olunan sənədlər',
      website: 'Rəsmi veb-sayt',
      viewWebsite: 'Rəsmi sayta keç',
      apply: 'Müraciət et',
      unavailable: 'Müraciət linki mövcud deyil',
      countries: 'Ölkələr',
      degree: 'Təhsil dərəcəsi',
      duration: 'Müddət',
      language: 'Tədris dili',
      deadline: 'Son müraciət tarixi',
      opening: 'Müraciətlərin başlanması',
      ielts: 'IELTS tələbi',
      ieltsScore: 'IELTS balı',
      toefl: 'TOEFL tələbi',
      scholarshipAvailable: 'Təqaüd',
      scholarshipAmount: 'Təqaüd məbləği',
      applicationFee: 'Müraciət haqqı',
      yes: 'Mövcuddur',
      no: 'Mövcud deyil',
      loading: 'Proqram məlumatları yüklənir...',
      close: 'Bağla',
      unknown: 'Müəyyən edilməyib',
    },

    en: {
      program: 'Erasmus Mundus Joint Master',
      description: 'About the programme',
      general: 'General information',
      universities: 'Partner universities',
      fields: 'Eligible bachelor fields',
      requirements: 'Admission requirements',
      scholarship: 'Scholarship and funding',
      documents: 'Required documents',
      website: 'Official website',
      viewWebsite: 'Visit official website',
      apply: 'Apply now',
      unavailable: 'Application link unavailable',
      countries: 'Countries',
      degree: 'Degree',
      duration: 'Duration',
      language: 'Language of instruction',
      deadline: 'Application deadline',
      opening: 'Applications open',
      ielts: 'IELTS requirement',
      ieltsScore: 'IELTS score',
      toefl: 'TOEFL requirement',
      scholarshipAvailable: 'Scholarship',
      scholarshipAmount: 'Scholarship amount',
      applicationFee: 'Application fee',
      yes: 'Available',
      no: 'Not available',
      loading: 'Loading programme details...',
      close: 'Close',
      unknown: 'Not specified',
    },

    ru: {
      program: 'Магистратура Erasmus Mundus',
      description: 'О программе',
      general: 'Общая информация',
      universities: 'Университеты-партнёры',
      fields: 'Подходящие специальности бакалавриата',
      requirements: 'Требования к поступлению',
      scholarship: 'Стипендия и финансирование',
      documents: 'Необходимые документы',
      website: 'Официальный сайт',
      viewWebsite: 'Перейти на официальный сайт',
      apply: 'Подать заявку',
      unavailable: 'Ссылка для подачи заявки недоступна',
      countries: 'Страны',
      degree: 'Степень',
      duration: 'Продолжительность',
      language: 'Язык обучения',
      deadline: 'Срок подачи заявки',
      opening: 'Начало приёма заявок',
      ielts: 'Требование IELTS',
      ieltsScore: 'Балл IELTS',
      toefl: 'Требование TOEFL',
      scholarshipAvailable: 'Стипендия',
      scholarshipAmount: 'Размер стипендии',
      applicationFee: 'Плата за подачу заявки',
      yes: 'Доступна',
      no: 'Недоступна',
      loading: 'Загрузка информации о программе...',
      close: 'Закрыть',
      unknown: 'Не указано',
    },
  }

  const l = labels[lang] || labels.az

  /* =========================================
     KEYBOARD / BODY SCROLL
  ========================================= */

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement

    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose?.()
        return
      }

      if (e.key !== 'Tab') return

      const modal = modalRef.current
      if (!modal) return

      const elements = Array.from(
        modal.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(element => element.getClientRects().length > 0)

      if (!elements.length) {
        e.preventDefault()
        modal.focus()
        return
      }

      const first = elements[0]
      const last = elements[elements.length - 1]

      if (
        e.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === modal)
      ) {
        e.preventDefault()
        last.focus()
      } else if (
        !e.shiftKey &&
        document.activeElement === last
      ) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)

      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused.isConnected
      ) {
        previouslyFocused.focus()
      }
    }
  }, [open, onClose])

  if (!open || !opportunity) return null

  /* =========================================
     PROGRAM DATA
  ========================================= */

  const title =
    opportunity.programName ||
    opportunity.title ||
    'Erasmus Mundus'

  const description =
    opportunity.description ||
    opportunity.summary ||
    opportunity.sumEn ||
    opportunity.sumAz ||
    opportunity.sumRus

  const countries = toList(opportunity.countries)
  const universities = toList(opportunity.universities)
  const bachelorFields = toList(opportunity.bachelorFields)

  const requiredDocuments = toList(
    opportunity.requiredDocuments ??
    opportunity.documents
  )

  const degree = opportunity.degree
  const duration = opportunity.duration
  const language = opportunity.language

  const deadline = formatDate(opportunity.deadline, locale)
  const opening = formatDate(opportunity.applicationOpens, locale)

  const ielts =
    opportunity.ielts ??
    opportunity.ieltsRequirement ??
    opportunity.IELTS

  // IELTS score is a separate field in the backend JSON.
  const ieltsScore =
    opportunity.ieltsScore ??
    opportunity.IELTSScore

  const toefl =
    opportunity.toefl ??
    opportunity.toeflRequirement ??
    opportunity.TOEFL

  const toeflScore =
    opportunity.toeflScore ??
    opportunity.TOEFLScore

  const scholarship = opportunity.scholarship
  const scholarshipAmount = opportunity.scholarshipAmount
  const applicationFee = opportunity.applicationFee

  const applyLink = safeUrl(opportunity.applyLink)

  const scholarshipText =
    typeof scholarship === 'boolean'
      ? scholarship
        ? l.yes
        : l.no
      : scholarship

  const locationText = countries
    .map(country => displayValue(country, ''))
    .filter(Boolean)
    .join(', ')

  /* =========================================
     CONDITIONAL SECTIONS
  ========================================= */

  const hasGeneralInfo = [
    countries.length,
    degree,
    duration,
    language,
    deadline,
    opening,
  ].some(hasValue)

  const hasRequirements = [
    ielts,
    ieltsScore,
    toefl,
    toeflScore,
  ].some(hasValue)

  const hasScholarship = [
    scholarship,
    scholarshipAmount,
    applicationFee,
  ].some(hasValue)

  /* =========================================
     OVERLAY CLICK
  ========================================= */

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose?.()
    }
  }

  /* =========================================
     RENDER
  ========================================= */

  return createPortal(
    <div
      className="mundus-modal-overlay"
      onMouseDown={handleOverlayClick}
    >
      <div
        className="mundus-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-busy={loading}
        tabIndex={-1}
      >
        {/* CLOSE */}

        <button
          type="button"
          ref={closeRef}
          className="mundus-modal__close"
          onClick={onClose}
          aria-label={l.close}
        >
          <X size={21} />
        </button>

        {/* HEADER */}

        <div className="mundus-modal__header">
          <div className="mundus-modal__eyebrow">
            <GraduationCap size={17} />
            {l.program}
          </div>

          <h2
            className="mundus-modal__title"
            id={titleId}
          >
            {title}
          </h2>

          {locationText && (
            <div className="mundus-modal__location">
              <MapPin size={16} />
              {locationText}
            </div>
          )}

          <span className="mundus-modal__field-tag">
            <Award size={15} />
            Erasmus Mundus
          </span>
        </div>

        {/* SCROLLABLE BODY */}

        <div className="mundus-modal__body">
          {loading ? (
            <div
              className="mundus-modal__section"
              role="status"
              aria-live="polite"
            >
              <p className="mundus-modal__description">
                {l.loading}
              </p>
            </div>
          ) : (
            <>
              {/* DESCRIPTION */}

              {hasValue(description) && (
                <ModalSection title={l.description}>
                  <p className="mundus-modal__description">
                    {displayValue(description)}
                  </p>
                </ModalSection>
              )}

              {/* GENERAL INFORMATION */}

              {hasGeneralInfo && (
                <ModalSection title={l.general}>
                  <div className="mundus-modal__grid">
                    <InfoItem
                      icon={Globe2}
                      label={l.countries}
                      value={locationText}
                    />

                    <InfoItem
                      icon={GraduationCap}
                      label={l.degree}
                      value={degree}
                    />

                    <InfoItem
                      icon={Clock3}
                      label={l.duration}
                      value={duration}
                    />

                    <InfoItem
                      icon={Languages}
                      label={l.language}
                      value={language}
                    />

                    <InfoItem
                      icon={CalendarDays}
                      label={l.opening}
                      value={opening}
                    />

                    <InfoItem
                      icon={CalendarDays}
                      label={l.deadline}
                      value={deadline}
                    />
                  </div>
                </ModalSection>
              )}

              {/* UNIVERSITIES */}

              {universities.length > 0 && (
                <ModalSection title={l.universities}>
                  <div className="mundus-modal__grid">
                    {universities.map((university, index) => (
                      <InfoItem
                        key={index}
                        icon={Building2}
                        label={`${index + 1}.`}
                        value={university}
                      />
                    ))}
                  </div>
                </ModalSection>
              )}

              {/* BACHELOR FIELDS */}

              {bachelorFields.length > 0 && (
                <ModalSection title={l.fields}>
                  <div className="mundus-modal__documents">
                    {bachelorFields.map((field, index) => (
                      <div
                        key={index}
                        className="mundus-modal__document"
                      >
                        <BookOpen size={19} />
                        <span>{displayValue(field)}</span>
                      </div>
                    ))}
                  </div>
                </ModalSection>
              )}

              {/* ADMISSION REQUIREMENTS */}

              {hasRequirements && (
                <ModalSection title={l.requirements}>
                  <div className="mundus-modal__grid">
                    <InfoItem
                      icon={Languages}
                      label={l.ielts}
                      value={ielts}
                    />

                    <InfoItem
                      icon={Award}
                      label={l.ieltsScore}
                      value={ieltsScore}
                    />

                    <InfoItem
                      icon={ClipboardList}
                      label={l.toefl}
                      value={toefl}
                    />

                    <InfoItem
                      icon={Award}
                      label="TOEFL score"
                      value={toeflScore}
                    />
                  </div>
                </ModalSection>
              )}

              {/* SCHOLARSHIP */}

              {hasScholarship && (
                <ModalSection title={l.scholarship}>
                  <div className="mundus-modal__grid">
                    <InfoItem
                      icon={BadgeCheck}
                      label={l.scholarshipAvailable}
                      value={scholarshipText}
                    />

                    <InfoItem
                      icon={Wallet}
                      label={l.scholarshipAmount}
                      value={scholarshipAmount}
                    />

                    <InfoItem
                      icon={CircleDollarSign}
                      label={l.applicationFee}
                      value={applicationFee}
                    />
                  </div>
                </ModalSection>
              )}

              {/* REQUIRED DOCUMENTS */}

              {requiredDocuments.length > 0 && (
                <ModalSection title={l.documents}>
                  <div className="mundus-modal__documents">
                    {requiredDocuments.map((document, index) => (
                      <div
                        key={index}
                        className="mundus-modal__document"
                      >
                        <FileText size={19} />
                        <span>{displayValue(document)}</span>
                      </div>
                    ))}
                  </div>
                </ModalSection>
              )}
            </>
          )}
        </div>

        {/* FOOTER */}

        <div className="mundus-modal__footer">
          {/* SOCIAL ACTIONS */}

          <div className="mundus-modal__social">
            <button
              type="button"
              className={`mundus-modal__social-btn${
                liked ? ' is-active' : ''
              }`}
              onClick={onToggleLike}
              aria-label={t('mundus_like')}
              aria-pressed={liked}
            >
              <Heart
                size={22}
                fill={liked ? 'currentColor' : 'none'}
              />
            </button>

            <button
              type="button"
              className={`mundus-modal__social-btn${
                saved ? ' is-active' : ''
              }`}
              onClick={onToggleSave}
              aria-label={t('mundus_save')}
              aria-pressed={saved}
            >
              <Bookmark
                size={22}
                fill={saved ? 'currentColor' : 'none'}
              />
            </button>
          </div>

          {/* APPLY */}

          {applyLink ? (
            <a
              className="mundus-modal__apply"
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onApplyClick}
            >
              {l.apply}
              <ArrowUpRight size={19} />
            </a>
          ) : (
            <span
              className="mundus-modal__apply is-disabled"
              aria-disabled="true"
            >
              {l.unavailable}
            </span>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
