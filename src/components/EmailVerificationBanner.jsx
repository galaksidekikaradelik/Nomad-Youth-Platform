import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { resendVerification } from "../services/authService";

export default function EmailVerificationBanner() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (!user || user.emailVerified) return null;

  const startCooldown = () => {
    setCooldown(60);
    intervalRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    setError(null);
    setLoading(true);
    try {
      await resendVerification();
      startCooldown();
    } catch (err) {
      setError("Göndərmək mümkün olmadı. Bir az sonra yenidən cəhd edin.");
      console.error("Resend verification uğursuz oldu:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verification-banner" role="alert">
      <span>
        E-mail ünvanınızı təsdiqləyin. Təsdiq linki e-mailinizə göndərilib.
      </span>

      <button
        onClick={handleResend}
        disabled={loading || cooldown > 0}
        className="verification-banner__button"
      >
        {cooldown > 0 ? `Yenidən göndər (${cooldown}s)` : "Yenidən göndər"}
      </button>

      {error && <span className="verification-banner__error">{error}</span>}
    </div>
  );
}