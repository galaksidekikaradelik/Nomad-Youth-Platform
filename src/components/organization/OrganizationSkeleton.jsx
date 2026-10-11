export default function OrganizationSkeleton({ count = 9 }) {
  return (
    <div className="organization-results">
      <div className="org-grid" aria-hidden="true">
        {Array.from({ length: count }).map((_, index) => (
          <article
            className="org-card org-card--skeleton"
            key={index}
          >
            <div className="org-card__top">
              <div className="org-card__identity">
                <div className="org-skeleton org-skeleton--avatar" />

                <div className="org-card__name-wrap">
                  <div className="org-skeleton org-skeleton--name" />
                </div>
              </div>
            </div>

            <div className="org-card__about">
              <div className="org-skeleton org-skeleton--section" />
              <div className="org-skeleton org-skeleton--line" />
              <div className="org-skeleton org-skeleton--line org-skeleton--short" />
            </div>

            <div className="org-card__categories">
              <div className="org-skeleton org-skeleton--tag" />
              <div className="org-skeleton org-skeleton--tag org-skeleton--tag-wide" />
            </div>

            <div className="org-card__bottom">
              <div className="org-skeleton org-skeleton--count" />
              <div className="org-skeleton org-skeleton--link" />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
