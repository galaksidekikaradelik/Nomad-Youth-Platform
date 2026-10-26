import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../hooks/useLanguage'

import {
  INTERNATIONAL_PARTNERS,
  LOCAL_PARTNERS,
  PARTNER_APPLY_URL,
} from '../data/partners'

import { COUNTRY_CODES } from '../data/countryCodes'

import '../style/pages/partnerships.css'

import heroImg from '../assets/teskilatlar/partners-hero.webp'


function getCountryCode(place) {
  const country = (place || '').split(',').pop().trim()
  return COUNTRY_CODES[country]
}

function PartnerCard({ partner, tone, index }) {
  const { t } = useLanguage()

  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  const countryCode = useMemo(
    () => getCountryCode(partner.place),
    [partner.place]
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (
      typeof IntersectionObserver === 'undefined'
    ) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px 80px 0px',
      }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className={`partner-card${
        visible ? ' partner-card--visible' : ''
      }`}
      style={{ '--i': index % 4 }}
    >
      <div
        className={`partner-card__logo partner-card__logo--${tone}`}
      >
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            width={320}
            height={320}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        ) : (
          <span>{partner.name.charAt(0)}</span>
        )}
      </div>

      <div className="partner-card__body">
        <span className="partner-card__place">
          {countryCode && (
            <span
              className={`fi fi-${countryCode} partner-card__flag`}
              aria-hidden="true"
            />
          )}
          {partner.place}
        </span>

        <h3 className="partner-card__name">
          {partner.name}
        </h3>

        {partner.descKey && (
          <p className="partner-card__text">
            {t(partner.descKey)}
          </p>
        )}
      </div>

      {partner.url && (
        <a
          className="partner-card__link"
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('partners_visit')} →
        </a>
      )}
    </article>
  )
}

function PartnerSection({
  id,
  variant,
  titleKey,
  textKey,
  partners,
}) {
  const { t } = useLanguage()

  const tone =
    variant === 'intl' ? 'blue' : 'green'

  return (
    <section
      id={id}
      className={`partners-section partners-section--${variant}`}
    >
      <div className="partners-container partners-section__inner">
        <header className="partners-section__head">
          <div className="partners-section__titles">
            <span
              className="partners-section__bar"
              aria-hidden="true"
            />

            <h2>{t(titleKey)}</h2>

            <p>{t(textKey)}</p>
          </div>

          <span className="partners-section__count">
            {partners.length} {t('partners_org_count')}
          </span>
        </header>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              tone={tone}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Partnerships() {
  const { t } = useLanguage()

  return (
    <main className="partners-page">

      <section className="partners-container partners-hero">
        <div className="partners-hero__text">
          <h1>{t('partners_title')}</h1>

          <p>{t('partners_lead')}</p>

          <div className="partners-hero__actions">
            <a
              className="partners-btn partners-btn--accent"
              href="#apply"
            >
              {t('partners_cta_apply')}
            </a>

            <a
              className="partners-btn partners-btn--outline"
              href="#international"
            >
              {t('partners_cta_intl')}
            </a>

            <a
              className="partners-btn partners-btn--outline"
              href="#local"
            >
              {t('partners_cta_local')}
            </a>
          </div>
        </div>

        <div className="partners-hero__visual">
          <img
            src={heroImg}
            alt=""
            width={1672}
            height={941}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <PartnerSection
        id="international"
        variant="intl"
        titleKey="partners_intl_title"
        textKey="partners_intl_text"
        partners={INTERNATIONAL_PARTNERS}
      />

      <PartnerSection
        id="local"
        variant="local"
        titleKey="partners_local_title"
        textKey="partners_local_text"
        partners={LOCAL_PARTNERS}
      />

      <section
        id="apply"
        className="partners-container partners-cta-wrap"
      >
        <div className="partners-cta">
          <div className="partners-cta__text">
            <h2>{t('partners_cta_title')}</h2>

            <p>{t('partners_cta_text')}</p>
          </div>

          <Link
            className="partners-btn partners-btn--accent"
            to={PARTNER_APPLY_URL}
          >
            {t('partners_cta_button')}
          </Link>
        </div>
      </section>
    </main>
  )
}
