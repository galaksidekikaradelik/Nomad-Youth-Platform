import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'

function DeleteConfirmModal({ t, onCancel, onConfirm }) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel() }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: 'var(--space-md)',
      }}
    >
      <div
        className="modal-content"
        style={{
          background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-2xl)', maxWidth: 420, width: '100%',
          textAlign: 'center', boxSizing: 'border-box',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>⚠️</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
          {t('settings_delete_modal_title')}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 'var(--space-xl)', lineHeight: 1.6 }}>
          {t('settings_delete_modal_desc')}
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <button className="btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={onCancel}>
            {t('settings_delete_modal_cancel')}
          </button>
          <button
            className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', background: 'var(--status-error)' }}
            onClick={onConfirm}
          >
            {t('settings_delete_modal_confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Settings() {
  const { user, updateUser, changePassword, logout, deleteAccount } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName:  user?.lastName  || '',
    email:     user?.email     || '',
    phone:     user?.phone     || '',
    university: user?.university || '',
    major:      user?.major      || '',
  })
  const [profileSaved, setProfileSaved] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '', newPassword: '', confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordSaved, setPasswordSaved] = useState(false)

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleProfileChange = (e) => {
    setProfileForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setProfileSaved(false)
  }

  const handleProfileSubmit = () => {
    updateUser(profileForm)
    setProfileSaved(true)
  }

  const handlePasswordChange = (e) => {
    setPasswordForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setPasswordError('')
    setPasswordSaved(false)
  }

  const handlePasswordSubmit = () => {
    setPasswordError('')
    setPasswordSaved(false)

    if (!passwordForm.newPassword || passwordForm.newPassword.length < 8) {
      setPasswordError(t('settings_password_hint'))
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError(t('settings_error_password_mismatch'))
      return
    }

    const result = changePassword(passwordForm.currentPassword, passwordForm.newPassword)
    if (!result.success) {
      const errorKey = result.error === 'wrong_password' ? 'settings_error_wrong_password' : 'settings_error_user_not_found'
      setPasswordError(t(errorKey))
      return
    }

    setPasswordSaved(true)
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleDeleteConfirm = () => {
    deleteAccount()
    setShowDeleteModal(false)
    navigate('/')
  }

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 640 }}>

        <div className="page-header">
          <div className="page-header__eyebrow">{t('dashboard_eyebrow')}</div>
          <h1 className="page-header__title">{t('settings_title')}</h1>
          <p className="page-header__desc">{t('settings_desc')}</p>
        </div>

        {/* Məlumatları dəyiş */}
        <div className="contact-form" style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-sm)' }}>
            {t('settings_profile_section_title')}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
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
            <p style={{ color: 'var(--status-success)', fontSize: '0.875rem', margin: 0 }}>
              {t('settings_profile_saved_msg')}
            </p>
          )}

          <button className="btn-primary" onClick={handleProfileSubmit} style={{ marginTop: 'var(--space-sm)' }}>
            {t('settings_save_btn')}
          </button>
        </div>

        {/* Şifrəni yeniləyin */}
        <div className="contact-form" style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-sm)' }}>
            {t('settings_password_section_title')}
          </div>

          <div className="form-group">
            <label className="form-label">{t('settings_current_password_label')}</label>
            <input className="form-input" name="currentPassword" type="password" value={passwordForm.currentPassword} onChange={handlePasswordChange} />
          </div>

          <div className="form-group">
            <label className="form-label">{t('settings_new_password_label')}</label>
            <input className="form-input" name="newPassword" type="password" value={passwordForm.newPassword} onChange={handlePasswordChange} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('settings_password_hint')}</span>
          </div>

          <div className="form-group">
            <label className="form-label">{t('settings_confirm_new_password_label')}</label>
            <input className="form-input" name="confirmPassword" type="password" value={passwordForm.confirmPassword} onChange={handlePasswordChange} />
          </div>

          {passwordError && (
            <p className="auth-error" style={{ margin: 0 }}>{passwordError}</p>
          )}
          {passwordSaved && (
            <p style={{ color: 'var(--status-success)', fontSize: '0.875rem', margin: 0 }}>
              {t('settings_password_saved_msg')}
            </p>
          )}

          <button className="btn-primary" onClick={handlePasswordSubmit} style={{ marginTop: 'var(--space-sm)' }}>
            {t('settings_update_password_btn')}
          </button>
        </div>

        {/* Hesabdan çıxış / Hesabı sil */}
        <div className="contact-form" style={{ gap: 'var(--space-md)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
            {t('settings_account_actions_title')}
          </div>

          <button className="btn-outline" onClick={handleLogout} style={{ width: '100%', justifyContent: 'center' }}>
            {t('settings_logout_btn')}
          </button>

          <button
            className="btn-outline"
            onClick={() => setShowDeleteModal(true)}
            style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--status-error)', color: 'var(--status-error)' }}
          >
            {t('settings_delete_account_btn')}
          </button>
        </div>

      </div>

      {showDeleteModal && (
        <DeleteConfirmModal
          t={t}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}