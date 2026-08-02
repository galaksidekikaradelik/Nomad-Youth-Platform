import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import { useLike } from '../hooks/useLike';
import { useApplicationStatus } from '../hooks/useApplicationStatus';
import { useLanguage } from '../hooks/useLanguage';
import { STATUS_CONFIG } from '../utils/applicationStatus';
import * as notificationService from '../services/notificationService';
import Avatar from '../components/Avatar';
import AvatarAdjustModal from '../components/AvatarAdjustModal';
import StatusSelector from '../components/StatusSelector';
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
  X,
  Camera,
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

function timeAgo(isoDate) {
  if (!isoDate) return '';
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'indicə';
  if (mins < 60) return `${mins} dəq əvvəl`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} saat əvvəl`;
  const days = Math.floor(hours / 24);
  return `${days} gün əvvəl`;
}

const NAV_ITEMS = [
  { key: 'overview', labelKey: 'profile_nav_overview', icon: LayoutGrid },
  { key: 'applications', labelKey: 'profile_nav_applications', icon: Send },
  { key: 'saved', labelKey: 'profile_nav_saved', icon: Bookmark },
  { key: 'notifications', labelKey: 'profile_nav_notifications', icon: Bell },
  { key: 'settings', labelKey: 'profile_nav_settings', icon: SettingsIcon },
];

function Sidebar({ activeView, onNavigate, collapsed, onToggleCollapse }) {
  const { logout, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

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


      {user && !user.profileCompleted && (
        <div
          className="profile-sidebar__complete-card"
          title={collapsed ? (t('profile_complete_card_title') || 'Profilinizi tamamlayın') : undefined}
        >
          {!collapsed && (
            <p className="profile-sidebar__complete-text">
              {t('profile_complete_card_title') || 'Profilinizi tamamlayın'}
            </p>
          )}
          <button
            type="button"
            className="profile-sidebar__complete-btn"
            onClick={() => navigate('/profile-setup')}
          >
            {collapsed ? <Pencil size={16} /> : (t('profile_complete_card_btn') || 'Profili tamamla')}
          </button>
        </div>
      )}

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


function ProfileHeader({ user, name }) {
  const { t } = useLanguage();
  const { uploadAvatar, removeAvatar } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [pendingFile, setPendingFile] = useState(null); // seçilib, hələ düzəliş modalında olan fayl

  const openFilePicker = () => {
    if (uploading) return;
    setError('');
    fileInputRef.current?.click();
  };

  const handleAvatarKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFilePicker();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; 
    if (!file) return;
    setError('');
    setPendingFile(file); 
  };

  const handleAdjustConfirm = async (adjustedFile) => {
    setPendingFile(null);
    setUploading(true);
    try {
      await uploadAvatar(adjustedFile);
    } catch (err) {
      console.error('Avatar yüklənmədi:', err);
      setError(t('profile_avatar_upload_error') || 'Şəkil yüklənmədi, yenidən cəhd edin.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (e) => {
    e.stopPropagation(); // wrap-ın öz onClick-i tətiklənməsin (fayl seçici açılmasın)
    setError('');
    setUploading(true);
    try {
      await removeAvatar();
    } catch (err) {
      console.error('Avatar silinmədi:', err);
      setError(t('profile_avatar_remove_error') || 'Şəkil silinmədi, yenidən cəhd edin.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-header">
      <div
        className={`profile-header__avatar-wrap${uploading ? ' profile-header__avatar-wrap--uploading' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={t('profile_avatar_edit_aria')}
        onClick={openFilePicker}
        onKeyDown={handleAvatarKeyDown}
      >
        <Avatar user={user} size={88} className="profile-header__avatar" />

        {/* Hover overlay + kamera ikonu / yüklənmə zamanı spinner */}
        <div className="profile-header__avatar-overlay" aria-hidden="true">
          {uploading ? (
            <span className="profile-header__avatar-spinner" />
          ) : (
            <Camera size={22} className="profile-header__avatar-camera" />
          )}
        </div>

        <button
          type="button"
          className="profile-header__avatar-edit"
          aria-label={t('profile_avatar_edit_aria')}
          onClick={(e) => { e.stopPropagation(); openFilePicker(); }}
          disabled={uploading}
          tabIndex={-1}
        >
          <Pencil size={12} />
        </button>

        {user?.avatarUrl && (
          <button
            type="button"
            className="profile-header__avatar-remove"
            aria-label={t('profile_avatar_remove_aria') || 'Şəkli sil'}
            onClick={handleRemove}
            disabled={uploading}
          >
            <X size={12} />
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          hidden
          onChange={handleFileChange}
        />
      </div>
      <div className="profile-header__body">
        <h1>{t('profile_welcome').replace('{name}', name)}</h1>
        <p className="profile-header__subtitle">
          {t('profile_subtitle')}
        </p>
        {error && <p className="profile-header__avatar-error">{error}</p>}
      </div>

      <AvatarAdjustModal
        open={pendingFile !== null}
        file={pendingFile}
        onCancel={() => setPendingFile(null)}
        onConfirm={handleAdjustConfirm}
      />
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
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const list = await notificationService.fetchMyNotifications();
        if (cancelled) return;
        setNotifications(list || []);

        const unread = (list || []).filter((n) => !n.read);
        if (unread.length > 0) {
          await Promise.all(unread.map((n) => notificationService.markAsRead(n.id)));
          if (!cancelled) {
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          }
        }
      } catch (err) {
        console.error('Bildirişlər yüklənmədi:', err);
        if (!cancelled) {
          setError(t('profile_notifications_error') || 'Bildirişlər yüklənmədi. Yenidən cəhd edin.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [t]);

  return (
    <div className="profile-panel profile-panel--full">
      <button type="button" className="profile-panel__back" onClick={onBack}>
        <ChevronLeft size={16} /> {t('profile_back_to_overview')}
      </button>
      <div className="profile-panel__header">
        <h2>{t('profile_nav_notifications')}</h2>
        {!loading && !error && <span className="profile-panel__count">{notifications.length}</span>}
      </div>
      <div className="profile-panel__body">
        {loading ? (
          <EmptyRow text="Yüklənir..." />
        ) : error ? (
          <EmptyRow text={error} />
        ) : notifications.length === 0 ? (
          <EmptyRow text={t('profile_notifications_empty')} />
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`profile-mini-row${n.read ? '' : ' profile-mini-row--unread'}`}
            >
              <div className="profile-mini-row__text">
                <span className="profile-mini-row__title">{n.title}</span>
                {n.message && (
                  <div className="profile-mini-row__meta">
                    <span className="profile-mini-row__tag">{n.message}</span>
                  </div>
                )}
                <div className="profile-mini-row__meta profile-mini-row__meta--muted">
                  {timeAgo(n.createdAt)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


function DeleteConfirmModal({ t, onCancel, onConfirm, error, deleting }) {
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
        {error && <p className="auth-error settings-error-msg">{error}</p>}
        <div className="delete-modal__actions">
          <button className="btn-outline" onClick={onCancel} disabled={deleting}>
            {t('settings_delete_modal_cancel')}
          </button>
          <button className="btn-primary btn-primary--danger" onClick={onConfirm} disabled={deleting}>
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
  const navigate = useNavigate();

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
  const [profileError, setProfileError] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '', newPassword: '', confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleProfileChange = (e) => {
    setProfileForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setProfileSaved(false);
  };

  const handleProfileSubmit = async () => {
    setProfileError('');
    setProfileSaving(true);
    try {
      await updateUser(profileForm);
      setProfileSaved(true);
    } catch (err) {
      setProfileSaved(false);
      setProfileError(
        err.response?.data?.message ||
        t('settings_profile_error') ||
        'Profil yenilənmədi, yenidən cəhd edin.'
      );
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setPasswordError('');
    setPasswordSaved(false);
  };

  const handlePasswordSubmit = async () => {
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

    setPasswordSaving(true);
    try {
      const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      if (!result.success) {
        const errorKey =
          result.error === 'wrong_password'
            ? 'settings_error_wrong_password'
            : result.error === 'user_not_found'
            ? 'settings_error_user_not_found'
            : null;
        setPasswordError(errorKey ? t(errorKey) : (result.error || t('settings_error_user_not_found')));
        return;
      }

      setPasswordSaved(true);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordError(err.response?.data?.message || t('settings_error_user_not_found'));
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleDeleteConfirm = async () => {
    setDeleteError('');
    setDeleting(true);
    try {
      await deleteAccount();
      await logout();
      setShowDeleteModal(false);
      navigate('/');
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Hesab silinmədi, yenidən cəhd edin.');
    } finally {
      setDeleting(false);
    }
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

        {profileError && <p className="auth-error settings-error-msg">{profileError}</p>}
        {profileSaved && (
          <p className="settings-success-msg">
            {t('settings_profile_saved_msg')}
          </p>
        )}

        <button className="btn-primary" onClick={handleProfileSubmit} disabled={profileSaving}>
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

        <button className="btn-primary" onClick={handlePasswordSubmit} disabled={passwordSaving}>
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
        <DeleteConfirmModal
          t={t}
          onCancel={() => { if (!deleting) { setShowDeleteModal(false); setDeleteError(''); } }}
          onConfirm={handleDeleteConfirm}
          error={deleteError}
          deleting={deleting}
        />
      )}
    </div>
  );
}

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