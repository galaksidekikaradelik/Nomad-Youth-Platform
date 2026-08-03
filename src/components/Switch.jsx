export default function Switch({ checked, onChange, disabled }) {
  return (
    <span className={`switch${disabled ? ' switch--disabled' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className="switch__track" aria-hidden="true" />
    </span>
  );
}