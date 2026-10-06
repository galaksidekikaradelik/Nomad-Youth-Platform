import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Search,
  MessageCircleMore,
  GraduationCap,
  UsersRound,
  FileText,
  BriefcaseBusiness,
  Handshake,
  Send,
  Crown,
  BadgeCheck,
  Gift,
  ArrowRight,
} from 'lucide-react'

import { useLanguage } from '../hooks/useLanguage'

import worldMap from '../assets/images/world-map.webp'
import partnershipImage from '../assets/images/erasmus.webp'
import cardBack from '../assets/images/kart.webp'

import raul from '../assets/images/team/raul.webp'
import gumush from '../assets/images/team/gumush.webp'
import shabnam from '../assets/images/team/shabnam.webp'
import amina from '../assets/images/team/amina.webp'
import nezrin from '../assets/images/team/nezrin.webp'
import ulker from '../assets/images/team/ulker.webp'
import fatime from '../assets/images/team/fatima.webp'


const team = [
  { name: 'Raul Israfilov', roleKey: 'about_role_ceo', current: raul },
  { name: 'Gümüş Hüseynova', roleKey: 'about_role_dev2', current: gumush },
  { name: 'Şəbnəm Osmanova', roleKey: 'about_role_dev1', current: shabnam },
  { name: 'Əminə Qocayeva', roleKey: 'about_role_comms', current: amina },
  { name: 'Nəzrin Xankişiyeva', roleKey: 'about_role_partnership', current: nezrin },
  { name: 'Ülkər Hüseynova', roleKey: 'about_role_op2', current: ulker },
  { name: 'Fatimə Əkbərova', roleKey: 'about_role_op1', current: fatime },
]


export default function About() {
  const { t } = useLanguage()

  const [flippedIndex, setFlippedIndex] = useState(null)

  const toggleCard = index => {
    setFlippedIndex(flippedIndex === index ? null : index)
  }


  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    elements.forEach(element => observer.observe(element))

    return () => observer.disconnect()
  }, [])


  const aboutFeatures = [
    {
      icon: Search,
      titleKey: 'about_feature_opportunities_title',
      descKey: 'about_feature_opportunities_desc',
      variant: 'blue',
    },
    {
      icon: MessageCircleMore,
      titleKey: 'about_feature_support_title',
      descKey: 'about_feature_support_desc',
      variant: 'red',
    },
    {
      icon: GraduationCap,
      titleKey: 'about_feature_education_title',
      descKey: 'about_feature_education_desc',
      variant: 'green',
    },
    {
      icon: UsersRound,
      titleKey: 'about_feature_partnerships_title',
      descKey: 'about_feature_partnerships_desc',
      variant: 'orange',
    },
  ]


  /* STATS */

  const stats = [
    { num: '50+', labelKey: 'about_stat_opportunities', icon: FileText, variant: 'blue' },
    { num: '15+', labelKey: 'about_stat_services', icon: BriefcaseBusiness, variant: 'yellow' },
    { num: '10+', labelKey: 'about_stat_partners', icon: Handshake, variant: 'green' },
    { num: '200+', labelKey: 'about_stat_users', icon: UsersRound, variant: 'lightblue' },
  ]


  /* HOW IT WORKS */

  const howItWorks = [
    { num: '01', icon: Search, titleKey: 'about_step1_title', descKey: 'about_step1_desc', variant: 'blue' },
    { num: '02', icon: MessageCircleMore, titleKey: 'about_step2_title', descKey: 'about_step2_desc', variant: 'red' },
    { num: '03', icon: UsersRound, titleKey: 'about_step3_title', descKey: 'about_step3_desc', variant: 'green' },
    { num: '04', icon: Send, titleKey: 'about_step4_title', descKey: 'about_step4_desc', variant: 'orange' },
  ]


  /* MEMBERSHIP BENEFITS */

  const membershipBenefits = [
    { icon: UsersRound, titleKey: 'about_membership_benefit_pool' },
    { icon: BadgeCheck, titleKey: 'about_membership_benefit_support' },
    { icon: Gift, titleKey: 'about_membership_benefit_privileges' },
  ]


  return (
    <div className="section about-page">
      <div className="container">

        {/* =====================================================
            INTRO
        ====================================================== */}

        <section className="about-intro reveal-section" data-reveal>

          <div className="about-intro__heading">

            <div className="section-heading__eyebrow">
              {t('about_intro_eyebrow')}
            </div>

            <h1 className="about-intro__title">
              {t('about_intro_title')}
            </h1>

            <p className="about-intro__desc">
              {t('about_intro_desc')}
            </p>

          </div>


          <div className="about-feature-grid">

            {aboutFeatures.map((feature, index) => {
              const Icon = feature.icon

              return (
                <div
                  key={feature.titleKey}
                  className={`about-feature-card about-feature-card--${feature.variant} reveal-item`}
                  style={{ '--reveal-delay': `${index * 90}ms` }}
                >

                  <div className="about-feature-card__icon">
                    <Icon size={34} strokeWidth={2.1} />
                  </div>

                  <h3 className="about-feature-card__title">
                    {t(feature.titleKey)}
                  </h3>

                  <p className="about-feature-card__desc">
                    {t(feature.descKey)}
                  </p>

                </div>
              )
            })}

          </div>

        </section>


        {/* =====================================================
            STATS
        ====================================================== */}

        <section
          className="about-stats reveal-section"
          data-reveal
          style={{ '--stats-map': `url(${worldMap})` }}
        >

          <div className="about-stats__heading">

            <div className="about-stats__eyebrow">
              {t('about_stats_eyebrow')}
            </div>

            <h2 className="about-stats__title">
              {t('about_stats_title')}
            </h2>

          </div>


          <div className="about-stats__grid">

            {stats.map((stat, index) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.labelKey}
                  className="about-stat reveal-item"
                  style={{ '--reveal-delay': `${index * 100}ms` }}
                >

                  <div className={`about-stat__icon about-stat__icon--${stat.variant}`}>
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <div className="about-stat__content">

                    <div className="about-stat__number">
                      {stat.num}
                    </div>

                    <div className="about-stat__label">
                      {t(stat.labelKey)}
                    </div>

                  </div>

                </div>
              )
            })}

          </div>

        </section>


        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}

        <section className="about-how reveal-section" data-reveal>

          <div className="section-heading">

            <div className="section-heading__eyebrow">
              {t('about_how_eyebrow')}
            </div>

            <h2 className="section-heading__title">
              {t('about_how_title')}
            </h2>

          </div>


          <div className="about-steps">

            {howItWorks.map((step, index) => {
              const Icon = step.icon

              return (
                <div
                  key={step.num}
                  className="about-step-wrap reveal-item"
                  style={{ '--reveal-delay': `${index * 110}ms` }}
                >

                  <div className={`about-step-card about-step-card--${step.variant}`}>

                    <div className={`about-step-card__number about-step-card__number--${step.variant}`}>
                      {step.num}
                    </div>

                    <div className={`about-step-card__icon about-step-card__icon--${step.variant}`}>
                      <Icon size={38} strokeWidth={2} />
                    </div>

                    <h3 className="about-step-card__title">
                      {t(step.titleKey)}
                    </h3>

                    <p className="about-step-card__desc">
                      {t(step.descKey)}
                    </p>

                  </div>


                  {index < howItWorks.length - 1 && (
                    <div className="about-step-arrow">
                      →
                    </div>
                  )}

                </div>
              )
            })}

          </div>

        </section>


        {/* =====================================================
            GROWTH + MEMBERSHIP
        ====================================================== */}

        <section className="about-membership-section reveal-section" data-reveal>

          <div className="about-membership-grid">

            {/* INTERNATIONAL GROWTH */}

            <div
              className="about-growth-card reveal-item"
              style={{ '--reveal-delay': '0ms' }}
            >

              <div className="about-growth-card__content">

                <div className="about-growth-card__eyebrow">
                  {t('about_growth_eyebrow')}
                </div>

                <h2 className="about-growth-card__title">
                  {t('about_growth_title')}
                </h2>

                <p className="about-growth-card__desc">
                  {t('about_growth_desc')}
                </p>

                <Link to="/services" className="about-growth-card__btn">
                  <span>{t('about_growth_cta')}</span>
                  <ArrowRight size={18} strokeWidth={2} />
                </Link>

              </div>


              <div className="about-growth-card__media">

                <img
                  src={partnershipImage}
                  alt={t('about_growth_image_alt')}
                  className="about-growth-card__img"
                />

              </div>

            </div>


            {/* MEMBERSHIP */}

            <div
              className="about-membership-card reveal-item"
              style={{ '--reveal-delay': '130ms' }}
            >

              <div className="about-membership-card__top">

                <div className="about-membership-card__crown">
                  <Crown size={22} strokeWidth={2} />
                </div>

                <div>

                  <h3 className="about-membership-card__title">
                    {t('about_membership_title')}
                  </h3>

                  <p className="about-membership-card__desc">
                    {t('about_membership_desc')}
                  </p>

                </div>

              </div>


              <div className="about-membership-card__highlight">

                <span className="about-membership-card__highlight-number">
                  {t('about_membership_duration_number')}
                </span>

                <span className="about-membership-card__highlight-text">
                  {t('about_membership_duration_text')}
                </span>

              </div>


              <div className="about-membership-card__benefits">

                {membershipBenefits.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.titleKey}
                      className="about-membership-card__benefit"
                      style={{ '--benefit-delay': `${index * 70}ms` }}
                    >

                      <div className="about-membership-card__benefit-icon">
                        <Icon size={20} strokeWidth={2} />
                      </div>

                      <div className="about-membership-card__benefit-text">
                        {t(item.titleKey)}
                      </div>

                    </div>
                  )
                })}

              </div>


              <div className="about-membership-card__footer">

                <div className="about-membership-card__footer-note">
                  Erasmus+ imkanlarından daha sistemli yararlan.
                </div>

                <Link to="/services" className="about-membership-card__btn">
                  <span>{t('about_membership_cta')}</span>
                  <ArrowRight size={18} strokeWidth={2} />
                </Link>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            TEAM
        ====================================================== */}

        <section className="about-team reveal-section" data-reveal>

          <div className="section-heading">

            <div className="section-heading__eyebrow">
              {t('about_team_eyebrow')}
            </div>

            <h2 className="section-heading__title">
              {t('about_team_title')}
            </h2>

          </div>


          <div className="grid-4">

            {team.map((member, index) => (

              <div
                key={member.name}
                className={`flip-card reveal-item ${flippedIndex === index ? 'is-flipped' : ''}`}
                style={{ '--reveal-delay': `${index * 80}ms` }}
                onClick={() => toggleCard(index)}
                tabIndex={0}
                role="button"
                aria-pressed={flippedIndex === index}
                aria-label={member.name}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    toggleCard(index)
                  }
                }}
              >

                <div className="flip-card__inner">

                  {/* FRONT */}

                  <div className="flip-card__face flip-card__front">

                    <img
                      src={member.current}
                      alt={member.name}
                      className="flip-card__img"
                    />

                  </div>


                  {/* BACK — poster background + name + role */}

                  <div
                    className="flip-card__face flip-card__back"
                    style={{ backgroundImage: `url(${cardBack})` }}
                  >

                    <div className="flip-card__info">

                      <div className="flip-card__name">
                        {member.name}
                      </div>

                      <div className="flip-card__role">
                        {t(member.roleKey)}
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =====================================================
            CTA
        ====================================================== */}

        <div className="cta-banner reveal-section" data-reveal>

          <div className="cta-banner__content">

            <h2 className="cta-banner__title">
              {t('about_cta_title')}
            </h2>

            <p className="cta-banner__desc">
              {t('about_cta_desc')}
            </p>

          </div>


          <div className="cta-banner__actions">

            <Link to="/contact" className="btn-primary">
              {t('about_cta_contact')}
            </Link>

            <Link to="/opportunities" className="btn-outline">
              {t('about_cta_opportunities')}
            </Link>

          </div>

        </div>

      </div>
    </div>
  )
}