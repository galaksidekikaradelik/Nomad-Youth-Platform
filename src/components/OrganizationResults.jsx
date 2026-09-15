import OrganizationCard from './OrganizationCard'
import Pagination from './Pagination'
import { SearchIcon } from './OpportunityIcons'


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
        <h3>
          {t('org_load_error') ||
            'Təşkilatları yükləmək mümkün olmadı'}
        </h3>

        <p>
          {t('try_again_later') ||
            'Zəhmət olmasa bir az sonra yenidən cəhd edin.'}
        </p>
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