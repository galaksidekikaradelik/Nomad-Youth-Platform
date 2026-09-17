import { useCallback, useEffect, useState } from 'react'

// Şəkil lightbox-unun bütün state və davranışını
// tək yerdə saxlayan hook. İstənilən komponentdən
// istifadə edilə bilər.
export function useLightbox() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = useCallback((images, index) => {
    setLightbox({ images, index })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  const showPrevImage = useCallback((e) => {
    e.stopPropagation()

    setLightbox((current) => {
      if (!current) return current

      const total = current.images.length

      return {
        ...current,
        index: (current.index - 1 + total) % total,
      }
    })
  }, [])

  const showNextImage = useCallback((e) => {
    e.stopPropagation()

    setLightbox((current) => {
      if (!current) return current

      return {
        ...current,
        index: (current.index + 1) % current.images.length,
      }
    })
  }, [])

  useEffect(() => {
    if (!lightbox) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrevImage(e)
      if (e.key === 'ArrowRight') showNextImage(e)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightbox, closeLightbox, showPrevImage, showNextImage])

  return {
    lightbox,
    openLightbox,
    closeLightbox,
    showPrevImage,
    showNextImage,
  }
}
