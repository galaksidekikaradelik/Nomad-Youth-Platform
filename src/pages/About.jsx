import { Link } from 'react-router-dom'

const values = [
  { icon: '🎯', title: 'Məqsədli İnkişaf', desc: 'Hər gənc öz maraqlarına və hədəflərinə uyğun imkanı tapa bilsin deyə platforma qurduq.' },
  { icon: '🤝', title: 'Birlik', desc: 'Gənclər, təşkilatlar və mentorları bir araya gətirərək güclü bir ekosistem yaradırıq.' },
  { icon: '🌍', title: 'Açıqlıq', desc: 'Bütün imkanlar hamı üçün əlçatan olsun — fərq etməz harada yaşayırsan.' },
  { icon: '⚡', title: 'İnnovasiya', desc: 'Daim inkişaf edən platforma ilə gənclər texnologiya və yaradıcılıq sahəsində irəliləyir.' },
  { icon: '📈', title: 'Böyümə', desc: 'Hər bir təcrübə, hər bir könüllülük fəaliyyəti sənin peşəkar inkişafına töhfə verir.' },
  { icon: '💡', title: 'İlham', desc: 'Uğurlu gənclərin hekayələri ilə özünü ilhamlandır, yeni zirvələrə doğru uç.' },
]

const team = [
  { name: 'Əli Hüseynov',   role: 'Qurucu & CEO',        emoji: '👨‍💼' },
  { name: 'Nigar Əliyeva',  role: 'Məhsul Direktoru',    emoji: '👩‍💻' },
  { name: 'Rauf Məmmədov',  role: 'Kommunikasiya',       emoji: '👨‍🎨' },
  { name: 'Leyla Qasımova', role: 'Tərəfdaşlıq Mənəceri', emoji: '👩‍🤝‍👩' },
]

const stats = [
  { num: '500+', label: 'Aktiv İmkan' },
  { num: '120+', label: 'Tərəfdaş Təşkilat' },
  { num: '8K+',  label: 'Qeydiyyatlı Gənc' },
  { num: '3+',   label: 'İl Təcrübə' },
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

        {/* Mission */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-2xl)',
          marginBottom: 'var(--space-2xl)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 20% 50%, var(--color-primary-glow) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
            <div className="section-heading__eyebrow" style={{ marginBottom: 'var(--space-md)' }}>Misiyamız</div>
            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', lineHeight: 1.75, color: 'var(--color-text-muted)' }}>
              Azərbaycanda hər gəncin öz potensialını reallaşdıra bilməsi üçün lazım olan imkanları bir platformada toplamaq, onları doğru fürsətlərlə buluşdurmaq və inkişaflarını dəstəkləmək bizim əsas məqsədimizdir.
            </p>
          </div>
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

        {/* Values */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="section-heading">
            <div className="section-heading__eyebrow">Dəyərlərimiz</div>
            <h2 className="section-heading__title">Nəyə İnanırıq</h2>
          </div>
          <div className="about-values">
            {values.map(v => (
              <div key={v.title} className="value-card">
                <div className="value-card__icon">{v.icon}</div>
                <div className="value-card__title">{v.title}</div>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="section-heading">
            <div className="section-heading__eyebrow">Komanda</div>
            <h2 className="section-heading__title">Arxasındakı İnsanlar</h2>
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

        {/* CTA */}
        <div className="cta-banner">
          <div className="cta-banner__content">
            <h2 className="cta-banner__title">Bizimlə Tərəfdaş Ol</h2>
            <p className="cta-banner__desc">Təşkilatın varsa, birlikdə gəncləri daha çox imkanla tanış edək.</p>
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
