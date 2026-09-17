import { t } from '../data/translations'

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <div
      className="organization-details__project-modal"
      onClick={onClose}
    >
      <div
        className="organization-details__project-modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="organization-details__project-modal-close"
          onClick={onClose}
          aria-label="Bağla"
        >
          ×
        </button>

        <span className="organization-details__project-label">
          {t('org_active_project')}
        </span>

        <h2>{project.title}</h2>

        <p>{project.description}</p>

        <div className="organization-details__project-modal-info">
          <div>
            <strong>{t('org_project_date')}</strong>
            <span>{project.date}</span>
          </div>

          <div>
            <strong>{t('org_project_time')}</strong>
            <span>{project.time}</span>
          </div>

          <div>
            <strong>{t('org_project_transport')}</strong>
            <span>{project.additionalInfo}</span>
          </div>
        </div>

        <a
          href={project.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="organization-details__project-apply"
        >
          {t('org_apply')}
        </a>
      </div>
    </div>
  )
}
