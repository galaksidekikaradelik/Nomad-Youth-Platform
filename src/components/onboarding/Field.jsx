export default function Field({ label, required, error, children, hint }) {
  return (
    <label className="ny-field">
      <span className="ny-field-label">
        {label} {required && <span className="ny-req">*</span>}
        {hint && <span className="ny-hint"> {hint}</span>}
      </span>
      {children}
      {error && <span className="ny-error">{error}</span>}
    </label>
  );
}