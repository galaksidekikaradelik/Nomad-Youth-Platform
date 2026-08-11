import { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthProvider";
import { WishlistProvider } from "./context/WishlistProvider";
import { LikeProvider } from "./context/LikeProvider";
import { ApplicationStatusProvider } from "./context/ApplicationStatusProvider";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { initAnalytics, trackPageView } from "./services/analytics";
import "flag-icons/css/flag-icons.min.css";


function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}


function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <GoogleOAuthProvider clientId="634861401015-03376om3e90l3vb3ifuckfeup5nm62ul.apps.googleusercontent.com">
      <LanguageProvider>
        <AuthProvider>
          <WishlistProvider>
            <LikeProvider>
              <ApplicationStatusProvider>
                <BrowserRouter>
                  <AnalyticsTracker />
                  <ScrollToTop />
                  <AppRoutes />
                </BrowserRouter>
              </ApplicationStatusProvider>
            </LikeProvider>
          </WishlistProvider>
        </AuthProvider>
      </LanguageProvider>
    </GoogleOAuthProvider>
  );
}


export default App;