import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { translateCategory } from '../data/categoryTranslation'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export default function OrganizationDetails() {
  const { slug } = useParams()

  const [organization, setOrganization] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Hələlik AZ
  const lang = 'az'

  const t = (key) => {
    const translations = {
      org_not_found: 'Təşkilat tapılmadı',
      back_to_opportunities: 'İmkanlara qayıt',
      org_reviews_suffix: 'qiymətləndirmə',
      org_active_opps_suffix: 'aktiv imkan',
      org_about_title: 'Haqqında',
      org_opportunities_title: 'Aktiv imkanlar',
      org_contact_title: 'Əlaqə',
      org_rating_pending: 'Rating formalaşır',
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
          <h1>
            Təşkilatı yükləmək mümkün olmadı
          </h1>

          <Link to="/opportunities">
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
          <h1>
            {t('org_not_found')}
          </h1>

          <Link to="/opportunities">
            ← {t('back_to_opportunities')}
          </Link>
        </div>
      </main>
    )
  }

  const {
    name,
    slug: organizationSlug,
    tagline,
    description,
    categories = [],
    website,
    instagram,
    facebook,
    email,
    location,
    logo,

    // gələcək rating sistemi
    rating = null,
    reviewCount = 0,

    // gələcəkdə backend-dən gələcək
    activeOpportunities = 0,
  } = organization

  return (
    <main className="organization-details">

      <div className="organization-details__container">

        {/* Back */}
        <Link
          to="/opportunities"
          className="organization-details__back"
        >
          ← {t('back_to_opportunities')}
        </Link>

        {/* Header */}
        <section className="organization-details__hero">

          <div className="organization-details__avatar">

            {logo ? (
              <img
                src={logo}
                alt={`${name} logo`}
                className="organization-details__logo"
              />
            ) : (
              <span>
                {name?.charAt(0)?.toUpperCase() || 'O'}
              </span>
            )}

          </div>

          <div className="organization-details__identity">

            <h1>{name}</h1>

            {tagline && (
              <p className="organization-details__tagline">
                {tagline}
              </p>
            )}

            <div className="organization-details__meta">

              {rating != null && reviewCount >= 5 && (
                <span>
                  ★ {Number(rating).toFixed(1)} / 10
                </span>
              )}

              {reviewCount > 0 && (
                <span>
                  {reviewCount}{' '}
                  {t('org_reviews_suffix')}
                </span>
              )}

              {activeOpportunities > 0 && (
                <span>
                  {activeOpportunities}{' '}
                  {t('org_active_opps_suffix')}
                </span>
              )}

            </div>

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
                {translateCategory(category, lang) ||
                  category}
              </span>
            ))}

          </div>
        )}

        {/* Main */}
        <div className="organization-details__layout">

          <div className="organization-details__main">

            {/* About */}
            <section className="organization-details__section">

              <h2>
                {t('org_about_title')}
              </h2>

              <p>
                {description ||
                  'Bu təşkilat haqqında məlumat yoxdur.'}
              </p>

            </section>

            {/* Opportunities */}
            <section className="organization-details__section">

              <h2>
                {t('org_opportunities_title')}
              </h2>

              {activeOpportunities > 0 ? (
                <p>
                  {activeOpportunities} aktiv imkan
                  mövcuddur.
                </p>
              ) : (
                <div className="organization-details__empty">
                  <p>
                    Hazırda aktiv imkan yoxdur.
                  </p>
                </div>
              )}

            </section>

          </div>

          {/* Contact */}
          <aside className="organization-details__sidebar">

            <div className="organization-details__contact">

              <h3>
                {t('org_contact_title')}
              </h3>

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

              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="organization-details__contact-item"
                >
                  <span>◎</span>
                  <span>Instagram</span>
                </a>
              )}

              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="organization-details__contact-item"
                >
                  <span>f</span>
                  <span>Facebook</span>
                </a>
              )}

            </div>

          </aside>

        </div>

      </div>

    </main>
  )
}