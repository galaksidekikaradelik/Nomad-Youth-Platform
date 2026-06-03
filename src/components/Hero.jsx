import { Link } from 'react-router-dom'

const stats = [
  { num: '500+', label: 'Aktiv İmkan' },
  { num: '120+', label: 'Təşkilat' },
  { num: '8K+',  label: 'Gənc İstifadəçi' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Azərbaycanın Gənclər Platforması
          </div>

          <h1 className="hero__title">
            Gələcəyini<br />
            <em>İndi</em> Qur
          </h1>

          <p className="hero__desc">
            Könüllülük, təcrübə, qrant, təlim və tədbirləri bir yerdə kəşf et. Maraqlarına uyğun imkanları tap, müraciət et, inkişaf et.
          </p>

          <div className="hero__actions">
            <Link to="/opportunities" className="btn-primary">
              İmkanları Kəşf Et
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/about" className="btn-outline">
              Haqqımızda
            </Link>
          </div>

          <div className="hero__stats">
            {stats.map(s => (
              <div key={s.label}>
                <div className="hero__stat-num">{s.num}</div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}