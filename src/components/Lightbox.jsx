export default function Lightbox({
  lightbox,
  closeLightbox,
  showPrevImage,
  showNextImage,
}) {
  if (!lightbox) return null

  return (
    <div
      className="organization-details__lightbox"
      onClick={closeLightbox}
    >
      <button
        type="button"
        className="organization-details__lightbox-close"
        onClick={closeLightbox}
        aria-label="Bağla"
      >
        ✕
      </button>

      {lightbox.images.length > 1 && (
        <button
          type="button"
          className="organization-details__lightbox-nav organization-details__lightbox-nav--prev"
          onClick={showPrevImage}
          aria-label="Əvvəlki şəkil"
        >
          ‹
        </button>
      )}

      <img
        src={lightbox.images[lightbox.index]}
        alt={`Şəkil ${lightbox.index + 1}`}
        className="organization-details__lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />

      {lightbox.images.length > 1 && (
        <button
          type="button"
          className="organization-details__lightbox-nav organization-details__lightbox-nav--next"
          onClick={showNextImage}
          aria-label="Növbəti şəkil"
        >
          ›
        </button>
      )}

      {lightbox.images.length > 1 && (
        <span className="organization-details__lightbox-counter">
          {lightbox.index + 1} / {lightbox.images.length}
        </span>
      )}
    </div>
  )
}
