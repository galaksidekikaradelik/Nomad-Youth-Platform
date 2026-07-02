export default function AuthPromptModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose} aria-label="Bağla">×</button>

        <div className="auth-modal__icon">🔒</div>
        <h3 className="auth-modal__title">Qeydiyyatdan keç</h3>
        <p className="auth-modal__desc">
          Bu funksiyadan istifadə etmək üçün hesabın olmalıdır. Qeydiyyatdan keçərək
          bəyəndiyin və yadda saxladığın imkanları izləyə bilərsən.
        </p>

        <div className="auth-modal__actions">
          <button className="btn-primary auth-modal__btn" onClick={onClose}>
            Qeydiyyatdan keç
          </button>
          <button className="btn-outline auth-modal__btn" onClick={onClose}>
            Bağla
          </button>
        </div>
      </div>
    </div>
  )
}