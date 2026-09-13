import { Link } from 'react-router-dom'

export default function OrganizationCard({
  organization,
  t,
}) {
  const {
    name,
    slug,
    tagline,
    categories = [],
    location,
    logo,
    rating = null,
    reviewCount = 0,
    activeOpportunities = 0,
  } = organization || {}

  const categoryLabel = category => {
    const key = `org_category_${category}`

    const translated = t(key)

    return translated !== key
      ? translated
      : category
  }

  return (
    <article className="org-card">

      {/* TOP */}

      <div className="org-card__top">

        <div className="org-card__identity">

          <div className="org-card__avatar">
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="org-card__logo"
              />
            ) : (
              <span>
                {name?.charAt(0)?.toUpperCase()}
              </span>
            )}
          </div>

          <div className="org-card__name-wrap">
            <h3 className="org-card__name">
              {name}
            </h3>
          </div>

        </div>

        {/* RATING */}

        <div className="org-card__rating">

          {rating !== null &&
          reviewCount >= 5 ? (
            <>
              <span className="org-card__rating-star">
                ★
              </span>

              <span className="org-card__rating-value">
                {Number(rating).toFixed(1)}
              </span>

              <span className="org-card__rating-count">
                ({reviewCount})
              </span>
            </>
          ) : (
            <span className="org-card__rating-pending">
              {t('org_rating_pending')}
            </span>
          )}

        </div>

      </div>

      {/* ABOUT */}

      <div className="org-card__about">

        <h4 className="org-card__section-title">
          {t('org_about')}
        </h4>

        <p className="org-card__tagline">
          {tagline || '—'}
        </p>

      </div>

      {/* CATEGORIES */}

      {categories.length > 0 && (
        <div className="org-card__categories">
          {categories.map(category => (
            <span
              key={category}
              className={`org-card__category org-card__category--${category}`}
            >
              {categoryLabel(category)}
            </span>
          ))}
        </div>
      )}

      {/* LOCATION */}

      {location && (
        <div className="org-card__location">
          <span className="org-card__location-icon">
            📍
          </span>

          <span>
            {location}
          </span>
        </div>
      )}

      {/* BOTTOM */}

      <div className="org-card__bottom">

        <div className="org-card__active">

          <strong>
            {activeOpportunities}
          </strong>

          <span>
            {t('org_active_opportunities')}
          </span>

        </div>

        <Link
          to={`/teskilatlar/${slug}`}
          className="org-card__link"
        >
          {t('org_view_profile')}
          <span>→</span>
        </Link>

      </div>

    </article>
  )
}