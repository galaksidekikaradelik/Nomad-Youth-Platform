import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'

import raulChild from '../assets/images/team/raul-child.webp'
import raul from '../assets/images/team/raul.webp'

import gumushChild from '../assets/images/team/gumush-child.webp'
import gumush from '../assets/images/team/gumush.webp'

import shabnamChild from '../assets/images/team/shabnam-child.webp'
import shabnam from '../assets/images/team/shabnam.webp'

import aminaChild from '../assets/images/team/amina-child.webp'
import amina from '../assets/images/team/amina.webp'

import nezrinChild from '../assets/images/team/nezrin-child.webp'
import nezrin from '../assets/images/team/nezrin.webp'

import ulkerChild from '../assets/images/team/ulker-child.webp'
import ulker from '../assets/images/team/ulker.webp'

import fatimeChild from '../assets/images/team/fatime-child.webp'
import fatime from '../assets/images/team/fatime.webp'

const team = [
  {
    name: 'Raul Israfilov',
    roleKey: 'about_role_ceo',
    childhood: raulChild,
    current: raul,
  },
  {
    name: 'Gümüş Hüseynova',
    roleKey: 'about_role_dev2',
    childhood: gumushChild,
    current: gumush,
  },
  {
    name: 'Şəbnəm Osmanova',
    roleKey: 'about_role_dev1',
    childhood: shabnamChild,
    current: shabnam,
  },
  {
    name: 'Əminə Qocayeva',
    roleKey: 'about_role_comms',
    childhood: aminaChild,
    current: amina,
  },
  {
    name: 'Nəzrin Xankişiyeva',
    roleKey: 'about_role_partnership',
    childhood: nezrinChild,
    current: nezrin,
  },
  {
    name: 'Ülkər Hüseynova',
    roleKey: 'about_role_op2',
    childhood: ulkerChild,
    current: ulker,
  },

    {
    name: 'Fatimə Əkbərova',
    roleKey: 'about_role_op1',
    childhood: fatimeChild,
    current: fatime,
  },
]

export default function About() {
  const { t } = useLanguage()
  const [flippedIndex, setFlippedIndex] = useState(null) 

  const howItWorks = [
    { num: '01', titleKey: 'about_step1_title', descKey: 'about_step1_desc' },
    { num: '02', titleKey: 'about_step2_title', descKey: 'about_step2_desc' },
    { num: '03', titleKey: 'about_step3_title', descKey: 'about_step3_desc' },
  ]

  const stats = [
    { num: '50+',  labelKey: 'about_stat_opportunities' },
    { num: '10+',  labelKey: 'about_stat_services' },
    { num: '7/24', labelKey: 'about_stat_available' },
    { num: '10+',    labelKey: 'about_stat_category' },
  ]

  return (
    <div className="section">
      <div className="container">

        <div className="page-header">
          <div className="page-header__eyebrow">{t('about_eyebrow')}</div>
          <h1 className="page-header__title">{t('about_title')}</h1>
          <p className="page-header__desc">{t('about_desc')}</p>
        </div>

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

        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="section-heading">
            <div className="section-heading__eyebrow">{t('about_how_eyebrow')}</div>
            <h2 className="section-heading__title">{t('about_how_title')}</h2>
          </div>
          <div className="about-values">
            {howItWorks.map(step => (
              <div key={step.num} className="value-card">
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '4.5rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    color: 'var(--accent-400)',
                    opacity: 0.55,
                    marginBottom: 'var(--space-sm)',
                    userSelect: 'none',
                  }}
                >
                  {step.num}
                </div>
                <div className="value-card__title" style={{ position: 'relative', zIndex: 1 }}>
                  {t(step.titleKey)}
                </div>
                <p className="value-card__desc">{t(step.descKey)}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="section-heading">
            <div className="section-heading__eyebrow">{t('about_team_eyebrow')}</div>
            <h2 className="section-heading__title">{t('about_team_title')}</h2>
          </div>
          <div className="grid-4">
            {team.map((m, i) => (
              <div
                key={m.name}
                className={`flip-card ${flippedIndex === i ? 'is-flipped' : ''}`}
                onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
                tabIndex={0}
                role="button"
                aria-pressed={flippedIndex === i}
                aria-label={m.name}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setFlippedIndex(flippedIndex === i ? null : i)
                  }
                }}
              >
                <div className="flip-card__inner">

                  <div className="flip-card__face flip-card__front">
                    <img src={m.childhood} alt={m.name} className="flip-card__img" />
                  </div>

                  <div className="flip-card__face flip-card__back">
                    <img src={m.current} alt={m.name} className="flip-card__img" />
                    <div className="flip-card__info">
                      <div className="flip-card__name">{m.name}</div>
                      <div className="flip-card__role">{t(m.roleKey)}</div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

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