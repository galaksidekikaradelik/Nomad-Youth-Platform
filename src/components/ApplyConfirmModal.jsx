import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../hooks/useLanguage'

const ExternalLinkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

/**
 * ApplyConfirmModal
 * Shown right before an opportunity's official apply link is opened, so the
 * user knows they're about to leave Nomad Youth for an external site.
 *
 * Props:
 * - open: boolean
 * - onCancel: () => void      ("Ləğv et")
 * - onConfirm: () => void     ("Davam et" — caller opens the link)
 */
export default function ApplyConfirmModal({ open, onCancel, onConfirm }) {
  const { t } = useLanguage()
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handleKeyDown)
    dialogRef.current?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onCancel])

  if (!open) return null

  return createPortal(
    <div
      className="apply-confirm-modal__overlay"
      onClick={onCancel}
      role="presentation"
    >
      <div
        className="apply-confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="apply-confirm-title"
        aria-describedby="apply-confirm-desc"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="apply-confirm-modal__icon">
          <ExternalLinkIcon />
        </div>

        <h2 id="apply-confirm-title" className="apply-confirm-modal__title">
          {t('apply_confirm_title') || 'Nomad Youth platformasını tərk edirsiniz'}
        </h2>

        <p id="apply-confirm-desc" className="apply-confirm-modal__desc">
          {t('apply_confirm_desc') ||
            'Siz Nomad Youth platformasından çıxaraq layihənin rəsmi müraciət səhifəsinə yönləndiriləcəksiniz.'}
        </p>

        <div className="apply-confirm-modal__actions">
          <button
            type="button"
            className="apply-confirm-modal__btn apply-confirm-modal__btn--cancel"
            onClick={onCancel}
          >
            {t('apply_confirm_cancel') || 'Ləğv et'}
          </button>
          <button
            type="button"
            className="apply-confirm-modal__btn apply-confirm-modal__btn--continue"
            onClick={onConfirm}
            autoFocus
          >
            {t('apply_confirm_continue') || 'Davam et'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}