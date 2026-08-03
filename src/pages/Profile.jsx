import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import { useLike } from '../hooks/useLike';
import { useApplicationStatus } from '../hooks/useApplicationStatus';
import { useLanguage } from '../hooks/useLanguage';
import StatusSelector from '../components/StatusSelector';

import Sidebar from '../components/profile/Sidebar';
import ProfileStatsBar from '../components/profile/ProfileStatsBar';
import ProfileHeader from '../components/profile/ProfileHeader';
import FullListView, { OpportunityMiniRow } from '../components/profile/FullListView';
import NotificationsView from '../components/profile/NotificationsView';
import SettingsView from '../components/profile/SettingsView';

import { ChevronRight } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [activeView, setActiveView] = useState(location.state?.view || 'overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [handledLocationState, setHandledLocationState] = useState(location.state);
  if (location.state?.view && location.state !== handledLocationState) {
    setHandledLocationState(location.state);
    setActiveView(location.state.view);
  }

  const { likedOpportunities } = useLike();
  const { savedOpportunities } = useWishlist();
  const { statusItems: applications } = useApplicationStatus();

  const firstNameValue = user ? `${user.firstName || ''}`.trim() : '';
  const name = firstNameValue || t('profile_default_name');

  const goOverview = () => setActiveView('overview');

  return (
    <div className="profile-page">
      <div className="container">
        <ProfileHeader user={user} name={name} onSettingsClick={() => setActiveView('settings')} />

        <ProfileStatsBar applications={applications} />

        <div className="profile-layout">
          <Sidebar
            activeView={activeView}
            onNavigate={setActiveView}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          />

          <div className="profile-content">
            {activeView === 'overview' && (
              <>
                <div className="profile-panel">
                  <div className="profile-panel__header">
                    <h2>{t('profile_liked_title')}</h2>
                    <button
                      type="button"
                      className="profile-panel__see-all-icon"
                      onClick={() => setActiveView('liked')}
                      aria-label={t('profile_liked_see_all_aria')}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <div className="profile-panel__body">
                    {likedOpportunities.length > 0 ? (
                      likedOpportunities.slice(0, 3).map((opp) => (
                        <OpportunityMiniRow key={opp.id || opp.title} opp={opp} />
                      ))
                    ) : (
                      <div className="profile-mini-row profile-mini-row--empty">{t('profile_liked_empty')}</div>
                    )}
                  </div>
                  <button type="button" className="profile-panel__footer-btn" onClick={() => setActiveView('liked')}>
                    {t('profile_see_all_btn')} <ChevronRight size={16} />
                  </button>
                </div>

                <div className="profile-panel">
                  <div className="profile-panel__header">
                    <h2>{t('profile_saved_title')}</h2>
                    <button
                      type="button"
                      className="profile-panel__see-all-icon"
                      onClick={() => setActiveView('saved')}
                      aria-label={t('profile_saved_see_all_aria')}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <div className="profile-panel__body">
                    {savedOpportunities.length > 0 ? (
                      savedOpportunities.slice(0, 3).map((opp) => (
                        <OpportunityMiniRow key={opp.id || opp.title} opp={opp} />
                      ))
                    ) : (
                      <div className="profile-mini-row profile-mini-row--empty">{t('profile_saved_empty')}</div>
                    )}
                  </div>
                  <button type="button" className="profile-panel__footer-btn" onClick={() => setActiveView('saved')}>
                    {t('profile_see_all_btn')} <ChevronRight size={16} />
                  </button>
                </div>
              </>
            )}

            {activeView === 'liked' && (
              <FullListView
                title={t('profile_liked_title')}
                items={likedOpportunities}
                emptyText={t('profile_liked_empty')}
                onBack={goOverview}
              />
            )}

            {activeView === 'saved' && (
              <FullListView
                title={t('profile_saved_title')}
                items={savedOpportunities}
                emptyText={t('profile_saved_empty')}
                onBack={goOverview}
              />
            )}

            {activeView === 'applications' && (
              <FullListView
                title={t('profile_applications_title')}
                items={applications}
                emptyText={t('profile_applications_empty')}
                onBack={goOverview}
                renderRow={({ opp }) => (
                  <OpportunityMiniRow
                    key={opp.id || opp.title}
                    opp={opp}
                    statusBadge={<StatusSelector opportunity={opp} t={t} />}
                  />
                )}
              />
            )}

            {activeView === 'notifications' && <NotificationsView onBack={goOverview} />}

            {activeView === 'settings' && <SettingsView onBack={goOverview} />}
          </div>
        </div>
      </div>
    </div>
  );
}