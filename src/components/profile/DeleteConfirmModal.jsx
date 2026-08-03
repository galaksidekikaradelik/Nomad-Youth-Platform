export default function DeleteConfirmModal({ t, onCancel, onConfirm, error, deleting }) {
  return (
    <div
      className="modal-overlay delete-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="modal-content delete-modal-content">
        <div className="delete-modal__icon">⚠️</div>
        <h2 className="delete-modal__title">
          {t('settings_delete_modal_title')}
        </h2>
        <p className="delete-modal__desc">
          {t('settings_delete_modal_desc')}
        </p>
        {error && <p className="auth-error settings-error-msg">{error}</p>}
        <div className="delete-modal__actions">
          <button className="btn-outline" onClick={onCancel} disabled={deleting}>
            {t('settings_delete_modal_cancel')}
          </button>
          <button className="btn-primary btn-primary--danger" onClick={onConfirm} disabled={deleting}>
            {t('settings_delete_modal_confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}