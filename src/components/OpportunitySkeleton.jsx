export default function OpportunitySkeleton() {
  return (
    <div className="opportunity-card opportunity-skeleton" aria-hidden="true">
      <div className="opportunity-card__top">
        <div className="opportunity-card__top-row">
          <span className="opportunity-skeleton__block opportunity-skeleton__flag" />
          <div className="opportunity-card__icons">
            <span className="opportunity-skeleton__block opportunity-skeleton__icon-btn" />
            <span className="opportunity-skeleton__block opportunity-skeleton__icon-btn" />
          </div>
        </div>

        <div className="opportunity-card__title opportunity-skeleton__title">
          <span className="opportunity-skeleton__block opportunity-skeleton__line opportunity-skeleton__line--title-1" />
          <span className="opportunity-skeleton__block opportunity-skeleton__line opportunity-skeleton__line--title-2" />
        </div>
      </div>

      <div className="opportunity-card__topic">
        <div className="opportunity-card__tags">
          <span className="opportunity-skeleton__block opportunity-skeleton__tag opportunity-skeleton__tag--wide" />
          <span className="opportunity-skeleton__block opportunity-skeleton__tag" />
          <span className="opportunity-skeleton__block opportunity-skeleton__tag opportunity-skeleton__tag--narrow" />
        </div>
      </div>

      <div className="opportunity-skeleton__description">
        <span className="opportunity-skeleton__block opportunity-skeleton__line" />
        <span className="opportunity-skeleton__block opportunity-skeleton__line" />
        <span className="opportunity-skeleton__block opportunity-skeleton__line opportunity-skeleton__line--short" />
      </div>

      <div className="opportunity-card__divider" />

      <div className="opportunity-card__footer">
        <div className="opportunity-card__footer-top">
          <div className="opportunity-card__dates">
            <span className="opportunity-skeleton__block opportunity-skeleton__line opportunity-skeleton__line--date" />
            <span className="opportunity-skeleton__block opportunity-skeleton__line opportunity-skeleton__line--date-muted" />
          </div>
          <span className="opportunity-skeleton__block opportunity-skeleton__status-badge" />
        </div>

        <div className="opportunity-card__footer-actions">
          <span className="opportunity-skeleton__block opportunity-skeleton__btn opportunity-skeleton__btn--detail" />
          <span className="opportunity-skeleton__block opportunity-skeleton__btn opportunity-skeleton__btn--apply" />
        </div>
      </div>
    </div>
  )
}


export function OpportunitySkeletonGrid({ count = 8, gridClassName = 'opportunities-grid' }) {
  return (
    <div className={gridClassName} role="status" aria-live="polite" aria-label="Fürsətlər yüklənir">
      {Array.from({ length: count }).map((_, i) => (
        <OpportunitySkeleton key={i} />
      ))}
    </div>
  )
}