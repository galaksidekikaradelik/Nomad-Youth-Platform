import { Check, X } from 'lucide-react'
import { buildWhatsAppLink } from '../../config/whatsapp'
import { useLanguage } from '../../hooks/useLanguage'

export default function ServiceModal({ service, onClose }) {
  const { t } = useLanguage()

  if (!service) return null

  const Icon = service.icon

  const handleWhatsApp = () => {
    const message = t('service_modal_whatsapp_message').replace(
      '{service}',
      service.title
    )

    window.open(
      buildWhatsAppLink(message),
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div className="ny-overlay" onClick={onClose}>
      <div className="ny-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="ny-close"
          onClick={onClose}
          aria-label={t('modal_close_aria')}
        >
          <X size={18} />
        </button>

        <div className="ny-modal-head">
          <div className="ny-modal-icon">
            <Icon size={26} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="ny-modal-title">{service.title}</h2>
            <p className="ny-modal-desc">{service.shortDesc}</p>
          </div>
        </div>

        <div className="ny-tags">
          <span className="ny-tag ny-tag--duration">{service.duration}</span>
          <span className="ny-tag ny-tag--format">{service.format}</span>
          <span className="ny-tag ny-tag--result">{service.result}</span>
        </div>

        <div className="ny-cols">
          <div>
            <h3 className="ny-col-title">{t('service_modal_audience_title')}</h3>

            <ul className="ny-list">
              {service.audience.map((item) => (
                <li key={item}>
                  <span className="ny-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="ny-col-title">{t('service_modal_includes_title')}</h3>

            <ul className="ny-list">
              {service.includes.map((item) => (
                <li key={item}>
                  <Check size={15} className="ny-check" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {service.note && <p className="ny-note">{service.note}</p>}

        <div className="ny-actions">
          <button
            className="ny-btn ny-btn--primary ny-modal-btn"
            onClick={handleWhatsApp}
          >
            {service.primaryCta}
          </button>
        </div>

        <p className="ny-fineprint">{t('service_modal_fineprint')}</p>
      </div>
    </div>
  )
}