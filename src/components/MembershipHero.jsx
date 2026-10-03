import { Link } from 'react-router-dom'
import '../style/index.css'

import heroImage from '../assets/hero-1.png'

const UsersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const BuildingIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <path d="M9 21v-6h6v6" />
    <path d="M9 9h.01" />
    <path d="M12 9h.01" />
    <path d="M15 9h.01" />
    <path d="M9 12h.01" />
    <path d="M12 12h.01" />
    <path d="M15 12h.01" />
  </svg>
)

const PercentIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
)

const GraduationIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c3 2 9 2 12 0v-5" />
    <path d="M22 10v6" />
  </svg>
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
  return (
    <section className="membership-hero">
      <div className="membership-hero__grid" />

      <div className="membership-hero__inner">
        <div className="membership-hero__content">
          <h1 className="membership-hero__title">
            Erasmus+ yolunuzu
            <br />
            <span>Nomad Youth</span> ilə
            <br />
            daha sistemli qurun.
          </h1>

          <p className="membership-hero__description">
            1 illik üzvlüklə iştirakçı bazamıza qoşulun, Sending Organization
            və OID dəstəyindən yararlanın və Nomad Youth xidmətlərində xüsusi
            üstünlüklər əldə edin.
          </p>

          <div className="membership-hero__actions">
            <Link
              to="/membership"
              className="membership-btn membership-btn--primary"
            >
              Üzv ol
              <ArrowIcon />
            </Link>

            <Link
              to="/membership"
              className="membership-btn membership-btn--secondary"
            >
              Üzvlük haqqında
            </Link>
          </div>
        </div>

        <div className="membership-hero__visual">
          <div className="membership-hero__circle membership-hero__circle--one" />
          <div className="membership-hero__circle membership-hero__circle--two" />

          <svg
            className="membership-hero__yellow-line membership-hero__yellow-line--left"
            viewBox="0 0 180 120"
            fill="none"
          >
            <path
              d="M170 8C105 13 57 37 36 72C24 92 32 108 52 113"
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

          <svg
            className="membership-hero__yellow-line membership-hero__yellow-line--right"
            viewBox="0 0 150 100"
            fill="none"
          >
            <path
              d="M8 84C45 78 76 61 99 38C112 25 119 14 123 5"
              stroke="var(--accent-400)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <div className="membership-hero__person-wrapper">
            <div className="membership-hero__person-glow" />

            <img
              src={heroImage}
              alt="Nomad Youth Erasmus+"
              className="membership-hero__person"
            />
          </div>

          <div className="membership-floating-card membership-floating-card--erasmus">
            <div className="membership-floating-card__icon">
              <GraduationIcon />
            </div>

            <span>
              Erasmus+
              <br />
              imkanları
            </span>
          </div>

          <div className="membership-floating-card membership-floating-card--oid">
            <div className="membership-floating-card__icon">
              <BuildingIcon />
            </div>

            <span>OID dəstəyi</span>
          </div>

          <div className="membership-floating-card membership-floating-card--users">
            <div className="membership-floating-card__icon">
              <UsersIcon />
            </div>

            <span>
              İştirakçı
              <br />
              bazası
            </span>
          </div>

          <div className="membership-floating-card membership-floating-card--discount">
            <div className="membership-floating-card__icon">
              <PercentIcon />
            </div>

            <span>
              Xüsusi
              <br />
              endirimlər
            </span>
          </div>

          <span className="membership-stroke membership-stroke--one" />
          <span className="membership-stroke membership-stroke--two" />
        </div>
      </div>

      <div className="membership-benefits">
        <div className="membership-benefit">
          <div className="membership-benefit__icon">
            <UsersIcon />
          </div>

          <div className="membership-benefit__text">
            <h3>İştirakçı bazası</h3>
            <p>Uyğun layihələr olduqda birbaşa məlumat alın.</p>
          </div>
        </div>

        <div className="membership-benefit">
          <div className="membership-benefit__icon">
            <BuildingIcon />
          </div>

          <div className="membership-benefit__text">
            <h3>Sending Organization dəstəyi</h3>
            <p>1 il ərzində OID və təşkilat dəstəyi.</p>
          </div>
        </div>

        <div className="membership-benefit">
          <div className="membership-benefit__icon">
            <PercentIcon />
          </div>

          <div className="membership-benefit__text">
            <h3>Xüsusi üstünlüklər</h3>
            <p>Xidmətlərə 40%, tədbirlərə 30% endirim.</p>
          </div>
        </div>
      </div>
    </section>
  )
}