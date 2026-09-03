import { translateCategory } from '../data/categoryTranslation'

export default function OrganizationCard({ organization, t, lang }) {
  const {
    name,
    code,
    color,
    tagline,
    rating,
    reviewCount,
    categories = [],
    activeOpportunities = 0,
    slug,
  } = organization

  const categoryLabel = categories
    .map(cat => translateCategory(cat, lang) || cat)
    .join(' · ')

  return (
    <div className="org-card">
      <div className="org-card__top">
        <div className="org-card__identity">
          <div
            className="org-card__avatar"
            style={{ backgroundColor: color || 'var(--color-primary, #1f2937)' }}
          >
            {code}
          </div>
          <div className="org-card__name">{name}</div>
        </div>

        <div className="org-card__rating-block">
          {rating != null ? (
            <>
              <div className="org-card__rating">
                {rating.toFixed(1)} / 10
              </div>
              <div className="org-card__rating-count">
                {reviewCount} {t('org_reviews_suffix') || 'qiymətləndirmə'}
              </div>
            </>
          ) : (
            <span className="org-card__badge">
              {t('org_rating_pending') || 'Rating formalaşır'}
            </span>
          )}
        </div>
      </div>

      {tagline && <p className="org-card__tagline">{tagline}</p>}

      <div className="org-card__divider" />

      {categoryLabel && (
        <div className="org-card__tags">{categoryLabel}</div>
      )}

      <div className="org-card__footer">
        <span className="org-card__count">
          {activeOpportunities} {t('org_active_opps_suffix') || 'aktiv imkan'}
        </span>

        <a className="org-card__link" href={`/teskilatlar/${slug}`}>
          {t('org_profile_link') || 'Profilə keç'} →
        </a>
      </div>
    </div>
  )
}