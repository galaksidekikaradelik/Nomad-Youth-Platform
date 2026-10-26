import "../style/index.css";

import dayImage from "../assets/auth-bg-optimized.webp";
import nightImage from "../assets/auth-bg-night-optimized.webp";

export default function AuthLayout({
  children,
  image = dayImage,
  imageDark = nightImage,
}) {
  return (
    <div className="auth-page auth-split">
      <aside
        className={`auth-visual${
          image ? " auth-visual--photo" : ""
        }`}
      >
        {image && (
          <>
            <img
              src={image}
              alt=""
              className="auth-visual-img auth-visual-img--day"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              aria-hidden="true"
            />

            <img
              src={imageDark || image}
              alt=""
              className="auth-visual-img auth-visual-img--night"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              aria-hidden="true"
            />
          </>
        )}

        <svg
          className="auth-visual-arrow"
          viewBox="0 0 400 300"
          aria-hidden="true"
        >
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
      </aside>

      <main className="auth-panel">
        <div className="auth-panel-inner">
          {children}
        </div>
      </main>
    </div>
  );
}
