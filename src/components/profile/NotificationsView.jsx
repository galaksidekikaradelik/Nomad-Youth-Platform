import { useEffect, useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import * as notificationService from '../../services/notificationService';
import { EmptyRow } from './FullListView';
import { timeAgo } from '../../utils/profileHelpers';
import { ChevronLeft } from 'lucide-react';

export default function NotificationsView({ onBack }) {
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
        if (!cancelled) setNotifications(list || []);
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

  const handleItemClick = async (n) => {
    if (n.read) return;

    setNotifications((prev) =>
      prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
    );

    try {
      await notificationService.markAsRead(n.id);
    } catch (err) {
      console.error('Bildiriş oxunmuş kimi işarələnmədi:', err);
      setNotifications((prev) =>
        prev.map((item) => (item.id === n.id ? { ...item, read: false } : item))
      );
    }
  };

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
              onClick={() => handleItemClick(n)}
              role="button"
              tabIndex={0}
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