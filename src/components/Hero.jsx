import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'

const GlobeIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18" />
    <path d="M12 3a14 14 0 0 0 0 18" />
  </svg>
)

const LightbulbIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M8.5 14.5C7.55 13.66 7 12.43 7 11a5 5 0 0 1 10 0c0 1.43-.55 2.66-1.5 3.5-.73.64-1.5 1.35-1.5 2.5h-4c0-1.15-.77-1.86-1.5-2.5Z" />
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

export default function Hero() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const stats = [
    {
      num: '50+',
      label: t('hero_stat_opportunities'),
    },
    {
      num: '10+',
      label: t('hero_stat_services'),
    },
    {
      num: '10+',
      label: t('hero_stat_category'),
    },
    {
      num: '100+',
      label: 'Üzv',
    },
  ]

  return (
    <section className="hero hero--centered">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="hero__side-image hero__side-image--left">

        <div className="hero__image-card">

          <img
            src='src\assets\images\hero2-1.png'
            alt="Gənclər"
          />

        </div>

        <div className="hero__floating-icon hero__floating-icon--globe">
          <GlobeIcon />
        </div>

        <div className="hero__yellow-dash hero__yellow-dash--left" />

        <div className="hero__yellow-line hero__yellow-line--left" />

      </div>

      <div className="hero__side-image hero__side-image--right">

        <div className="hero__image-card">

          <img
            src='src\assets\images\hero2-2.png'
            alt="Nomad Youth iştirakçısı"
          />

        </div>

        <div className="hero__floating-icon hero__floating-icon--idea">
          <LightbulbIcon />
        </div>

        <div className="hero__yellow-dash hero__yellow-dash--right" />

        <div className="hero__yellow-line hero__yellow-line--right" />

      </div>

      <div className="container hero__inner hero__inner--centered">

        <div className="hero__content hero__content--centered">

          <h1 className="hero__title">

            {t('hero_title_line1')}

            <br />

            <em>
              {t('hero_title_em')}
            </em>{' '}

            {t('hero_title_line2')}

          </h1>


          <p className="hero__desc">
            {t('hero_desc')}
          </p>

          <div className="hero__actions hero__actions--centered">

            <button
              className="btn-accent"
              onClick={() =>
                navigate('/opportunities?scope=beynelxalq')
              }
            >
              {t('hero_btn_international')}
              <ArrowIcon />
            </button>


            <button
              className="btn-outline"
              onClick={() =>
                navigate('/opportunities?scope=yerli')
              }
            >
              {t('hero_btn_local')}
            </button>


            <button
              className="btn-dark"
              onClick={() =>
                navigate('/membership')
              }
            >
              Üzv ol
            </button>

          </div>

          <div className="hero__stats hero__stats--centered">

            {stats.map((stat) => (
              <div
                key={stat.label}
                className="hero__stat"
              >

                <div className="hero__stat-num">
                  {stat.num}
                </div>

                <div className="hero__stat-label">
                  {stat.label}
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  )
}