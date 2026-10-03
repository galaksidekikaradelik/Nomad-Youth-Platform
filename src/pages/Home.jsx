import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import MembershipHero from '../components/MembershipHero'
import Hero from '../components/Hero'

import OpportunityCard from '../components/OpportunityCard'
import { OpportunitySkeletonGrid } from '../components/OpportunitySkeleton'

import { useOpportunities } from '../hooks/useOpportunities'
import { filterActiveOpportunities } from '../utils/opportunityStatus'
import { useLanguage } from '../hooks/useLanguage'

import { SERVICE_CONTENT } from '../data/services'

import aboutImg from '../assets/about.web'


const HOME_SERVICES = [
  {
    id: 'application',
    title: 'Erasmus+ Müraciət Dəstəyi',
    category: 'erasmus',
  },
  {
    id: 'erasmus-mundus',
    title: 'Erasmus Mundus / Xaricdə Təhsil',
    category: 'abroad',
  },
  {
    id: 'erasmus-membership',
    title: 'Erasmus+ Üzvlük və Təşkilati Dəstək',
    category: 'membership',
  },
]


const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
)


const WarningTriangleIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)


export default function Home() {
  const { t } = useLanguage()

  const {
    opportunities,
    loading,
    error,
  } = useOpportunities()


  const preview = useMemo(
    () =>
      filterActiveOpportunities(opportunities).slice(0, 6),
    [opportunities]
  )


  const homeServices = HOME_SERVICES
    .map((item) => ({
      ...item,
      service: SERVICE_CONTENT[item.id],
    }))
    .filter((item) => item.service)


  return (
    <>
      <MembershipHero />

      {/* =====================================================
          OPPORTUNITIES
      ====================================================== */}

      <section
        className="section"
        id="opportunities"
      >
        <div className="container">

          <div
            className="section-heading"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
            }}
          >

            <div>

              <div className="section-heading__eyebrow">
                {t('opportunities_eyebrow')}
              </div>

              <h2 className="section-heading__title">
                {t('opportunities_title')}
              </h2>

              <p className="section-heading__desc">
                {t('opportunities_desc')}
              </p>

            </div>


            <Link
              to="/opportunities"
              className="btn-outline"
            >
              {t('opportunities_see_all')}
              <ArrowIcon />
            </Link>

          </div>


          {loading && (
            <OpportunitySkeletonGrid
              count={6}
              gridClassName="grid-3"
            />
          )}


          {!loading && error && (
            <div className="empty-state">

              <div
                className="empty-state__icon"
                style={{
                  color:
                    'var(--color-warning, #f59e0b)',
                }}
              >
                <WarningTriangleIcon />
              </div>

              <div className="empty-state__title">
                {t('opp_error') ||
                  'Elanları yükləmək mümkün olmadı.'}
              </div>

            </div>
          )}


          {!loading && !error && (
            <div className="grid-3">

              {preview.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}

            </div>
          )}

        </div>
      </section>


      {/* =====================================================
          HERO
      ====================================================== */}

      <Hero />


      {/* =====================================================
          ABOUT
      ====================================================== */}

      <section className="section home-about-section">

        <div className="container">

          <div className="home-about">

            <div className="home-about__content">

              <div className="section-heading__eyebrow">
                HAQQIMIZDA
              </div>


              <h2 className="section-heading__title">
                Gənclər üçün imkanları
                <br />
                <span>
                  bir yerə toplayırıq.
                </span>
              </h2>


              <p className="section-heading__desc">
                Nomad Youth gənclərin beynəlxalq imkanlara
                çıxışını asanlaşdırmaq üçün yaradılmış
                platformadır.
              </p>


              <p className="section-heading__desc">
                Erasmus+, ESC, təlimlər, könüllülük proqramları,
                mübadilələr və digər inkişaf imkanlarını daha
                əlçatan şəkildə təqdim edirik.
              </p>


              <p className="section-heading__desc">
                Məqsədimiz gənclərin uyğun imkanları daha rahat
                tapmasına, müraciət etməsinə və beynəlxalq
                təcrübə qazanmasına dəstək olmaqdır.
              </p>


              <Link
                to="/about"
                className="btn-outline"
              >
                Haqqımızda daha çox
                <ArrowIcon />
              </Link>

            </div>


            <div className="home-about__visual">

              <div className="home-about__image-frame">

                <img
                  src={aboutImg}
                  alt="Nomad Youth komandası"
                  className="home-about__image"
                />

              </div>


              <div
                className="
                  home-about__accent
                  home-about__accent--top
                "
              />


              <div
                className="
                  home-about__accent
                  home-about__accent--bottom
                "
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ====================================================== */}

      <section className="section home-services-section">

        <div className="container">

          <div className="section-heading">

            <div className="section-heading__eyebrow">
              XİDMƏTLƏRİMİZ
            </div>


            <h2 className="section-heading__title">
              Sizə necə dəstək ola bilərik?
            </h2>


            <p className="section-heading__desc">
              Nomad Youth olaraq gənclərin beynəlxalq
              imkanlardan daha rahat yararlanması üçün
              müxtəlif istiqamətlərdə praktik dəstək
              təqdim edirik.
            </p>

          </div>


          <div className="grid-3 home-services-grid">

            {homeServices.map((item, index) => {

              const service = item.service
              const Icon = service.icon

              const serviceLink =
                `/services?category=${item.category}`


              return (
                <Link
                  key={item.id}
                  to={serviceLink}
                  className="home-service-card"
                >

                  <div className="home-service-card__content">

                    <div className="home-service-card__number">
                      {String(index + 1).padStart(2, '0')}
                    </div>


                    {Icon && (
                      <div className="home-service-card__icon">

                        <Icon
                          size={26}
                          strokeWidth={1.8}
                        />

                      </div>
                    )}


                    <h3>
                      {item.title}
                    </h3>


                    <p>
                      {service.shortDesc}
                    </p>


                    <span>
                      Ətraflı bax
                      <ArrowIcon />
                    </span>

                  </div>

                </Link>
              )
            })}

          </div>


          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 'var(--space-xl)',
            }}
          >

            <Link
              to="/services"
              className="btn-outline"
            >
              Bütün xidmətlərə bax
              <ArrowIcon />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          PARTNERSHIP
      ====================================================== */}

      <section className="section home-partnership-section">

        <div className="container">

          <div className="home-partnership">

            <div className="home-partnership__content">

              <h2 className="section-heading__title">
                Gənclər üçün
                <br />
                <span>
                  daha çox imkan yaradaq.
                </span>
              </h2>


              <p className="home-partnership__desc">
                Layihənizi, proqramınızı və ya təşəbbüsünüzü
                Nomad Youth icması ilə paylaşın. Birlikdə daha
                çox gəncə çata və yeni imkanlar yarada bilərik.
              </p>


              <Link
                to="/contact"
                className="btn-primary"
              >
                Tərəfdaşlıq üçün müraciət et
                <ArrowIcon />
              </Link>

            </div>


            <div className="home-partnership__visual">
            </div>

          </div>

        </div>

      </section>

    </>
  )
}