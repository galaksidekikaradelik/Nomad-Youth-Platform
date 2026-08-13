import { createPortal } from 'react-dom'
import { useLanguage } from '../hooks/useLanguage'

const WHATSAPP_NUMBER = '994517773764'

export default function ServicePopupModal({ service, onClose }) {
  const { t } = useLanguage()

  if (!service) return null

  const Icon = service.icon
  const features = service.features || []

  const buildWhatsAppLink = (serviceTitle) => {
    const message = t('modal_whatsapp_greeting').replace('{service}', serviceTitle)
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  const whatsappLink = buildWhatsAppLink(service.title)

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return createPortal(
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--space-md)',
      }}
    >
      <div
        className="modal-content"
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-2xl)',
          maxWidth: 600,
          width: '100%',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <button
          onClick={onClose}
          aria-label={t('modal_close_aria')}
          style={{
            position: 'absolute',
            top: 'var(--space-md)',
            right: 'var(--space-md)',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            lineHeight: 1,
            color: 'var(--text-muted)',
          }}
        >
          ×
        </button>

        <div className="service-icon-badge service-icon-badge--modal">
          <Icon size={30} strokeWidth={1.75} />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 700,
          marginBottom: 'var(--space-sm)',
        }}>
          {service.title}
        </h2>

        {service.desc && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 'var(--space-md)' }}>
            {service.desc}
          </p>
        )}

        {features.length > 0 && (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 var(--space-lg)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-xs, 8px)',
            }}
          >
            {features.map((feature, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  fontSize: '0.92rem',
                  color: 'var(--text-body, var(--text-muted))',
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: 'var(--color-primary, #16a34a)', flexShrink: 0 }}>✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}



        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}
        >
          {t('modal_whatsapp_btn')}
        </a>
      </div>
    </div>,
    document.body
  )
}