import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import HomeServiceCard from './HomeServiceCard'
import ArrowIcon from '../icons/ArrowIcon'
import { useLanguage } from '../../hooks/useLanguage'

import { HOME_SERVICES } from '../../data/homeServices'
import { buildServiceContent } from '../../data/services'

export default function ServicesSection() {
  const { t } = useLanguage()

  const homeServices = useMemo(() => {
    const content = buildServiceContent(t)

    return HOME_SERVICES
      .map((item) => ({
        ...item,
        title: t(item.titleKey),
        service: content[item.id],
      }))
      .filter((item) => item.service)
  }, [t])

  return (
    <section className="section home-services-section">
      <div className="container">
        <div className="section-heading" data-reveal="up">
          <div className="section-heading__eyebrow">
            {t('home_services_eyebrow')}
          </div>

          <h2 className="section-heading__title">
            {t('home_services_title')}
          </h2>

          <p className="section-heading__desc">
            {t('home_services_desc')}
          </p>
        </div>

        <div className="grid-3 home-services-grid">
          {homeServices.map((item, index) => (
            <HomeServiceCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="home-services__footer" data-reveal="up">
          <Link to="/services" className="btn-outline home-arrow-button">
            {t('home_services_btn_all')}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}