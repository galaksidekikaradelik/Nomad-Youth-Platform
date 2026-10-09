
export default function MundusSkeleton() {
  return (
    <div
      className="mundus-card mundus-skeleton"
      aria-hidden="true"
    >
      {/* TOP */}

      <div className="mundus-card__top">
        <div className="mundus-card__top-row">

          <div className="mundus-skeleton__flags">
            <span className="mundus-skeleton__block mundus-skeleton__flag" />
            <span className="mundus-skeleton__block mundus-skeleton__flag" />
            <span className="mundus-skeleton__block mundus-skeleton__flag" />
          </div>

          <div className="mundus-card__icons">
            <span className="mundus-skeleton__block mundus-skeleton__icon-btn" />
            <span className="mundus-skeleton__block mundus-skeleton__icon-btn" />
          </div>

        </div>

        <div className="mundus-card__title mundus-skeleton__title">
          <span className="mundus-skeleton__block mundus-skeleton__line mundus-skeleton__line--title-1" />
          <span className="mundus-skeleton__block mundus-skeleton__line mundus-skeleton__line--title-2" />
        </div>
      </div>

      {/* TAGS */}

      <div className="mundus-card__topic">
        <div className="mundus-card__tags">
          <span className="mundus-skeleton__block mundus-skeleton__tag mundus-skeleton__tag--wide" />
          <span className="mundus-skeleton__block mundus-skeleton__tag" />
          <span className="mundus-skeleton__block mundus-skeleton__tag mundus-skeleton__tag--narrow" />
        </div>
      </div>

      {/* DESCRIPTION PLACEHOLDER */}

      <div className="mundus-skeleton__description">
        <span className="mundus-skeleton__block mundus-skeleton__line" />
        <span className="mundus-skeleton__block mundus-skeleton__line" />
        <span className="mundus-skeleton__block mundus-skeleton__line mundus-skeleton__line--short" />
      </div>

      {/* DIVIDER */}

      <div className="mundus-card__divider" />

      {/* FOOTER */}

      <div className="mundus-card__footer">

        <div className="mundus-card__footer-top">

          <div className="mundus-card__dates">
            <span className="mundus-skeleton__block mundus-skeleton__line mundus-skeleton__line--date" />
            <span className="mundus-skeleton__block mundus-skeleton__line mundus-skeleton__line--date-muted" />
          </div>

          <span className="mundus-skeleton__block mundus-skeleton__status-badge" />

        </div>

        <div className="mundus-card__footer-actions">
          <span className="mundus-skeleton__block mundus-skeleton__btn mundus-skeleton__btn--detail" />
          <span className="mundus-skeleton__block mundus-skeleton__btn mundus-skeleton__btn--apply" />
        </div>

      </div>
    </div>
  )
}

export function MundusSkeletonGrid({
  count = 6,
  gridClassName = 'mundus-results__grid',
}) {
  return (
    <div
      className={gridClassName}
      role="status"
      aria-live="polite"
      aria-label="Erasmus Mundus proqramları yüklənir"
    >
      {Array.from({ length: count }).map((_, i) => (
        <MundusSkeleton key={i} />
      ))}
    </div>
  )
}
