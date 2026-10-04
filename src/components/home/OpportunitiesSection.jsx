import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import OpportunityCard from '../opportunities/OpportunityCard'
import { OpportunitySkeletonGrid } from '../opportunities/OpportunitySkeleton'
import ArrowIcon from '../icons/ArrowIcon'
import WarningTriangleIcon from '../icons/WarningTriangleIcon'

import { useOpportunities } from '../../hooks/useOpportunities'
import { useLanguage } from '../../hooks/useLanguage'
import { filterActiveOpportunities } from '../../utils/opportunityStatus'

function OpportunitiesError({ message }) {
  return (
    <div className="empty-state">
      <div
        className="empty-state__icon"
        style={{ color: 'var(--color-warning, #f59e0b)' }}
      >
        <WarningTriangleIcon />
      </div>

      <div className="empty-state__title">{message}</div>
    </div>
  )
}

export default function OpportunitiesSection() {
  const { t } = useLanguage()
  const { opportunities, loading, error } = useOpportunities()

  const preview = useMemo(
    () => filterActiveOpportunities(opportunities).slice(0, 6),
    [opportunities]
  )

  return (
    <section className="section" id="opportunities">
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
            className="btn-outline home-arrow-button"
          >
            {t('opportunities_see_all')}
            <ArrowIcon />
          </Link>
        </div>

        {loading && (
          <OpportunitySkeletonGrid count={6} gridClassName="grid-3" />
        )}

        {!loading && error && (
          <OpportunitiesError
            message={t('opp_error') || 'Elanları yükləmək mümkün olmadı.'}
          />
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
  )
}
