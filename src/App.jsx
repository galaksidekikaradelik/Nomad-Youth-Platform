
import { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthProvider";
import { WishlistProvider } from "./context/WishlistProvider";
import { LikeProvider } from "./context/LikeProvider";
import { ApplicationStatusProvider } from "./context/ApplicationStatusProvider";

import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";

import {
  initAnalytics,
  trackPageView,
} from "./services/analytics";

import "flag-icons/css/flag-icons.min.css";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(
      location.pathname + location.search
    );
  }, [location.pathname, location.search]);

  return null;
}

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
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
  );
}

export default App;
