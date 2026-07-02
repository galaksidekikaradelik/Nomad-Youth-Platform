import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'

const team = [
  { name: 'Raul Israfilov',   roleKey: 'about_role_ceo',         emoji: '👨‍💼' },
  { name: 'Gümüş Hüseynova',  roleKey: 'about_role_dev',     emoji: '👩‍💻' },
  { name: 'Şəbnəm Osmanova',  roleKey: 'about_role_dev',       emoji: '👩‍💻' },
  { name: 'Əminə Qocayeva', roleKey: 'about_role_partnership', emoji: '👨‍🎨' },
  { name: 'Nəzrin Xankişiyeva', roleKey: 'about_role_partnership', emoji: '👨‍🎨' }
]

export default function About() {
  const { t } = useLanguage()

  const howItWorks = [
    { num: '1', icon: '🔍', titleKey: 'about_step1_title', descKey: 'about_step1_desc' },
    { num: '2', icon: '📝', titleKey: 'about_step2_title', descKey: 'about_step2_desc' },
    { num: '3', icon: '🚀', titleKey: 'about_step3_title', descKey: 'about_step3_desc' },
  ]

  const stats = [
    { num: '50+',  labelKey: 'about_stat_opportunities' },
    { num: '10+',  labelKey: 'about_stat_services' },
    { num: '7/24', labelKey: 'about_stat_available' },
    { num: '9',    labelKey: 'about_stat_category' },
  ]

  return (
    <div className="section">
      <div className="container">

        {/* Header */}
        <div className="page-header">
          <div className="page-header__eyebrow">{t('about_eyebrow')}</div>
          <h1 className="page-header__title">{t('about_title')}</h1>
          <p className="page-header__desc">{t('about_desc')}</p>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: 'var(--space-3xl)' }}>
          {stats.map(s => (
            <div key={s.labelKey} style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-xl)',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {s.num}
              </div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: 'var(--space-xs)' }}>
                {t(s.labelKey)}
              </div>
            </div>
          ))}
        </div>

        {/* Nomad necə işləyir? */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="section-heading">
            <div className="section-heading__eyebrow">{t('about_how_eyebrow')}</div>
            <h2 className="section-heading__title">{t('about_how_title')}</h2>
          </div>
          <div className="about-values">
            {howItWorks.map(step => (
              <div key={step.num} className="value-card">
                <div className="value-card__icon">{step.icon}</div>
                <div className="value-card__title">{step.num}. {t(step.titleKey)}</div>
                <p className="value-card__desc">{t(step.descKey)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="section-heading">
            <div className="section-heading__eyebrow">{t('about_team_eyebrow')}</div>
            <h2 className="section-heading__title">{t('about_team_title')}</h2>
          </div>
          <div className="grid-4">
            {team.map(m => (
              <div key={m.name} style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-xl)',
                textAlign: 'center',
                transition: 'border-color var(--transition-base), transform var(--transition-base)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>{m.emoji}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t(m.roleKey)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA / Partnership */}
        <div className="cta-banner">
          <div className="cta-banner__content">
            <h2 className="cta-banner__title">{t('about_cta_title')}</h2>
            <p className="cta-banner__desc">{t('about_cta_desc')}</p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/contact" className="btn-primary">{t('about_cta_contact')}</Link>
            <Link to="/opportunities" className="btn-outline">{t('about_cta_opportunities')}</Link>
          </div>
        </div>

      </div>
    </div>
  )
}