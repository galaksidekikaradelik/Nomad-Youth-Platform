import { Link } from 'react-router-dom'

import ArrowIcon from '../icons/ArrowIcon'
import aboutImg from '../../assets/about.webp'
import { useLanguage } from '../../hooks/useLanguage'

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section className="section home-about-section">
      <div className="container">
        <div className="home-about">
          <div className="home-about__content" data-reveal="left">
            <h2 className="section-heading__title">
              {t('home_about_title_line1')}
              <br />
              <span>{t('home_about_title_em')}</span>
            </h2>

            <p className="section-heading__desc">{t('home_about_desc1')}</p>
            <p className="section-heading__desc">{t('home_about_desc2')}</p>
            <p className="section-heading__desc">{t('home_about_desc3')}</p>

            <Link to="/about" className="btn-outline home-arrow-button">
              {t('home_about_btn')}
              <ArrowIcon />
            </Link>
          </div>

          <div className="home-about__visual" data-reveal="right">
            <div className="home-about__image-frame">
              <img
                src={aboutImg}
                alt={t('home_about_image_alt')}
                className="home-about__image"
              />

              <div className="home-about__image-overlay" />
            </div>

            <div className="home-about__accent home-about__accent--top" />
            <div className="home-about__accent home-about__accent--bottom" />
          </div>
        </div>
      </div>
    </section>
  )
}