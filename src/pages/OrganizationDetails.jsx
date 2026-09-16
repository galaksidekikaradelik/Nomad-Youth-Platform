import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { translateCategory } from '../data/categoryTranslation'
import { getEventImages } from '../data/organizationEventImages'
import { organizationLogos } from '../data/organizationLogos'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const TABS = {
  ACTIVE: 'active',
  PAST: 'past',
  ABOUT: 'about',
}

export default function OrganizationDetails() {
  const { slug } = useParams()

  const [organization, setOrganization] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState(TABS.ACTIVE)

  // Şəkil lightbox-u: hansı qalereyaya baxılır (images) və hansı indexdə
  const [lightbox, setLightbox] = useState(null) // { images: string[], index: number } | null

  const openLightbox = useCallback((images, index) => {
    setLightbox({ images, index })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  const showPrevImage = useCallback((e) => {
    e.stopPropagation()

    setLightbox((current) => {
      if (!current) return current

      const total = current.images.length

      return {
        ...current,
        index: (current.index - 1 + total) % total,
      }
    })
  }, [])

  const showNextImage = useCallback((e) => {
    e.stopPropagation()

    setLightbox((current) => {
      if (!current) return current


      return {
        ...current,
        index: (current.index + 1) % current.images.length,
      }
    })
  }, [])

  useEffect(() => {
    if (!lightbox) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrevImage(e)
      if (e.key === 'ArrowRight') showNextImage(e)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightbox, closeLightbox, showPrevImage, showNextImage])

  // Hələlik AZ
  const lang = 'az'

  const t = (key) => {
    const translations = {
      org_not_found: 'Təşkilat tapılmadı',
      back_to_opportunities: 'İmkanlara qayıt',
      org_active_opps_suffix: 'aktiv imkan',
      org_about_title: 'Haqqında',
      org_opportunities_tab: 'Aktiv imkanlar',
      org_past_tab: 'Keçmiş layihələr',
      org_contact_title: 'Əlaqə',
      org_no_active: 'Hazırda aktiv imkan yoxdur.',
      org_no_past: 'Hələ tamamlanmış layihə yoxdur.',
      org_event_photos: 'Tədbir şəkilləri',
      org_see_more: 'Ətraflı bax',
      org_apply: 'Müraciət et',
      org_deadline: 'Son tarix',
      org_active_line: 'aktiv imkan',
      org_completed_sub: 'tamamlanmış layihə',
      org_participants_sub: 'iştirakçı',
    }

    return translations[key] || key
  }

  useEffect(() => {
    let cancelled = false

    const fetchOrganization = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${API_URL}/organizations/${slug}`
        )

        if (response.status === 404) {
          if (!cancelled) {
            setOrganization(null)
          }

          return
        }

        if (!response.ok) {
          throw new Error(
            `Organization request failed: ${response.status}`
          )
        }

        const data = await response.json()

        if (!cancelled) {
          setOrganization(data)
        }
      } catch (err) {
        if (!cancelled) {
          console.error(
            'Failed to fetch organization:',
            err
          )

          setError(err)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchOrganization()

    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <main className="organization-details">
        <div className="organization-details__container">
          <p>Yüklənir...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="organization-details">
        <div className="organization-details__container">
          <h1>Təşkilatı yükləmək mümkün olmadı</h1>

          <Link to="/opportunities" className="organization-details__back">
            ← {t('back_to_opportunities')}
          </Link>
        </div>
      </main>
    )
  }

  if (!organization) {
    return (
      <main className="organization-details">
        <div className="organization-details__container">
          <h1>{t('org_not_found')}</h1>

          <Link to="/opportunities" className="organization-details__back">
            ← {t('back_to_opportunities')}
          </Link>
        </div>
      </main>
    )
  }

  const {
    name,
    tagline,
    description,
    categories = [],
    website,
    instagram,
    facebook,
    linkedin,
    email,
    phone,
    location,
    logo,

    // gələcəkdə backend-dən gələcək
    opportunities = [],
    pastProjects = [],
    activityHistory = [],
  } = organization

  const activeOpportunities = opportunities.length

  // Backend logo sahəsini bəzən tam URL, bəzən sadəcə fayl adı
  // (məs. 'ecohub.png') kimi qaytarır. organizationLogos map-i faylı
  // tanıyırsa bundle olunmuş şəkli istifadə edir, tanımırsa (artıq
  // tam URL-dirsə və ya map-də yoxdursa) olduğu kimi saxlayır.
  const resolvedLogo = logo
    ? organizationLogos[logo] || logo
    : null

  return (
    <main className="organization-details">
      <div className="organization-details__container">
        {/* Back */}
        <Link to="/opportunities" className="organization-details__back">
          ← {t('back_to_opportunities')}
        </Link>

        {/* Header */}
        <section className="organization-details__hero">
          <div className="organization-details__avatar">
            {resolvedLogo ? (
              <img
                src={resolvedLogo}
                alt={`${name} logo`}
                className="organization-details__logo"
              />
            ) : (
              <span>{name?.charAt(0)?.toUpperCase() || 'O'}</span>
            )}
          </div>

          <div className="organization-details__identity">
            <h1>{name}</h1>

            {tagline && (
              <p className="organization-details__tagline">{tagline}</p>
            )}

            {activeOpportunities > 0 && (
              <div className="organization-details__meta">
                <span>
                  {activeOpportunities} {t('org_active_opps_suffix')}
                </span>
              </div>
            )}

            {(website || instagram || linkedin || facebook) && (
              <div className="organization-details__meta">
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {website.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                )}
              </div>
            )}

            {(email || phone) && (
              <div className="organization-details__meta">
                {email && <a href={`mailto:${email}`}>{email}</a>}
                {phone && <a href={`tel:${phone}`}>{phone}</a>}
              </div>
            )}
          </div>
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="organization-details__categories">
            {categories.map((category) => (
              <span
                key={category}
                className="organization-details__category"
              >
                {translateCategory(category, lang) || category}
              </span>
            ))}
          </div>
        )}

        {/* Tabs */}
        <nav className="organization-details__tabs">
          <button
            type="button"
            className={
              activeTab === TABS.ACTIVE
                ? 'organization-details__tab organization-details__tab--active'
                : 'organization-details__tab'
            }
            onClick={() => setActiveTab(TABS.ACTIVE)}
          >
            {t('org_opportunities_tab')}
          </button>

          <button
            type="button"
            className={
              activeTab === TABS.PAST
                ? 'organization-details__tab organization-details__tab--active'
                : 'organization-details__tab'
            }
            onClick={() => setActiveTab(TABS.PAST)}
          >
            {t('org_past_tab')}
          </button>

          <button
            type="button"
            className={
              activeTab === TABS.ABOUT
                ? 'organization-details__tab organization-details__tab--active'
                : 'organization-details__tab'
            }
            onClick={() => setActiveTab(TABS.ABOUT)}
          >
            {t('org_about_title')}
          </button>
        </nav>

        {/* Active opportunities */}
        {activeTab === TABS.ACTIVE &&
          (activeOpportunities > 0 ? (
            <div className="organization-details__opportunities">
              {opportunities.map((opp) => (
                <div
                  key={opp.id ?? opp.slug}
                  className="organization-details__opportunity-card"
                >
                  {opp.category && (
                    <span className="organization-details__opportunity-badge">
                      {translateCategory(opp.category, lang) ||
                        opp.category}
                    </span>
                  )}

                  <h3 className="organization-details__opportunity-title">
                    {opp.title}
                  </h3>

                  <div className="organization-details__opportunity-footer">
                    {opp.deadline && (
                      <span>
                        {t('org_deadline')}: {opp.deadline}
                      </span>
                    )}

                    {opp.applicationUrl ? (
                      <a
                        href={opp.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="organization-details__opportunity-link"
                      >
                        {t('org_apply')} →
                      </a>
                    ) : (
                      <Link
                        to={`/opportunities/${opp.slug}`}
                        className="organization-details__opportunity-link"
                      >
                        {t('org_see_more')} →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="organization-details__empty">
              <p>{t('org_no_active')}</p>
            </div>
          ))}

        {/* Past projects */}
        {activeTab === TABS.PAST &&
          (pastProjects.length > 0 ? (
            <div className="organization-details__opportunities">
              {pastProjects.map((project) => {
                // project.images: string[] (tədbirdən bir neçə şəkil)
                // project.image: string (tək cover şəkil, images yoxdursa)
                const images =
                  project.images?.length > 0
                    ? project.images
                    : project.image
                    ? [project.image]
                    : getEventImages(slug, project.slug)

                const visibleImages = images.slice(0, 3)
                const extraCount = images.length - visibleImages.length

                return (
                  <div
                    key={project.id ?? project.slug}
                    className="organization-details__opportunity-card"
                  >
                    {images.length > 0 ? (
                      <div className="organization-details__project-gallery">
                        {visibleImages.map((src, index) => (
                          <button
                            key={src}
                            type="button"
                            className="organization-details__project-gallery-item"
                            onClick={() => openLightbox(images, index)}
                          >
                            <img src={src} alt={`${project.title} ${index + 1}`} />

                            {extraCount > 0 &&
                              index === visibleImages.length - 1 && (
                                <span className="organization-details__project-gallery-more">
                                  +{extraCount}
                                </span>
                              )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="organization-details__project-gallery organization-details__project-gallery--empty">
                        <span>📷</span>
                      </div>
                    )}

                    <h3 className="organization-details__opportunity-title">
                      {project.title}
                    </h3>

                    {project.summary && (
                      <p className="organization-details__project-summary">
                        {project.summary}
                      </p>
                    )}

                    {(project.date || project.participantsCount != null) && (
                      <div className="organization-details__opportunity-footer">
                        {project.date && <span>{project.date}</span>}

                        {project.participantsCount != null && (
                          <span>
                            {project.participantsCount}{' '}
                            {t('org_participants_sub')}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            (() => {
              // Backend hələ pastProjects qaytarmır. Bu təşkilatın local
              // tedbirler qovluğunda şəkil varsa, kiçik kartlar kimi göstər.
              const generalImages = getEventImages(slug)

              if (generalImages.length === 0) {
                return (
                  <div className="organization-details__empty">
                    <p>{t('org_no_past')}</p>
                  </div>
                )
              }

              return (
                <div className="organization-details__photo-grid">
                  {generalImages.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      className="organization-details__photo-card"
                      onClick={() => openLightbox(generalImages, index)}
                    >
                      <img src={src} alt={`${name} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )
            })()
          ))}

        {/* About */}
        {activeTab === TABS.ABOUT && (
          <section className="organization-details__section">
            <h2 className="organization-details__heading">
              {t('org_about_title')}
            </h2>

            <p>{description || 'Bu təşkilat haqqında məlumat yoxdur.'}</p>

            <div className="organization-details__contact">
              <h3>{t('org_contact_title')}</h3>

              {location && (
                <div className="organization-details__contact-item">
                  <span>📍</span>
                  <span>{location}</span>
                </div>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="organization-details__contact-item"
                >
                  <span>✉</span>
                  <span>{email}</span>
                </a>
              )}

              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="organization-details__contact-item"
                >
                  <span>☎</span>
                  <span>{phone}</span>
                </a>
              )}

              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="organization-details__contact-item"
                >
                  <span>🌐</span>
                  <span>Website</span>
                </a>
              )}
            </div>
          </section>
        )}

        {/* Activity history */}
        {activityHistory.length > 0 && (
          <section className="organization-details__history">
            {activityHistory.map((year) => (
              <div
                key={year.year}
                className="organization-details__history-item"
              >
                <p className="organization-details__history-year">
                  {year.year}
                </p>

                <p className="organization-details__history-line">
                  {year.activeCount ?? year.projectsCount}{' '}
                  {t('org_active_line')}
                </p>

                {year.completedCount != null && (
                  <p className="organization-details__history-sub">
                    {year.completedCount} {t('org_completed_sub')}
                  </p>
                )}

                {year.participantsCount != null && (
                  <p className="organization-details__history-sub">
                    {year.participantsCount} {t('org_participants_sub')}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Şəkil lightbox */}
      {lightbox && (
        <div
          className="organization-details__lightbox"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="organization-details__lightbox-close"
            onClick={closeLightbox}
            aria-label="Bağla"
          >
            ✕
          </button>

          {lightbox.images.length > 1 && (
            <button
              type="button"
              className="organization-details__lightbox-nav organization-details__lightbox-nav--prev"
              onClick={showPrevImage}
              aria-label="Əvvəlki şəkil"
            >
              ‹
            </button>
          )}

          <img
            src={lightbox.images[lightbox.index]}
            alt={`Şəkil ${lightbox.index + 1}`}
            className="organization-details__lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox.images.length > 1 && (
            <button
              type="button"
              className="organization-details__lightbox-nav organization-details__lightbox-nav--next"
              onClick={showNextImage}
              aria-label="Növbəti şəkil"
            >
              ›
            </button>
          )}

          {lightbox.images.length > 1 && (
            <span className="organization-details__lightbox-counter">
              {lightbox.index + 1} / {lightbox.images.length}
            </span>
          )}
        </div>
      )}
    </main>
  )
}