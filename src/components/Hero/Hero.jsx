import { useNavigate } from 'react-router-dom'

const stats = [
  { num: '500+', label: 'Aktiv İmkan' },
  { num: '120+', label: 'Tərəfdaş Təşkilat' },
  { num: '8K+',  label: 'Qeydiyyatlı Gənc' },
]

const cards = [
  { emoji: '🌍', title: 'UN Könüllü Proqramı',    org: 'UNDP Azerbaijan', type: 'Könüllülük', color: '#D1FAE5', textColor: '#065F46' },
  { emoji: '💡', title: 'Tech Startap Təcrübəsi', org: 'BSTP Bakı',       type: 'Təcrübə',   color: '#EDE9FE', textColor: '#4C1D95' },
  { emoji: '🏆', title: 'Avropa Gənclik Mükafatı',org: 'Avropa Şurası',   type: 'Qrant',     color: '#FFF0A3', textColor: '#7A5C00' },
]

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="container hero__inner">

        {/* ── Sol: Mətn ── */}
        <div className="hero__content">
          <h1 className="hero__title">
            Gələcəyini<br />
            <em>İndi</em> Qur
          </h1>

          <p className="hero__desc">
            Könüllülük, təcrübə, qrant, təlim və tədbirləri bir yerdə kəşf et. Maraqlarına uyğun imkanları tap, müraciət et, inkişaf et.
          </p>

          <div className="hero__actions">
            <button
              className="btn-accent"
              onClick={() => navigate('/opportunities?scope=beynelxalq')}
            >
              Beynəlxalq Layihələr
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate('/opportunities?scope=yerli')}
            >
              Yerli Layihələr
            </button>
          </div>

          <div className="hero__stats">
            {stats.map(s => (
              <div key={s.label} className="hero__stat">
                <div className="hero__stat-num">{s.num}</div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sağ: Dekorativ kartlar ── */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__cards">
            {cards.map((card, i) => (
              <div key={card.title} className="hero__card" style={{ '--card-delay': `${i * 0.12}s` }}>
                <div className="hero__card-top">
                  <span className="hero__card-type" style={{ background: card.color, color: card.textColor }}>
                    {card.type}
                  </span>
                </div>
                <div className="hero__card-title">{card.title}</div>
                <div className="hero__card-org">{card.org}</div>
                <div className="hero__card-bar">
                  <div className="hero__card-bar-fill" style={{ width: `${65 + i * 10}%` }} />
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  )
}
