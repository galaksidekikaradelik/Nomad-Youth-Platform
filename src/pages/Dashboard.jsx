import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useApplicationStatus } from '../hooks/useApplicationStatus'
import { useLanguage } from '../hooks/useLanguage'
import { isExpired } from '../utils/opportunityStatus'
import { STATUS_CONFIG } from '../utils/applicationStatus'

function DashboardItem({ item, isOpen, onToggle, t, locale }) {
  const config = STATUS_CONFIG[item.status]
  const formattedDeadline = item.deadline
    ? new Date(item.deadline).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : '—'
  const expired = isExpired(item)

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.title}</span>
        <span className={`faq-icon${isOpen ? ' faq-icon--open' : ''}`}>
          +
        </span>
      </button>
      <div className={`faq-answer${isOpen ? ' faq-answer--open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: 'var(--space-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>{t('dashboard_field_title')}</span>
            <span style={{ fontWeight: 600, textAlign: 'right' }}>{item.title}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>{t('dashboard_field_status')}</span>
            <span
              className={`opportunity-card__status-badge${config ? ` opportunity-card__status-badge--${config.modifier}` : ' opportunity-card__status-badge--empty'}`}
              style={{ display: 'inline-flex' }}
            >
              <span className="opportunity-card__status-dot" />
              {config ? t(config.labelKey) : '—'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>{t('dashboard_field_deadline')}</span>
            <span style={{ fontWeight: 600 }}>{formattedDeadline}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>{t('dashboard_field_listing_status')}</span>
            <span style={{ fontWeight: 600, color: expired ? 'var(--status-error)' : 'var(--status-success)' }}>
              {expired ? t('dashboard_status_closed') : t('dashboard_status_active')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const { t, lang } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)
  const locale = lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'az-AZ'


  const { statusItems } = useApplicationStatus()

  const applications = useMemo(() => {
    if (!user) return []
    return statusItems.map(({ opp, status }) => ({ ...opp, status }))
  }, [user, statusItems])

  if (!user) {
    return (
      <div className="section">
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="empty-state">
            <div className="empty-state__icon">🔒</div>
            <div className="empty-state__title">{t('dashboard_auth_required_title')}</div>
            <p className="empty-state__desc">{t('dashboard_auth_required_desc')}</p>
            <Link to="/login" className="btn-primary" style={{ marginTop: 'var(--space-md)', display: 'inline-flex' }}>
              {t('auth_sign_in')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 760 }}>

        <div className="page-header">
          <div className="page-header__eyebrow">{t('dashboard_eyebrow')}</div>
          <h1 className="page-header__title">{t('dashboard_title')}</h1>
          <p className="page-header__desc">{t('dashboard_desc')}</p>
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">📭</div>
            <div className="empty-state__title">{t('dashboard_empty_title')}</div>
            <p className="empty-state__desc">{t('dashboard_empty_desc')}</p>
            <Link to="/opportunities" className="btn-primary" style={{ marginTop: 'var(--space-md)', display: 'inline-flex' }}>
              {t('about_cta_opportunities')}
            </Link>
          </div>
        ) : (
          <div className="faq-list">
            {applications.map((item, i) => (
              <DashboardItem
                key={item.id || item.title}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                t={t}
                locale={locale}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}