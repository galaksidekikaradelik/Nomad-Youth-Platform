import { translateCategory } from '../data/categoryTranslation'
import { t } from '../data/translations'

export default function OrganizationHero({
  name,
  tagline,
  resolvedLogo,
  activeOpportunities,
  website,
  instagram,
  linkedin,
  facebook,
  email,
  phone,
  categories,
  lang,
}) {
  const hasSocials = website || instagram || linkedin || facebook
  const hasContact = email || phone

  return (
    <>
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

          {hasSocials && (
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
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}

              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              )}
            </div>
          )}

          {hasContact && (
            <div className="organization-details__meta">
              {email && <a href={`mailto:${email}`}>{email}</a>}
              {phone && <a href={`tel:${phone}`}>{phone}</a>}
            </div>
          )}
        </div>
      </section>

      {categories.length > 0 && (
        <div className="organization-details__categories">
          {categories.map((category) => (
            <span key={category} className="organization-details__category">
              {translateCategory(category, lang) || category}
            </span>
          ))}
        </div>
      )}
    </>
  )
}
