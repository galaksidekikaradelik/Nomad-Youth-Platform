import { Link } from 'react-router-dom'

const howItWorks = [
  { num: '1', icon: '🔍', title: 'Kəşf et', desc: 'Maraqlarına uyğun könüllülük, Erasmus+, təcrübə, qrant və digər inkişaf imkanlarını tap.' },
  { num: '2', icon: '📝', title: 'Müraciət et', desc: 'Şərtlərlə tanış ol və səni maraqlandıran layihələrə birbaşa müraciət et.' },
  { num: '3', icon: '🚀', title: 'İnkişaf et', desc: 'Yeni təcrübə qazan, beynəlxalq əlaqələr qur və karyera yolunda özünü inkişaf etdir.' },
]

const team = [
  { name: 'Əli Hüseynov',   role: 'Qurucu & CEO',        emoji: '👨‍💼' },
  { name: 'Nigar Əliyeva',  role: 'Məhsul Direktoru',    emoji: '👩‍💻' },
  { name: 'Rauf Məmmədov',  role: 'Kommunikasiya',       emoji: '👨‍🎨' },
  { name: 'Leyla Qasımova', role: 'Tərəfdaşlıq Mənəceri', emoji: '👩‍🤝‍👩' },
]

const stats = [
  { num: '50+', label: 'Aktiv İmkan' },
  { num: '10+', label: 'Xidmət' },
  { num: '7/24', label: 'Əlçatan Platforma' },
  { num: '9',  label: 'Kateqoriya' },
]

export default function About() {
  return (
    <div className="section">
      <div className="container">

        {/* Header */}
        <div className="page-header">
          <div className="page-header__eyebrow">Haqqımızda</div>
          <h1 className="page-header__title">Gənclərin Platforması</h1>
          <p className="page-header__desc">
            Nomad Youth — Azərbaycan gənclərinin şəxsi və peşəkar inkişafını dəstəkləmək üçün yaradılmış rəqəmsal platformadır.
          </p>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: 'var(--space-3xl)' }}>
          {stats.map(s => (
            <div key={s.label} style={{
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
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Nomad necə işləyir? */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="section-heading">
            <div className="section-heading__eyebrow">Necə İşləyir</div>
            <h2 className="section-heading__title">Nomad necə işləyir?</h2>
          </div>
          <div className="about-values">
            {howItWorks.map(step => (
              <div key={step.num} className="value-card">
                <div className="value-card__icon">{step.icon}</div>
                <div className="value-card__title">{step.num}. {step.title}</div>
                <p className="value-card__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="section-heading">
            <div className="section-heading__eyebrow">Komanda</div>
            <h2 className="section-heading__title">Komandamız</h2>
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
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA / Partnership */}
        <div className="cta-banner">
          <div className="cta-banner__content">
            <h2 className="cta-banner__title">Bizimlə Tərəfdaş Ol</h2>
            <p className="cta-banner__desc">Yeni imkanlarınızı Nomad Youth platformasında paylaşmaq üçün bizimlə əlaqə saxlayın.</p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/contact" className="btn-primary">Əlaqə Saxla</Link>
            <Link to="/opportunities" className="btn-outline">İmkanlara Bax</Link>
          </div>
        </div>

      </div>
    </div>
  )
}