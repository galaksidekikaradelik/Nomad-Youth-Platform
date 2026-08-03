export default function SuccessPanel({ text }) {
  return (
    <div className="ny-success ny-fade-in">
      <div className="ny-success-badge">✓</div>
      <p>{text}</p>
    </div>
  );
}