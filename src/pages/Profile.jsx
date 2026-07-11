import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { getLikeStorageKey, getSaveStorageKey, readStoredSet } from '../utils/likes';
import { STATUS_CONFIG, readStoredStatuses } from '../utils/applicationStatus';
import opportunities from '../data/opportunities.json';
import {
  LayoutGrid,
  Send,
  Bookmark,
  Bell,
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Pencil,
  CheckCircle2,
  Clock,
  Loader2,
  XCircle,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

function getDaysLeft(deadline) {
  if (!deadline) return null;
  const diff = new Date(deadline) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
}

// Artıq bütün item-lər Profile daxilində "view" olaraq açılır, ayrı route yoxdur
const NAV_ITEMS = [
  { key: 'overview', labelKey: 'profile_nav_overview', icon: LayoutGrid },
  { key: 'applications', labelKey: 'profile_nav_applications', icon: Send },
  { key: 'saved', labelKey: 'profile_nav_saved', icon: Bookmark },
  { key: 'notifications', labelKey: 'profile_nav_notifications', icon: Bell },
  { key: 'settings', labelKey: 'profile_nav_settings', icon: SettingsIcon },
];

function Sidebar({ activeView, onNavigate, collapsed, onToggleCollapse }) {
  const { logout } = useAuth();
  const { t } = useLanguage();

  return (
    <aside className={`profile-sidebar${collapsed ? ' profile-sidebar--collapsed' : ''}`}>
      <button
        type="button"
        className="profile-sidebar__toggle"
        onClick={onToggleCollapse}
        aria-label={collapsed ? t('profile_sidebar_open_aria') : t('profile_sidebar_close_aria')}
      >
        {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>

      <nav className="profile-sidebar__nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeView;
          const label = t(item.labelKey);

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              className={`profile-sidebar__item${isActive ? ' profile-sidebar__item--active' : ''}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <button
        className="profile-sidebar__item profile-sidebar__item--logout"
        onClick={logout}
        title={collapsed ? t('nav_logout') : undefined}
      >
        <LogOut size={18} />
        <span>{t('nav_logout')}</span>
      </button>
    </aside>
  );
}

function ProfileStatsBar({ applications }) {
  const { t } = useLanguage();

  const countOf = (modifiers) =>
    applications.filter((a) => modifiers.includes(STATUS_CONFIG[a.status]?.modifier)).length;

  const stats = [
    { key: 'accepted', count: countOf(['accepted', 'approved']), label: t('profile_stat_accepted'), icon: CheckCircle2 },
    { key: 'pending', count: countOf(['applied', 'pending']), label: t('profile_stat_pending'), icon: Clock },
    { key: 'preparing', count: countOf(['preparing', 'in_progress']), label: t('profile_stat_preparing'), icon: Loader2 },
    { key: 'rejected', count: countOf(['rejected']), label: t('profile_stat_rejected'), icon: XCircle },
  ];

  return (
    <div className="profile-stats-bar">
      {stats.map(({ key, count, label, icon: Icon }) => (
        <div key={key} className={`profile-stats-bar__item profile-stats-bar__item--${key}`}>
          <span className="profile-stats-bar__icon">
            <Icon size={22} />
          </span>
          <div>
            <span className="profile-stats-bar__count">{count}</span>
            <span className="profile-stats-bar__label">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileHeader({ name }) {
  const { t } = useLanguage();
  const initial = name ? name.charAt(0).toUpperCase() : 'İ';

  return (
    <div className="profile-header">
      <div className="profile-header__avatar-wrap">
        <div className="profile-header__avatar">{initial}</div>
        <button className="profile-header__avatar-edit" aria-label={t('profile_avatar_edit_aria')}>
          <Pencil size={12} />
        </button>
      </div>
      <div className="profile-header__body">
        <h1>{t('profile_welcome').replace('{name}', name)}</h1>
        <p className="profile-header__subtitle">
          {t('profile_subtitle')}
        </p>
      </div>
    </div>
  );
}

function OpportunityMiniRow({ opp, statusBadge }) {
  const { t } = useLanguage();
  const daysLeft = getDaysLeft(opp.deadline);
  return (
    <div className="profile-mini-row">
      <div className="profile-mini-row__text">
        <span className="profile-mini-row__title">{opp.title}</span>
        {opp.location && <span className="profile-mini-row__location"> - {opp.location}</span>}
        <div className="profile-mini-row__meta">
          {opp.type && <span className="profile-mini-row__tag">{opp.type}</span>}
          {daysLeft !== null && <span className="profile-mini-row__days">{daysLeft} {t('card_days_left')}</span>}
          {statusBadge}
        </div>
      </div>
    </div>
  );
}

function EmptyRow({ text }) {
  return <div className="profile-mini-row profile-mini-row--empty">{text}</div>;
}



// Tam siyahı görünüşü — Seçilmişlər / Yadda saxlananlar üçün ortaq
function FullListView({ title, items, emptyText, onBack, renderRow }) {
  const { t } = useLanguage();
  return (
    <div className="profile-panel profile-panel--full">
      <button type="button" className="profile-panel__back" onClick={onBack}>
        <ChevronLeft size={16} /> {t('profile_back_to_overview')}
      </button>
      <div className="profile-panel__header">
        <h2>{title}</h2>
        <span className="profile-panel__count">{items.length}</span>
      </div>
      <div className="profile-panel__body">
        {items.length > 0 ? (
          items.map((item) => (renderRow ? renderRow(item) : <OpportunityMiniRow key={item.id || item.title} opp={item} />))
        ) : (
          <EmptyRow text={emptyText} />
        )}
      </div>
    </div>
  );
}

function NotificationsView({ onBack }) {
  const { t } = useLanguage();
  return (
    <div className="profile-panel profile-panel--full">
      <button type="button" className="profile-panel__back" onClick={onBack}>
        <ChevronLeft size={16} /> {t('profile_back_to_overview')}
      </button>
      <div className="profile-panel__header">
        <h2>{t('profile_nav_notifications')}</h2>
      </div>
      <div className="profile-panel__body">
        <EmptyRow text={t('profile_notifications_empty')} />
      </div>
    </div>
  );
}

/* ---------- Hesab parametrləri (əvvəlki Settings.jsx-dən köçürülüb) ---------- */

function DeleteConfirmModal({ t, onCancel, onConfirm }) {
  return (
    <div
      className="modal-overlay delete-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="modal-content delete-modal-content">
        <div className="delete-modal__icon">⚠️</div>
        <h2 className="delete-modal__title">
          {t('settings_delete_modal_title')}
        </h2>
        <p className="delete-modal__desc">
          {t('settings_delete_modal_desc')}
        </p>
        <div className="delete-modal__actions">
          <button className="btn-outline" onClick={onCancel}>
            {t('settings_delete_modal_cancel')}
          </button>
          <button className="btn-primary btn-primary--danger" onClick={onConfirm}>
            {t('settings_delete_modal_confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsAccordion({ title, isOpen, onToggle, children }) {
  return (
    <div className="faq-item settings-accordion">
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{title}</span>
        <span className={`faq-icon${isOpen ? ' faq-icon--open' : ''}`} aria-hidden="true">+</span>
      </button>
      <div className={`faq-answer${isOpen ? ' faq-answer--open' : ''}`}>
        <div className="settings-accordion__content">
          {children}
        </div>
      </div>
    </div>
  );
}

function SettingsView({ onBack }) {
  const { user, updateUser, changePassword, deleteAccount, logout } = useAuth();
  const { t } = useLanguage();

  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (id) => setOpenSection((prev) => (prev === id ? null : id));

  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    university: user?.university || '',
    major: user?.major || '',
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '', newPassword: '', confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleProfileChange = (e) => {
    setProfileForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setProfileSaved(false);
  };

  const handleProfileSubmit = () => {
    updateUser(profileForm);
    setProfileSaved(true);
  };

  const handlePasswordChange = (e) => {
    setPasswordForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setPasswordError('');
    setPasswordSaved(false);
  };

  const handlePasswordSubmit = () => {
    setPasswordError('');
    setPasswordSaved(false);

    if (!passwordForm.newPassword || passwordForm.newPassword.length < 8) {
      setPasswordError(t('settings_password_hint'));
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError(t('settings_error_password_mismatch'));
      return;
    }

    const result = changePassword(passwordForm.currentPassword, passwordForm.newPassword);
    if (!result.success) {
      const errorKey = result.error === 'wrong_password' ? 'settings_error_wrong_password' : 'settings_error_user_not_found';
      setPasswordError(t(errorKey));
      return;
    }

    setPasswordSaved(true);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    logout();
  };

  const handleDeleteConfirm = () => {
    deleteAccount();
    setShowDeleteModal(false);
  };

  return (
    <div className="profile-panel profile-panel--full">
      <button type="button" className="profile-panel__back" onClick={onBack}>
        <ChevronLeft size={16} /> {t('profile_back_to_overview')}
      </button>
      <div className="profile-panel__header">
        <h2>{t('settings_title')}</h2>
      </div>

      <SettingsAccordion
        title={t('settings_profile_section_title')}
        isOpen={openSection === 'profile'}
        onToggle={() => toggleSection('profile')}
      >
        <div className="settings-form-grid-2">
          <div className="form-group">
            <label className="form-label">{t('auth_first_name')}</label>
            <input className="form-input" name="firstName" value={profileForm.firstName} onChange={handleProfileChange} />
          </div>
          <div className="form-group">
            <label className="form-label">{t('auth_last_name')}</label>
            <input className="form-input" name="lastName" value={profileForm.lastName} onChange={handleProfileChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{t('auth_email')}</label>
          <input className="form-input" name="email" type="email" value={profileForm.email} onChange={handleProfileChange} />
        </div>

        <div className="form-group">
          <label className="form-label">{t('auth_phone')}</label>
          <input className="form-input" name="phone" value={profileForm.phone} onChange={handleProfileChange} />
        </div>

        <div className="settings-form-grid-2">
          <div className="form-group">
            <label className="form-label">{t('auth_university')}</label>
            <input className="form-input" name="university" value={profileForm.university} onChange={handleProfileChange} />
          </div>
          <div className="form-group">
            <label className="form-label">{t('auth_major')}</label>
            <input className="form-input" name="major" value={profileForm.major} onChange={handleProfileChange} />
          </div>
        </div>

        {profileSaved && (
          <p className="settings-success-msg">
            {t('settings_profile_saved_msg')}
          </p>
        )}

        <button className="btn-primary" onClick={handleProfileSubmit}>
          {t('settings_save_btn')}
        </button>
      </SettingsAccordion>

      <SettingsAccordion
        title={t('settings_password_section_title')}
        isOpen={openSection === 'password'}
        onToggle={() => toggleSection('password')}
      >
        <div className="form-group">
          <label className="form-label">{t('settings_current_password_label')}</label>
          <input className="form-input" name="currentPassword" type="password" value={passwordForm.currentPassword} onChange={handlePasswordChange} />
        </div>

        <div className="form-group">
          <label className="form-label">{t('settings_new_password_label')}</label>
          <input className="form-input" name="newPassword" type="password" value={passwordForm.newPassword} onChange={handlePasswordChange} />
          <span className="settings-hint">{t('settings_password_hint')}</span>
        </div>

        <div className="form-group">
          <label className="form-label">{t('settings_confirm_new_password_label')}</label>
          <input className="form-input" name="confirmPassword" type="password" value={passwordForm.confirmPassword} onChange={handlePasswordChange} />
        </div>

        {passwordError && <p className="auth-error settings-error-msg">{passwordError}</p>}
        {passwordSaved && (
          <p className="settings-success-msg">
            {t('settings_password_saved_msg')}
          </p>
        )}

        <button className="btn-primary" onClick={handlePasswordSubmit}>
          {t('settings_update_password_btn')}
        </button>
      </SettingsAccordion>

      <SettingsAccordion
        title={t('settings_account_actions_title')}
        isOpen={openSection === 'account'}
        onToggle={() => toggleSection('account')}
      >
        <button className="btn-outline settings-btn-full" onClick={handleLogout}>
          {t('settings_logout_btn')}
        </button>

        <button
          className="btn-outline settings-btn-full settings-btn-danger-outline"
          onClick={() => setShowDeleteModal(true)}
        >
          {t('settings_delete_account_btn')}
        </button>
      </SettingsAccordion>

      {showDeleteModal && (
        <DeleteConfirmModal t={t} onCancel={() => setShowDeleteModal(false)} onConfirm={handleDeleteConfirm} />
      )}
    </div>
  );
}

/* ---------- Əsas Profile komponenti ---------- */

const EMPTY_PROFILE_DATA = {
  likedOpportunities: [],
  savedOpportunities: [],
  applications: [],
};

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [activeView, setActiveView] = useState(location.state?.view || 'overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Naviqasiyadan (məs. hamburger menyudakı "Parametrlər" düyməsindən)
  // eyni səhifədə (Profile artıq açıqdırsa) view dəyişəndə də reaksiya versin.
  // useEffect içində sinxron setState çağırmaq əvəzinə, React-in tövsiyə etdiyi
  // "render zamanı state tənzimləmə" pattern-i istifadə olunur.
  const [handledLocationState, setHandledLocationState] = useState(location.state);
  if (location.state?.view && location.state !== handledLocationState) {
    setHandledLocationState(location.state);
    setActiveView(location.state.view);
  }

  // likedOpportunities / savedOpportunities / applications əslində `user`-dən
  // TÖRƏMƏ (derived) datadır — user dəyişəndə yenidən hesablanmalıdır, amma
  // özləri müstəqil state deyil. Bu səbəbdən useEffect+setState əvəzinə
  // useMemo istifadə olunur: heç bir setState çağırışı yoxdur, deməli
  // "Calling setState synchronously within an effect" xəbərdarlığı da
  // tamamilə aradan qalxır (fayl ayırmaqdan fərqli olaraq, bu, problemin
  // kökünü aradan qaldırır).
  const profileData = useMemo(() => {
    if (!user) return EMPTY_PROFILE_DATA;

    const likedSet = readStoredSet(getLikeStorageKey(user));
    const savedSet = readStoredSet(getSaveStorageKey(user));
    const statuses = readStoredStatuses(user);

    const liked = opportunities.filter((opp) => likedSet[opp.id || opp.title]);
    const saved = opportunities.filter((opp) => savedSet[opp.id || opp.title]);
    const applied = opportunities
      .filter((opp) => statuses[opp.id || opp.title])
      .map((opp) => ({ opp, status: statuses[opp.id || opp.title] }));

    return {
      likedOpportunities: liked,
      savedOpportunities: saved,
      applications: applied,
    };
  }, [user]);

  const { likedOpportunities, savedOpportunities, applications } = profileData;

  const firstNameValue = user ? `${user.firstName || ''}`.trim() : '';
  const name = firstNameValue || t('profile_default_name');

  const goOverview = () => setActiveView('overview');

  return (
    <div className="profile-page">
      <div className="container">
        <ProfileHeader name={name} onSettingsClick={() => setActiveView('settings')} />

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
                      <EmptyRow text={t('profile_liked_empty')} />
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
                      <EmptyRow text={t('profile_saved_empty')} />
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
                renderRow={({ opp, status }) => {
                  const cfg = STATUS_CONFIG[status];
                  const badge = cfg ? (
                    <span className={`profile-status-badge profile-status-badge--${cfg.modifier}`}>
                      {t(cfg.labelKey)}
                    </span>
                  ) : null;
                  return <OpportunityMiniRow key={opp.id || opp.title} opp={opp} statusBadge={badge} />;
                }}
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