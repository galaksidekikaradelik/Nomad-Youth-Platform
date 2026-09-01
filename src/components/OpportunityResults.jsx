import OpportunityCard from './OpportunityCard'
import { OpportunitySkeletonGrid } from './OpportunitySkeleton'
import Pagination from './Pagination'
import { WarningTriangleIcon, SearchIcon } from './OpportunityIcons'

export default function OpportunityResults({
  t,
  loading,
  error,
  sorted,
  paginated,
  page,
  totalPages,
  onPageChange,
  highlightOppKey,
}) {
  if (loading) {
    return <OpportunitySkeletonGrid count={8} gridClassName="grid-3" />
  }

  if (error) {
    return (
      <div className="empty-state">
        <div
          className="empty-state__icon"
          style={{ color: 'var(--color-warning, #f59e0b)' }}
        >
          <WarningTriangleIcon />
        </div>

        <div className="empty-state__title">
          {t('opp_error') || 'Elanları yükləmək mümkün olmadı.'}
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
        {t('opp_results_prefix')}
        <span className="opportunities-results-count__number">
          {sorted.length}
        </span>
        {t('opp_results_suffix')}
      </div>

      {sorted.length > 0 ? (
        <>
          <div className="grid-3">
            {paginated.map(op => (
              <OpportunityCard
                key={op.id}
                opportunity={op}
                autoOpenDetail={
                  highlightOppKey !== null &&
                  String(op.id || op.title) === String(highlightOppKey)
                }
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
            <SearchIcon />
          </div>

          <div className="empty-state__title">{t('opp_empty_title')}</div>

          <p className="empty-state__desc">{t('opp_empty_desc')}</p>
        </div>
      )}
    </>
  )
}