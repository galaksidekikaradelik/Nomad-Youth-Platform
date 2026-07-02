import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'

export default function Hero() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const stats = [
    { num: '50+', label: t('hero_stat_opportunities') },
    { num: '10+', label: t('hero_stat_services') },
    { num: '9',  label: t('hero_stat_category') },
  ]

  return (
    <section className="hero hero--centered">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="container hero__inner hero__inner--centered">
        <div className="hero__content hero__content--centered">
          <h1 className="hero__title">
            {t('hero_title_line1')}<br />
            <em>{t('hero_title_em')}</em> {t('hero_title_line2')}
          </h1>

          <p className="hero__desc">
            {t('hero_desc')}
          </p>

          <div className="hero__actions hero__actions--centered">
            <button
              className="btn-accent"
              onClick={() => navigate('/opportunities?scope=beynelxalq')}
            >
              {t('hero_btn_international')}
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate('/opportunities?scope=yerli')}
            >
              {t('hero_btn_local')}
            </button>
          </div>

          <div className="hero__stats hero__stats--centered">
            {stats.map(s => (
              <div key={s.label} className="hero__stat">
                <div className="hero__stat-num">{s.num}</div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}