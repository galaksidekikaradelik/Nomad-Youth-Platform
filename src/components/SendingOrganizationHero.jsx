
import {
  ArrowRight,
  BookOpen,
  Handshake,
  FileCheck2,
} from 'lucide-react'

import { useLanguage } from '../hooks/useLanguage'
import { buildWhatsAppLink } from '../config/whatsapp'

import sendingOrganizationImage from '../assets/images/sending-organization.png'

import '../style/index.css'

const STEPS = [
  {
    icon: BookOpen,
    titleKey: 'so_hero_card1_title',
    descriptionKey: 'so_hero_card1_desc',
  },
  {
    icon: Handshake,
    titleKey: 'so_hero_card2_title',
    descriptionKey: 'so_hero_card2_desc',
  },
  {
    icon: FileCheck2,
    titleKey: 'so_hero_card3_title',
    descriptionKey: 'so_hero_card3_desc',
    buttonKey: 'so_hero_apply',
  },
]

export default function SendingOrganizationHero() {
  const { t } = useLanguage()

  // ServiceModal ilə eyni WhatsApp sistemi
  const handleWhatsApp = () => {
    const message = t('service_modal_whatsapp_message').replace(
      '{service}',
      t('so_hero_title')
    )

    window.open(
      buildWhatsAppLink(message),
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <section
      className="so-hero"
      aria-labelledby="so-hero-title"
    >
      {/* BACKGROUND */}

      <div
        className="so-hero__wash"
        aria-hidden="true"
      />

      <div className="so-hero__inner">

        {/* TOP SECTION */}

        <div className="so-hero__top">

          {/* LEFT CONTENT */}

          <div className="so-hero__intro">
            <span
              className="so-hero__accent-line"
              aria-hidden="true"
            />

            <h2
              id="so-hero-title"
              className="so-hero__title"
            >
              {t('so_hero_title')}
            </h2>

            <p className="so-hero__description">
              {t('so_hero_intro')}
            </p>
          </div>

          {/* RIGHT IMAGE */}

          <div className="so-hero__image-wrapper">
            <img
              src={sendingOrganizationImage}
              alt={t('so_hero_visual_label')}
              className="so-hero__image"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* INFORMATION CARDS */}

        <div className="so-hero__cards">
          {STEPS.map((step, index) => {
            const Icon = step.icon

            return (
              <article
                className="so-hero__card"
                key={step.titleKey}
              >
                {/* CARD HEADER */}

                <div className="so-hero__card-head">
                  <span className="so-hero__card-icon">
                    <Icon
                      size={29}
                      strokeWidth={1.9}
                    />
                  </span>

                  <h3>
                    {index + 1}. {t(step.titleKey)}
                  </h3>
                </div>

                {/* CARD DESCRIPTION */}

                <p>
                  {t(step.descriptionKey)}
                </p>

                {/* WHATSAPP BUTTON — THIRD CARD ONLY */}

                {index === 2 && (
                  <button
                    type="button"
                    className="so-hero__link so-hero__link--primary"
                    onClick={handleWhatsApp}
                  >
                    {t(step.buttonKey)}

                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                    />
                  </button>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
