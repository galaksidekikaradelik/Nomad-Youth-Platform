import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MainLayout from "./MainLayout";

// Bu path-lərdə olarkən yönləndirmə tətikləndirilməsin
const EXEMPT_PATHS = ["/profile-setup", "/verify-email"];

// YENİ: login/googleLogin/register-dən sonra profileCompleted=false
// olan istifadəçini avtomatik /profile-setup-ə yönləndirir. MainLayout-u
// wrap edir ki, bütün qorunan route-larda işləsin.
export default function ProfileCompletionGate() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (user.profileCompleted === false && !EXEMPT_PATHS.includes(location.pathname)) {
      navigate("/profile-setup", { replace: true });
    }
  }, [loading, user, location.pathname, navigate]);

  return <MainLayout />;
}