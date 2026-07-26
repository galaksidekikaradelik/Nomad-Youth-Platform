/**
 * OpportunitySkeleton
 *
 * Loading placeholder for OpportunityCard. Reuses the exact same
 * BEM classnames (.opportunity-card, .opportunity-card__*) as the real
 * card so padding, gaps, border-radius, min-heights, and the grid layout
 * are guaranteed to match — zero CLS when real cards swap in.
 *
 * Note: the real OpportunityCard has no image/banner block, so this
 * skeleton doesn't render one either (adding one would break the
 * "exact match" / no-CLS requirement). If a banner image gets added to
 * OpportunityCard later, add a matching .opportunity-card__banner-skeleton
 * block here at the same time.
 */
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

        {/* Title: 2 lines, matches .opportunity-card__title's own min-height */}
        <div className="opportunity-card__title opportunity-skeleton__title">
          <span className="opportunity-skeleton__block opportunity-skeleton__line opportunity-skeleton__line--title-1" />
          <span className="opportunity-skeleton__block opportunity-skeleton__line opportunity-skeleton__line--title-2" />
        </div>
      </div>

      {/* Category / type badges */}
      <div className="opportunity-card__topic">
        <div className="opportunity-card__tags">
          <span className="opportunity-skeleton__block opportunity-skeleton__tag opportunity-skeleton__tag--wide" />
          <span className="opportunity-skeleton__block opportunity-skeleton__tag" />
          <span className="opportunity-skeleton__block opportunity-skeleton__tag opportunity-skeleton__tag--narrow" />
        </div>
      </div>

      {/* Description placeholder (real card shows this inside the detail
          modal, but reserving 3 lines here keeps room for platforms that
          add a card-level excerpt without a future CLS jump) */}
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