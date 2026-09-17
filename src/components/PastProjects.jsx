import { getEventImages } from '../data/organizationEventImages'
import { t } from '../data/translations'

function PastProjectCard({ project, images, onOpenLightbox }) {
  const visibleImages = images.slice(0, 3)
  const extraCount = images.length - visibleImages.length

  return (
    <div
      key={project.id ?? project.slug}
      className="organization-details__opportunity-card"
    >
      {images.length > 0 ? (
        <div className="organization-details__project-gallery">
          {visibleImages.map((src, index) => (
            <button
              key={src}
              type="button"
              className="organization-details__project-gallery-item"
              onClick={() => onOpenLightbox(images, index)}
            >
              <img src={src} alt={`${project.title} ${index + 1}`} />

              {extraCount > 0 && index === visibleImages.length - 1 && (
                <span className="organization-details__project-gallery-more">
                  +{extraCount}
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="organization-details__project-gallery organization-details__project-gallery--empty">
          <span>📷</span>
        </div>
      )}

      <h3 className="organization-details__opportunity-title">
        {project.title}
      </h3>

      {project.summary && (
        <p className="organization-details__project-summary">
          {project.summary}
        </p>
      )}

      {(project.date || project.participantsCount != null) && (
        <div className="organization-details__opportunity-footer">
          {project.date && <span>{project.date}</span>}

          {project.participantsCount != null && (
            <span>
              {project.participantsCount} {t('org_participants_sub')}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

function GeneralPhotoGrid({ name, images, onOpenLightbox }) {
  if (images.length === 0) {
    return (
      <div className="organization-details__empty">
        <p>{t('org_no_past')}</p>
      </div>
    )
  }

  return (
    <div className="organization-details__photo-grid">
      {images.map((src, index) => (
        <button
          key={src}
          type="button"
          className="organization-details__photo-card"
          onClick={() => onOpenLightbox(images, index)}
        >
          <img src={src} alt={`${name} ${index + 1}`} />
        </button>
      ))}
    </div>
  )
}

export default function PastProjects({
  pastProjects,
  slug,
  name,
  onOpenLightbox,
}) {
  if (pastProjects.length === 0) {
    const generalImages = getEventImages(slug)

    return (
      <GeneralPhotoGrid
        name={name}
        images={generalImages}
        onOpenLightbox={onOpenLightbox}
      />
    )
  }

  return (
    <div className="organization-details__opportunities">
      {pastProjects.map((project) => {
        const images =
          project.images?.length > 0
            ? project.images
            : project.image
            ? [project.image]
            : getEventImages(slug, project.slug)

        return (
          <PastProjectCard
            key={project.id ?? project.slug}
            project={project}
            slug={slug}
            images={images}
            onOpenLightbox={onOpenLightbox}
          />
        )
      })}
    </div>
  )
}
