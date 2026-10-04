import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export default function ServiceCard({ service, onOpen }) {
  const { t } = useLanguage()
  const Icon = service.icon

  return (
    <button className="ny-card" onClick={onOpen}>
      <div className="ny-icon-badge">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      <div className="ny-card-title">{service.title}</div>

      <div className="ny-card-desc">{service.shortDesc}</div>

      <span className="ny-card-link">
        {t('card_view_details')}
        <ArrowRight size={14} />
      </span>
    </button>
  )
}