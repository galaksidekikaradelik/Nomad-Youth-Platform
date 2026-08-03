import { useLanguage } from '../../hooks/useLanguage';
import { STATUS_CONFIG } from '../../utils/applicationStatus';
import { CheckCircle2, Clock, Loader2, XCircle } from 'lucide-react';

export default function ProfileStatsBar({ applications }) {
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