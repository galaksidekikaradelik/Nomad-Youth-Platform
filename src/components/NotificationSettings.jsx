import { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import * as notificationService from '../services/notificationService';
import Switch from './Switch';

const DEFAULT_SETTINGS = {
  emailEnabled: true,
  inAppEnabled: true,
  newOpportunities: true,
  deadlineReminders: true,
  savedOpportunityUpdates: true,
  platformNews: true,
};

export default function NotificationSettings() {
  const { t } = useLanguage();

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError('');
      try {
        const data = await notificationService.fetchNotificationSettings();
        if (!cancelled) {
          setSettings((prev) => ({ ...prev, ...(data || {}) }));
        }
      } catch (err) {
        console.error('Bildiriş ayarları yüklənmədi:', err);
        if (!cancelled) {
          setLoadError(t('notificationSettingsError') || 'Ayarlar yüklənmədi. Yenidən cəhd edin.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [t]);

  const updateSetting = (key) => (value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setSaveError('');
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    setSaved(false);
    try {
      const updated = await notificationService.updateNotificationSettings(settings);
      setSettings((prev) => ({ ...prev, ...(updated || settings) }));
      setSaved(true);
    } catch (err) {
      console.error('Bildiriş ayarları yadda saxlanmadı:', err);
      setSaveError(t('notificationSettingsSaveError') || 'Ayarlar yadda saxlanmadı. Yenidən cəhd edin.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="settings-hint">{t('notificationSettingsLoading') || 'Yüklənir...'}</p>;
  }

  if (loadError) {
    return <p className="auth-error settings-error-msg">{loadError}</p>;
  }

  return (
    <div className="notification-settings">
      <div className="settings-toggle-row">
        <span className="settings-toggle-row__label">{t('emailNotifications')}</span>
        <Switch
          checked={settings.emailEnabled}
          onChange={updateSetting('emailEnabled')}
          disabled={saving}
        />
      </div>

      <div className="settings-toggle-row">
        <span className="settings-toggle-row__label">{t('inAppNotifications')}</span>
        <Switch
          checked={settings.inAppEnabled}
          onChange={updateSetting('inAppEnabled')}
          disabled={saving}
        />
      </div>

      <div className="settings-toggle-row">
        <span className="settings-toggle-row__label">{t('newOpportunities')}</span>
        <Switch
          checked={settings.newOpportunities}
          onChange={updateSetting('newOpportunities')}
          disabled={saving}
        />
      </div>

      <div className="settings-toggle-row">
        <span className="settings-toggle-row__label">{t('deadlineReminders')}</span>
        <Switch
          checked={settings.deadlineReminders}
          onChange={updateSetting('deadlineReminders')}
          disabled={saving}
        />
      </div>

      <div className="settings-toggle-row">
        <span className="settings-toggle-row__label">{t('savedOpportunityUpdates')}</span>
        <Switch
          checked={settings.savedOpportunityUpdates}
          onChange={updateSetting('savedOpportunityUpdates')}
          disabled={saving}
        />
      </div>

      <div className="settings-toggle-row">
        <span className="settings-toggle-row__label">{t('platformNews')}</span>
        <Switch
          checked={settings.platformNews}
          onChange={updateSetting('platformNews')}
          disabled={saving}
        />
      </div>

      {saveError && <p className="auth-error settings-error-msg">{saveError}</p>}
      {saved && (
        <p className="settings-success-msg">
          {t('notificationSettingsSaved') || 'Settings saved'}
        </p>
      )}

      <button className="btn-primary" onClick={handleSave} disabled={saving}>
        {t('save')}
      </button>
    </div>
  );
}