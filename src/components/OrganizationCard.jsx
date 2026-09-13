import { Link } from 'react-router-dom'
import { translateCategory } from '../data/categoryTranslation'

export default function OrganizationCard({
  organization,
  t,
  lang,
}) {
  const {
    name,
    tagline,
    description,
    categories = [],
    location,
    logo,
    slug,

    // Rating gələcəkdə backend-dən gələcək
    rating = null,
    reviewCount = 0,

    // Gələcəkdə opportunity-lərdən hesablanacaq
    activeOpportunities = 0,
  } = organization

  const categoryLabels = categories
    .map((category) =>
      translateCategory(category, lang) || category
    )

  return (
    <article className="org-card">

      {/* Header */}
      <div className="org-card__top">

        <div className="org-card__identity">

          <div className="org-card__avatar">
            {logo ? (
              <img
                src={logo}
                alt={`${name} logo`}
                className="org-card__logo"
              />
            ) : (
              <span>
                {name?.charAt(0)?.toUpperCase() || 'O'}
              </span>
            )}
          </div>

          <div className="org-card__name">
            {name}
          </div>

        </div>

        {/* Rating */}
        <div className="org-card__rating-block">
          {rating != null && reviewCount >= 5 ? (
            <>
              <div className="org-card__rating">
                {Number(rating).toFixed(1)} / 10
              </div>

              <div className="org-card__rating-count">
                {reviewCount}{' '}
                {t('org_reviews_suffix') ||
                  'qiymətləndirmə'}
              </div>
            </>
          ) : (
            <span className="org-card__badge">
              {t('org_rating_pending') ||
                'Rating formalaşır'}
            </span>
          )}
        </div>

      </div>

      {/* Tagline */}
      {tagline && (
        <p className="org-card__tagline">
          {tagline}
        </p>
      )}

      {/* Description */}
      {description && (
        <p className="org-card__description">
          {description}
        </p>
      )}

      <div className="org-card__divider" />

      {/* Categories */}
      {categoryLabels.length > 0 && (
        <div className="org-card__tags">
          {categoryLabels.join(' · ')}
        </div>
      )}

      {/* Location */}
      {location && (
        <div className="org-card__location">
          📍 {location}
        </div>
      )}

      {/* Footer */}
      <div className="org-card__footer">

        <span className="org-card__count">
          {activeOpportunities}{' '}
          {t('org_active_opps_suffix') ||
            'aktiv imkan'}
        </span>

        <Link
          className="org-card__link"
          to={`/teskilatlar/${slug}`}
        >
          {t('org_profile_link') ||
            'Profilə keç'}{' '}
          →
        </Link>

      </div>

    </article>
  )
}