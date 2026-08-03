import { useLanguage } from '../../hooks/useLanguage';
import { getDaysLeft } from '../../utils/profileHelpers';
import { ChevronLeft } from 'lucide-react';

export function OpportunityMiniRow({ opp, statusBadge }) {
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

export function EmptyRow({ text }) {
  return <div className="profile-mini-row profile-mini-row--empty">{text}</div>;
}

export default function FullListView({ title, items, emptyText, onBack, renderRow }) {
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