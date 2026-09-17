import { t } from '../../data/translations'

export default function ActiveProjects({ projects, onSelectProject }) {
  if (projects.length === 0) return null

  return (
    <section className="organization-details__projects">
      <div className="organization-details__section-heading">
        <h2 className="organization-details__heading">
          {t('org_active_projects')}
        </h2>
      </div>

      <div className="organization-details__projects-grid">
        {projects.map((project) => (
          <article
            key={project.id}
            className="organization-details__project-card"
          >
            <div className="organization-details__project-content">
              <span className="organization-details__project-label">
                {t('org_active_project')}
              </span>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="organization-details__project-meta">
                <span>📅 {project.date}</span>
                <span>🕘 {project.time}</span>
                <span>🚌 {project.additionalInfo}</span>
              </div>

              <div className="organization-details__project-actions">
                <button
                  type="button"
                  className="organization-details__project-details"
                  onClick={() => onSelectProject(project)}
                >
                  {t('org_see_more')}
                </button>

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
          </article>
        ))}
      </div>
    </section>
  )
}
