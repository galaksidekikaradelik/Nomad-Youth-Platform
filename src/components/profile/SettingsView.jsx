import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import NotificationSettings from '../NotificationSettings';
import DeleteConfirmModal from './DeleteConfirmModal';
import SettingsAccordion from './SettingsAccordion';
import { ChevronLeft } from 'lucide-react';

export default function SettingsView({ onBack }) {
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

  const handleLogout = async () => {
    await logout();
    navigate('/');
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
        title={t('notificationSettings')}
        isOpen={openSection === 'notifications'}
        onToggle={() => toggleSection('notifications')}
      >
        <NotificationSettings />
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