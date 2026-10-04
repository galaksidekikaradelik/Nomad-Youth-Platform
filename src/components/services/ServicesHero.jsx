import { useLanguage } from '../../hooks/useLanguage'

const scrollToCategories = () => {
  document.querySelector('.ny-cat-grid')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export default function ServicesHero() {
  const { t } = useLanguage()

  const sideItems = [
    {
      title: t('services_hero_side1_title'),
      desc: t('services_hero_side1_desc'),
    },
    {
      title: t('services_hero_side2_title'),
      desc: t('services_hero_side2_desc'),
    },
    {
      title: t('services_hero_side3_title'),
      desc: t('services_hero_side3_desc'),
    },
    {
      title: t('services_hero_side4_title'),
      desc: t('services_hero_side4_desc'),
    },
  ]

  return (
    <section className="ny-hero">
      <div className="ny-hero-inner">
        <div>
          <span className="ny-pill">{t('services_hero_pill')}</span>

          <h1 className="ny-hero-title">
            {t('services_hero_title_line1')}
            <br />
            {t('services_hero_title_line2')}
          </h1>

          <p className="ny-hero-desc">{t('services_hero_desc')}</p>

          <div className="ny-hero-actions">
            <button
              className="ny-btn ny-btn--primary"
              onClick={scrollToCategories}
            >
              {t('services_hero_btn')}
            </button>
          </div>
        </div>

        <div className="ny-stats-banner">
          <ul className="ny-side-list">
            {sideItems.map((item) => (
              <li key={item.title}>
                <span className="ny-side-dot-title">{item.title}</span>
                <span className="ny-side-dot">{item.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}