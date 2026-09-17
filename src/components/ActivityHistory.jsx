import { t } from '../data/translations'

export default function ActivityHistory({ activityHistory }) {
  if (activityHistory.length === 0) return null

  return (
    <section className="organization-details__history">
      {activityHistory.map((year) => (
        <div key={year.year} className="organization-details__history-item">
          <p className="organization-details__history-year">{year.year}</p>

          <p className="organization-details__history-line">
            {year.activeCount ?? year.projectsCount} {t('org_active_line')}
          </p>

          {year.completedCount != null && (
            <p className="organization-details__history-sub">
              {year.completedCount} {t('org_completed_sub')}
            </p>
          )}

          {year.participantsCount != null && (
            <p className="organization-details__history-sub">
              {year.participantsCount} {t('org_participants_sub')}
            </p>
          )}
        </div>
      ))}
    </section>
  )
}
