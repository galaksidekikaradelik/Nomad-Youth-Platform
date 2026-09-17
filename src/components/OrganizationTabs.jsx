import { t } from '../data/translations'

export const TABS = {
  ACTIVE: 'active',
  PAST: 'past',
  ABOUT: 'about',
}

export default function OrganizationTabs({ activeTab, setActiveTab }) {
  const tabClass = (tab) =>
    activeTab === tab
      ? 'organization-details__tab organization-details__tab--active'
      : 'organization-details__tab'

  return (
    <nav className="organization-details__tabs">
      <button
        type="button"
        className={tabClass(TABS.ACTIVE)}
        onClick={() => setActiveTab(TABS.ACTIVE)}
      >
        {t('org_opportunities_tab')}
      </button>

      <button
        type="button"
        className={tabClass(TABS.PAST)}
        onClick={() => setActiveTab(TABS.PAST)}
      >
        {t('org_past_tab')}
      </button>

      <button
        type="button"
        className={tabClass(TABS.ABOUT)}
        onClick={() => setActiveTab(TABS.ABOUT)}
      >
        {t('org_about_title')}
      </button>
    </nav>
  )
}
