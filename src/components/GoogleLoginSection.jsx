import { lazy, Suspense, useState } from "react";

const GoogleLoginButton = lazy(() =>
  import("../components/GoogleLoginButton")
);

export default function GoogleLoginSection({
  onSuccess,
  onError,
}) {
  const [enabled, setEnabled] = useState(false);

  if (!enabled) {
    return (
      <button
        type="button"
        className="auth-button"
        onClick={() => setEnabled(true)}
      >
        Google ilə davam et
      </button>
    );
  }

  return (
    <Suspense
      fallback={<p>Google giriş sistemi yüklənir...</p>}
    >
      <GoogleLoginButton
        onSuccess={onSuccess}
        onError={onError}
      />
    </Suspense>
  );
}