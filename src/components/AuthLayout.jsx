import "../style/auth-split.css";

// Register və Login üçün ortaq split layout: solda vizual kart, sağda form.
// image verilməsə, loqonun rənglərindən qurulmuş gradient göstərilir.
export default function AuthLayout({
  children,
  image,
  headline = "Səyahətin növbəti addımı burada başlayır",
  tagline = "Nomad Youth ilə imkanları kəşf et.",
}) {
  return (
    <div className="auth-page auth-split">
      <aside
        className="auth-visual"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      >
        <svg className="auth-visual-arrow" viewBox="0 0 400 300" aria-hidden="true">
          <path
            d="M10 280 C120 280 150 120 260 130 S340 60 380 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M340 14 L384 16 L372 58"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="auth-visual-text">
          <h2>{headline}</h2>
          <p>{tagline}</p>
        </div>
      </aside>

      <main className="auth-panel">
        <div className="auth-panel-inner">
          {children}
        </div>
      </main>
    </div>
  );
}