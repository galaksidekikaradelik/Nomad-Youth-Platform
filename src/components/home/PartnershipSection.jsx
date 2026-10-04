import { Link } from 'react-router-dom'

import ArrowIcon from '../icons/ArrowIcon'
import { useLanguage } from '../../hooks/useLanguage'

export default function PartnershipSection() {
  const { t } = useLanguage()

  return (
    <section className="section home-partnership-section">
      <div className="container">
        <div className="home-partnership" data-reveal="up">
          <div className="home-partnership__content">
            <div className="section-heading__eyebrow">
              {t('home_partnership_eyebrow')}
            </div>

            <h2 className="section-heading__title">
              {t('home_partnership_title_line1')}
              <br />
              <span>{t('home_partnership_title_em')}</span>
            </h2>

            <p className="home-partnership__desc">
              {t('home_partnership_desc')}
            </p>

            <Link to="/contact" className="btn-primary home-arrow-button">
              {t('home_partnership_btn')}
              <ArrowIcon />
            </Link>
          </div>

          <div className="home-partnership__visual">
            <div className="home-partnership__orb home-partnership__orb--one" />
            <div className="home-partnership__orb home-partnership__orb--two" />

            <div className="home-partnership__number">+</div>

            <div className="home-partnership__label">
              {t('home_partnership_label')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}