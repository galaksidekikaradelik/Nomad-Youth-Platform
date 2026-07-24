import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage' 

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/nomad.youth?igsh=MTdrM3BndHQybmxvdQ==', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )},
  { label: 'LinkedIn', href: '#', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )},
]

// FAQ sütununda göstəriləcək suallar (FAQ.jsx-dəki FAQ_KEYS massivinin indeksinə uyğun, 1-dən başlayaraq)
const footerFaqItems = [
  { qKey: 'faq_q1', index: 1 },
  { qKey: 'faq_q2', index: 2 },
  { qKey: 'faq_q3', index: 3 },
]

export default function Footer() {
  const { t } = useLanguage()

  const nav = {
    [t('footer_col_platform')]: [
      { label: t('nav_home'), to: '/' },
      { label: t('nav_opportunities'), to: '/opportunities' },
      { label: t('nav_about'), to: '/about' },
      { label: t('nav_contact'), to: '/contact' },
    ],
    [t('footer_col_category')]: [
      { label: t('footer_cat_volunteering'), to: '/opportunities' },
      { label: t('footer_cat_internship'), to: '/opportunities' },
      { label: t('footer_cat_grants'), to: '/opportunities' },
      { label: t('footer_cat_events'), to: '/opportunities' },
    ],
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              Nomad Youth
            </div>
            <p>{t('footer_brand_desc')}</p>
          </div>

          {Object.entries(nav).map(([title, items]) => (
            <div className="footer__col" key={title}>
              <p className="footer__col-title">{title}</p>
              <ul>
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__col" key="faq">
            <p className="footer__col-title">{t('footer_col_faq')}</p>
            <ul>
              {footerFaqItems.map(item => (
                <li key={item.qKey}>
                  <Link to={`/faq?q=${item.index}`}>{t(item.qKey)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__disclaimer">
          {t('footer_disclaimer')} <em>{t('footer_disclaimer_em')}</em>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Nomad Youth. {t('footer_rights')}</p>
          <div className="footer__socials">
            {socials.map(s => (
              <a key={s.label} href={s.href} className="footer__social-link" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}