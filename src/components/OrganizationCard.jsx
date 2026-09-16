import { Link } from 'react-router-dom'

import ecohubLogo from '../assets/images/logo/ecohub.png'
import nomadYouthLogo from '../assets/images/logo/nomad-youth.png'
import Bhos from '../assets/images/logo/bhos.jpeg'
import greenprint from '../assets/images/logo/greenprint.png'
import sosfera from '../assets/images/logo/sosfera.jpeg'
import youthsy from '../assets/images/logo/youthsy.jpeg'
import ysp from '../assets/images/logo/ysp.jpeg'

const organizationLogos = {
  'ecohub.png': ecohubLogo,
  'nomad-youth.png': nomadYouthLogo,
  'bhos.jpeg': Bhos,
  'greenprint.png': greenprint,
  'sosfera.jpeg': sosfera,
  'youthsy.jpeg': youthsy,
  'ysp.jpeg': ysp,
}

export default function OrganizationCard({
  organization,
  t,
}) {
  const {
    name,
    slug,
    tagline,
    categories = [],
    logo,
    activeOpportunities = 0,
  } = organization || {}

  const categoryLabel = category => {
    const key = `org_category_${category}`

    const translated = t(key)

    return translated !== key
      ? translated
      : category
  }

  const logoSrc = organizationLogos[logo]


  return (
    <article className="org-card">

      {/* TOP */}

      <div className="org-card__top">

        <div className="org-card__identity">

          <div className="org-card__avatar">
            {logoSrc ? (
              <img
                src={logoSrc}
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

      </div>

      <div className="org-card__about">

        <h4 className="org-card__section-title">
          {t('org_about')}
        </h4>

        <p className="org-card__tagline">
          {tagline || '—'}
        </p>

      </div>

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



