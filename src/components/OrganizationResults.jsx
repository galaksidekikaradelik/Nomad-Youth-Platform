import OrganizationCard from './OrganizationCard'
import { OpportunitySkeletonGrid } from './OpportunitySkeleton'
import Pagination from './Pagination'
import { OrgWarningTriangleIcon, OrgSearchIcon } from './OrganizationIcons'

export default function OrganizationResults({
  t,
  lang,
  loading,
  error,
  sorted,
  paginated,
  page,
  totalPages,
  onPageChange,
}) {
  if (loading) {
    return (
      <OpportunitySkeletonGrid count={6} gridClassName="org-grid" />
    )
  }

  if (error) {
    return (
      <div className="empty-state">
        <div
          className="empty-state__icon"
          style={{ color: 'var(--color-warning, #f59e0b)' }}
        >
          <OrgWarningTriangleIcon />
        </div>

        <div className="empty-state__title">
          {t('org_error') || 'Təşkilatları yükləmək mümkün olmadı.'}
        </div>

        <p className="empty-state__desc">
          Zəhmət olmasa bir az sonra yenidən cəhd edin.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="opportunities-results-count">
        {t('org_count_prefix') || 'Azərbaycanda '}
        <span className="opportunities-results-count__number">
          {sorted.length}
        </span>{' '}
        {t('org_count_suffix') || 'təşkilat'}
      </div>

      {sorted.length > 0 ? (
        <>
          <div className="org-grid">
            {paginated.map(org => (
              <OrganizationCard
                key={org.id}
                organization={org}
                t={t}
                lang={lang}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className="empty-state">
          <div
            className="empty-state__icon"
            style={{ color: 'var(--color-text-muted, #94a3b8)' }}
          >
            <OrgSearchIcon />
          </div>

          <div className="empty-state__title">
            {t('org_empty_title') || 'Təşkilat tapılmadı'}
          </div>

          <p className="empty-state__desc">
            {t('org_empty_desc') ||
              'Axtarışı və ya filtrləri dəyişməyi cəhd edin.'}
          </p>
        </div>
      )}
    </>
  )
}