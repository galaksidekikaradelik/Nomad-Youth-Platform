import { t } from '../../data/translations'
import ActiveOpportunities from './ActiveOpportunities'
import ActiveProjects from './ActiveProjects'

export default function ActiveTabContent({
  opportunities,
  activeProjects,
  lang,
  onSelectProject,
}) {
  const hasActiveOpportunities = opportunities.length > 0
  const hasActiveProjects = activeProjects.length > 0

  if (!hasActiveOpportunities && !hasActiveProjects) {
    return (
      <div className="organization-details__empty">
        <p>{t('org_no_active')}</p>
      </div>
    )
  }

  return (
    <>
      <ActiveOpportunities opportunities={opportunities} lang={lang} />

      <ActiveProjects
        projects={activeProjects}
        onSelectProject={onSelectProject}
      />
    </>
  )
}
