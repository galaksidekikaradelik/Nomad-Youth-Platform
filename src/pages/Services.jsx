import { useState } from 'react'

const SERVICES = [
  { id: 'cv',             icon: '📄', title: 'CV Hazırlanması',      desc: 'Peşəkar və effektiv CV hazırlanması dəstəyi.' },
  { id: 'europass',       icon: '🇪🇺', title: 'Europass CV',          desc: 'Beynəlxalq standartlara uyğun Europass formatında CV.' },
  { id: 'motivation',     icon: '✍️', title: 'Motivation Letter',    desc: 'Məqsədyönlü və təsirli motivasiya məktubu yazılması.' },
  { id: 'recommendation', icon: '📝', title: 'Recommendation Letter', desc: 'Tövsiyə məktubunun hazırlanmasında dəstək.' },
  { id: 'cv-review',      icon: '🔍', title: 'CV Yoxlanışı',         desc: 'Mövcud CV-nin peşəkar araşdırılması və düzəlişlər.' },
  { id: 'mentorship',     icon: '🎓', title: 'Mentorluq',            desc: 'Fərdi inkişaf üçün mentorla bir-bir görüşlər.' },
  { id: 'application',    icon: '📬', title: 'Müraciət Dəstəyi',     desc: 'Layihələrə müraciət prosesində addım-addım dəstək.' },
  { id: 'interview',      icon: '🎤', title: 'Interview Hazırlığı',  desc: 'Müsahibəyə hazırlıq və məşq sessiyaları.' },
  { id: 'other',          icon: '💬', title: 'Digər Xidmətlər',      desc: 'Sualın var? Bizimlə əlaqə saxla, kömək edək.' },
]

export default function Services() {
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name || !form.email || !selected) return
    setSubmitted(true)
  }

  const reset = () => {
    setSubmitted(false)
    setSelected(null)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  const selectedService = SERVICES.find(s => s.id === selected)

  return (
    <div className="section">
      <div className="container">

        <div className="page-header">
          <div className="page-header__eyebrow">Dəstək</div>
          <h1 className="page-header__title">Xidmətlər</h1>
          <p className="page-header__desc">
            CV-dən müsahibə hazırlığına qədər — sənin inkişaf yolunda lazım olan dəstəyi seç, komandamız səninlə əlaqə saxlasın.
          </p>
        </div>

        {submitted ? (
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-2xl)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', gap: 'var(--space-md)', maxWidth: 480, margin: '0 auto',
          }}>
            <div style={{ fontSize: '3rem' }}>✅</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700 }}>
              Sorğun qəbul olundu!
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <strong>{selectedService?.title}</strong> xidməti üzrə komandamız tezliklə səninlə əlaqə saxlayacaq.
            </p>
            <button className="btn-primary" onClick={reset}>Yeni Sorğu</button>
          </div>
        ) : (
          <>
            <div className="grid-3" style={{ marginBottom: 'var(--space-2xl)' }}>
              {SERVICES.map(s => (
                <button
                  key={s.id}
                  className={`category-card${selected === s.id ? ' active' : ''}`}
                  onClick={() => setSelected(s.id)}
                  style={{ width: '100%' }}
                >
                  <div className="category-card__icon">{s.icon}</div>
                  <div className="category-card__name">{s.title}</div>
                  <div className="category-card__count">{s.desc}</div>
                </button>
              ))}
            </div>

            <div className="contact-form" style={{ maxWidth: 560, margin: '0 auto' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-sm)' }}>
                {selectedService ? `${selectedService.title} üçün sorğu` : 'Əvvəlcə yuxarıdan xidmət seç'}
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
                <label className="form-label">Telefon</label>
                <input className="form-input" name="phone" placeholder="+994 ..." value={form.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label">Qısa məlumat</label>
                <textarea className="form-textarea" name="message" placeholder="İstəyini qısaca izah et..." value={form.message} onChange={handleChange} />
              </div>

              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={!selected}
                style={{ marginTop: 'var(--space-sm)', opacity: selected ? 1 : 0.5, cursor: selected ? 'pointer' : 'not-allowed' }}
              >
                Sorğu Göndər
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}