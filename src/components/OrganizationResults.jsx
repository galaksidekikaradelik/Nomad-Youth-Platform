import OrganizationCard from './OrganizationCard'
import Pagination from './Pagination'

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
        <h3>
          {t('org_empty_title') ||
            'Təşkilat tapılmadı'}
        </h3>

        <p>
          {t('org_empty_description') ||
            'Axtarışınıza uyğun təşkilat yoxdur.'}
        </p>
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