import { useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import Avatar from '../Avatar';
import AvatarAdjustModal from '../AvatarAdjustModal';
import { Pencil, X, Camera } from 'lucide-react';

export default function ProfileHeader({ user, name }) {
  const { t } = useLanguage();
  const { uploadAvatar, removeAvatar } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [pendingFile, setPendingFile] = useState(null); 

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
    e.stopPropagation(); 
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