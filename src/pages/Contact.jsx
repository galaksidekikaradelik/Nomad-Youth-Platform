import { useState } from 'react'

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const infoCards = [
  { icon: <MailIcon />,  label: 'E-poçt',   value: 'nomadyouthplatform@gmail.com' },
  { icon: <PhoneIcon />, label: 'Telefon',  value: '+994 12 000 00 00' },
  { icon: <PinIcon />,   label: 'Ünvan',    value: 'Bakı, Azərbaycan' },
]

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  return (
    <div className="section">
      <div className="container">

        <div className="page-header">
          <div className="page-header__eyebrow">Əlaqə</div>
          <h1 className="page-header__title">Bizimlə Əlaqə Saxla</h1>
          <p className="page-header__desc">
            Layihənizi paylaşmaq, tərəfdaşlıq etmək və ya hər hansı sualınızı bizimlə bölüşmək üçün əlaqə saxlayın.
          </p>
        </div>

        <div className="contact-grid">

          {/* Info */}
          <div className="contact-info">
            {infoCards.map(c => (
              <div key={c.label} className="contact-info-card">
                <div className="contact-info-card__icon">{c.icon}</div>
                <div>
                  <div className="contact-info-card__label">{c.label}</div>
                  <div className="contact-info-card__value">{c.value}</div>
                </div>
              </div>
            ))}

            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-lg)',
              marginTop: 'var(--space-sm)',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                İş saatları
              </div>
              {[
                { day: 'Bazar ertəsi — Cümə', time: '09:00 – 18:00' },
                { day: 'Şənbə',               time: '10:00 – 14:00' },
                { day: 'Bazar',               time: 'İstirahət' },
              ].map(r => (
                <div key={r.day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '6px 0', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>{r.day}</span>
                  <span style={{ fontWeight: 500, color: r.time === 'İstirahət' ? 'var(--color-text-faint)' : 'var(--color-text)' }}>{r.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', gap: 'var(--space-md)',
            }}>
              <div style={{ fontSize: '3rem' }}>✅</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700 }}>
                Mesajın çatdı!
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                Ən qısa zamanda sənə cavab verəcəyik. Təşəkkür edirik!
              </p>
              <button className="btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}>
                Yeni Mesaj
              </button>
            </div>
          ) : (
            <div className="contact-form">
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-sm)' }}>
                Mesaj Göndər
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="form-group">
                  <label className="form-label">Adın *</label>
                  <input className="form-input" name="name" placeholder="Adın Soyadın" value={form.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">E-poçt *</label>
                  <input className="form-input" name="email" type="email" placeholder="email@example.com" value={form.email} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mövzu</label>
                <input className="form-input" name="subject" placeholder="Nə barədə yazırsın?" value={form.subject} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label">Mesaj *</label>
                <textarea className="form-textarea" name="message" placeholder="Mesajını bura yaz..." value={form.message} onChange={handleChange} />
              </div>

              <button className="btn-primary" onClick={handleSubmit} style={{ marginTop: 'var(--space-sm)' }}>
                Göndər
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}