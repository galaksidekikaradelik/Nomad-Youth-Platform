import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyEmail } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const { refreshUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    verifyEmail(token)
      .then(async () => {
        setStatus("success");
        if (refreshUser) {
          await refreshUser();
        }
      })
      .catch((err) => {
        console.error("Email təsdiqi uğursuz oldu:", err);
        setStatus("error");
      });
  }, [searchParams, refreshUser]);

  return (
    <div className="verify-email-page">
      {status === "loading" && <p>Email təsdiqlənir, gözləyin...</p>}

      {status === "success" && (
        <>
          <p>Email uğurla təsdiqləndi ✓</p>
          <Link to="/dashboard">Dashboard-a qayıt</Link>
        </>
      )}

      {status === "error" && (
        <>
          <p>Token etibarsızdır və ya müddəti bitib.</p>
          <p>Dashboard-a daxil olub "Yenidən göndər" düyməsini sıxa bilərsiniz.</p>
          <Link to="/dashboard">Dashboard-a qayıt</Link>
        </>
      )}
    </div>
  );
}


