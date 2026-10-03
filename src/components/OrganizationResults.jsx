import OrganizationCard from './OrganizationCard'
import Pagination from './Pagination'
import { SearchIcon } from './OpportunityIcons'

const WarningIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

export default function OrganizationResults({
  organizations,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
  t,
  lang,
}) {
  // t() tərcümə yoxdursa açarın özünü qaytarır, ona görə || fallback işləmir
  const tr = (key, fallback) => {
    const value = t(key)
    return value && value !== key ? value : fallback
  }

  if (loading) {
    return (
      <div className="organization-results__message">
        <p>{t('org_loading')}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="organization-results__message">
        <div className="empty-state">
          <div
            className="empty-state__icon"
            style={{ color: 'var(--color-warning, #f59e0b)' }}
          >
            <WarningIcon />
          </div>

          <div className="empty-state__title">
            {tr('org_load_error', 'Təşkilatları yükləmək mümkün olmadı.')}
          </div>

          <p className="empty-state__desc">
            {tr('try_again_later', 'Zəhmət olmasa bir az sonra yenidən cəhd edin.')}
          </p>
        </div>
      </div>
    )
  }

  if (!organizations?.length) {
    return (
      <div className="organization-results__message">
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
      </div>
    )
  }

  return (
    <div className="organization-results">
      <div className="org-grid">
        {organizations.map((organization) => (
          <OrganizationCard
            key={organization.id}
            organization={organization}
            t={t}
            lang={lang}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}