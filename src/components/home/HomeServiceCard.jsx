import { Link } from 'react-router-dom'

import ArrowIcon from '../icons/ArrowIcon'
import { useLanguage } from '../../hooks/useLanguage'

export default function HomeServiceCard({ item, index }) {
  const { t } = useLanguage()
  const { service } = item
  const Icon = service.icon

  return (
    <Link
      to={`/services?category=${item.category}`}
      className="home-service-card"
      data-reveal="up"
      style={{ '--reveal-delay': `${index * 110}ms` }}
    >
      <div className="home-service-card__content">
        <div className="home-service-card__number">
          {String(index + 1).padStart(2, '0')}
        </div>

        {Icon && (
          <div className="home-service-card__icon">
            <Icon size={26} strokeWidth={1.8} />
          </div>
        )}

        <h3>{item.title}</h3>

        <p>{service.shortDesc}</p>

        <span>
          {t('card_view_details')}
          <ArrowIcon />
        </span>
      </div>
    </Link>
  )
}