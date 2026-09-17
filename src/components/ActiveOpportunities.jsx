import { Link } from 'react-router-dom'

import { translateCategory } from '../../data/categoryTranslation'
import { t } from '../../data/translations'

export default function ActiveOpportunities({ opportunities, lang }) {
  if (opportunities.length === 0) return null

  return (
    <div className="organization-details__opportunities">
      {opportunities.map((opp) => (
        <div
          key={opp.id ?? opp.slug}
          className="organization-details__opportunity-card"
        >
          {opp.category && (
            <span className="organization-details__opportunity-badge">
              {translateCategory(opp.category, lang) || opp.category}
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
  )
}
