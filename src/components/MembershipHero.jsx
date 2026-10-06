import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/index.css'

import { useLanguage } from '../hooks/useLanguage'
import heroImage from '../assets/hero-1.webp'


const Svg = ({ size = 24, children }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
)


const UsersIcon = () => (
  <Svg>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
)


const BuildingIcon = () => (
  <Svg>
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <path d="M9 21v-6h6v6" />
    <path d="M9 9h.01" />
    <path d="M12 9h.01" />
    <path d="M15 9h.01" />
    <path d="M9 12h.01" />
    <path d="M12 12h.01" />
    <path d="M15 12h.01" />
  </Svg>
)


const PercentIcon = () => (
  <Svg>
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </Svg>
)


const GraduationIcon = () => (
  <Svg size={20}>
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c3 2 9 2 12 0v-5" />
    <path d="M22 10v6" />
  </Svg>
)


const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)


export default function MembershipHero() {
  const { t } = useLanguage()

  /*
  =========================================================
  COUNTDOWN
  =========================================================
  */

  const MEMBERSHIP_DEADLINE =
  new Date('2026-10-31T23:59:59+04:00').getTime()

  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now()
      const distance = MEMBERSHIP_DEADLINE - now

      if (distance <= 0) {
        setTimeLeft(null)
        return
      }

      setTimeLeft({
        days: Math.floor(
          distance / (1000 * 60 * 60 * 24)
        ),

        hours: Math.floor(
          (distance / (1000 * 60 * 60)) % 24
        ),

        minutes: Math.floor(
          (distance / (1000 * 60)) % 60
        ),
      })
    }

    calculateTimeLeft()

    const interval = setInterval(
      calculateTimeLeft,
      1000
    )

    return () => {
      clearInterval(interval)
    }
  }, [])


  return (
    <section className="membership-hero">

      <div className="membership-hero__grid" />


      <div className="membership-hero__inner">


        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}

        <div className="membership-hero__content">

          <h1 className="membership-hero__title">

            {t('membership_hero_title_line1')}

            <br />

            {t('membership_hero_title_prefix')}

            <span>
              {t('membership_hero_title_brand')}
            </span>

            {t('membership_hero_title_suffix')}

            <br />

            {t('membership_hero_title_line3')}

          </h1>


          <p className="membership-hero__description">
            {t('membership_hero_desc')}
          </p>


          {/* ===================================================
              BUTTONS + COUNTDOWN
          ==================================================== */}

          <div className="membership-hero__action-row">


            {/* BUTTONS */}

            <div className="membership-hero__actions">

              <Link
                to="/services?category=membership&open=1"
                className="membership-btn membership-btn--primary"
              >
                {t('membership_hero_btn_join')}

                <ArrowIcon />
              </Link>


              <Link
                to="/about"
                className="membership-btn membership-btn--secondary"
              >
                {t('membership_hero_btn_about')}
              </Link>

            </div>


            {/* COUNTDOWN */}

            {timeLeft && (
              <div className="membership-countdown">

                <div className="membership-countdown__label">
                  {t('membership_countdown_label')}
                </div>


                <div className="membership-countdown__time">


                  {/* DAYS */}

                  <div className="membership-countdown__unit">

                    <strong>
                      {String(timeLeft.days).padStart(
                        2,
                        '0'
                      )}
                    </strong>

                    <span>
                      {t('membership_countdown_days')}
                    </span>

                  </div>


                  <span className="membership-countdown__separator">
                    :
                  </span>


                  {/* HOURS */}

                  <div className="membership-countdown__unit">

                    <strong>
                      {String(timeLeft.hours).padStart(
                        2,
                        '0'
                      )}
                    </strong>

                    <span>
                      {t('membership_countdown_hours')}
                    </span>

                  </div>


                  <span className="membership-countdown__separator">
                    :
                  </span>


                  {/* MINUTES */}

                  <div className="membership-countdown__unit">

                    <strong>
                      {String(timeLeft.minutes).padStart(
                        2,
                        '0'
                      )}
                    </strong>

                    <span>
                      {t('membership_countdown_minutes')}
                    </span>

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>


        {/* =====================================================
            RIGHT VISUAL
        ====================================================== */}

        <div className="membership-hero__visual">


          <div
            className="
              membership-hero__circle
              membership-hero__circle--one
            "
          />


          <div
            className="
              membership-hero__circle
              membership-hero__circle--two
            "
          />


          {/* LEFT YELLOW LINE */}

          <svg
            className="
              membership-hero__yellow-line
              membership-hero__yellow-line--left
            "
            viewBox="0 0 180 120"
            fill="none"
          >
            <path
              d="
                M170 8
                C105 13 57 37 36 72
                C24 92 32 108 52 113
              "
              stroke="var(--accent-400)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <path
              d="M46 102L53 114L64 108"
              stroke="var(--accent-400)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>


          {/* RIGHT YELLOW LINE */}

          <svg
            className="
              membership-hero__yellow-line
              membership-hero__yellow-line--right
            "
            viewBox="0 0 150 100"
            fill="none"
          >
            <path
              d="
                M8 84
                C45 78 76 61 99 38
                C112 25 119 14 123 5
              "
              stroke="var(--accent-400)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>


          {/* HERO IMAGE */}

          <div className="membership-hero__person-wrapper">

            <div className="membership-hero__person-glow" />

            <img
              src={heroImage}
              alt={t('membership_hero_image_alt')}
              className="membership-hero__person"
            />

          </div>


          {/* ERASMUS CARD */}

          <div
            className="
              membership-floating-card
              membership-floating-card--erasmus
            "
          >

            <div className="membership-floating-card__icon">
              <GraduationIcon />
            </div>

            <span>
              {t('membership_card_erasmus')}
            </span>

          </div>


          {/* OID CARD */}

          <div
            className="
              membership-floating-card
              membership-floating-card--oid
            "
          >

            <div className="membership-floating-card__icon">
              <BuildingIcon />
            </div>

            <span>
              {t('membership_card_oid')}
            </span>

          </div>


          {/* USERS CARD */}

          <div
            className="
              membership-floating-card
              membership-floating-card--users
            "
          >

            <div className="membership-floating-card__icon">
              <UsersIcon />
            </div>

            <span>
              {t('membership_card_users')}
            </span>

          </div>


          {/* DISCOUNT CARD */}

          <div
            className="
              membership-floating-card
              membership-floating-card--discount
            "
          >

            <div className="membership-floating-card__icon">
              <PercentIcon />
            </div>

            <span>
              {t('membership_card_discount')}
            </span>

          </div>


          <span
            className="
              membership-stroke
              membership-stroke--one
            "
          />

          <span
            className="
              membership-stroke
              membership-stroke--two
            "
          />

        </div>

      </div>


      {/* =======================================================
          BENEFITS
      ======================================================== */}

      <div className="membership-benefits">


        {/* PARTICIPANT BASE */}

        <div className="membership-benefit">

          <div className="membership-benefit__icon">
            <UsersIcon />
          </div>

          <div className="membership-benefit__text">

            <h3>
              {t('membership_benefit_base_title')}
            </h3>

            <p>
              {t('membership_benefit_base_desc')}
            </p>

          </div>

        </div>


        {/* SENDING ORGANIZATION */}

        <div className="membership-benefit">

          <div className="membership-benefit__icon">
            <BuildingIcon />
          </div>

          <div className="membership-benefit__text">

            <h3>
              {t('membership_benefit_so_title')}
            </h3>

            <p>
              {t('membership_benefit_so_desc')}
            </p>

          </div>

        </div>


        {/* SPECIAL ADVANTAGES */}

        <div className="membership-benefit">

          <div className="membership-benefit__icon">
            <PercentIcon />
          </div>

          <div className="membership-benefit__text">

            <h3>
              {t('membership_benefit_perks_title')}
            </h3>

            <p>
              {t('membership_benefit_perks_desc')}
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}