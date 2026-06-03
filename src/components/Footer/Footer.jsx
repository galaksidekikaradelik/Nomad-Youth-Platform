import { Link } from 'react-router-dom'

const nav = {
  Platform: [
    { label: 'Ana Səhifə',  to: '/' },
    { label: 'İmkanlar',    to: '/opportunities' },
    { label: 'Haqqımızda',  to: '/about' },
    { label: 'Əlaqə',       to: '/contact' },
  ],
  Kateqoriya: [
    { label: 'Könüllülük',  to: '/opportunities' },
    { label: 'Təcrübə',     to: '/opportunities' },
    { label: 'Qrantlar',    to: '/opportunities' },
    { label: 'Tədbirlər',   to: '/opportunities' },
  ],
}

const socials = [
  { label: 'Instagram', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )},
  { label: 'LinkedIn', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )},
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              Nomad Youth
            </div>
            <p>Gənclərin könüllülük, təcrübə, qrant və inkişaf imkanlarını bir platformada kəşf etməsi üçün yaradılmış resurs mərkəzi.</p>
          </div>

          {Object.entries(nav).map(([title, items]) => (
            <div className="footer__col" key={title}>
              <h4>{title}</h4>
              <ul>
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__disclaimer">
          ⚖️ Nomad Youth heç bir məsuliyyət daşımır. Biz sadəcə sizinlə layihələr arasında körpü rolunu oynayırıq. <em>Avropada görüşək. 🌍</em>
        </div>

        <div className="footer__bottom">
          <p>© 2025 Nomad Youth. Bütün hüquqlar qorunur.</p>
          <div className="footer__socials">
            {socials.map(s => (
              <a key={s.label} href="#" className="footer__social-link" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
