
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ProfileCompletionGate from "../layouts/ProfileCompletionGate";

import Home from "../pages/Home";

const Opportunities = lazy(() =>
  import("../pages/Opportunities")
);

const About = lazy(() =>
  import("../pages/About")
);

const Contact = lazy(() =>
  import("../pages/Contact")
);

const FAQ = lazy(() =>
  import("../pages/FAQ")
);

const Services = lazy(() =>
  import("../pages/Services")
);

const Dashboard = lazy(() =>
  import("../pages/Dashboard")
);

const Login = lazy(() =>
  import("../pages/Login")
);

const Register = lazy(() =>
  import("../pages/Register")
);

const Profile = lazy(() =>
  import("../pages/Profile")
);

const ProfileSetup = lazy(() =>
  import("../pages/ProfileSetup")
);

const VerifyEmail = lazy(() =>
  import("../pages/VerifyEmail")
);

const NotFound = lazy(() =>
  import("../pages/NotFound")
);

const OrganizationDetails = lazy(() =>
  import("../pages/OrganizationDetails")
);

const Partnerships = lazy(() =>
  import("../pages/Partnerships")
);

function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "45vh",
        width: "100%",
      }}
    >
      <span
        style={{
          fontFamily: "inherit",
          fontSize: "14px",
          color: "#667085",
        }}
      >
        Səhifə yüklənir...
      </span>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />

        <Route element={<ProfileCompletionGate />}>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/opportunities"
            element={<Opportunities />}
          />

          <Route
            path="/opportunities/:opportunityId"
            element={<Opportunities />}
          />

          <Route
            path="/partnerships"
            element={<Partnerships />}
          />

          <Route
            path="/teskilatlar/:slug"
            element={<OrganizationDetails />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/faq"
            element={<FAQ />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/profile-setup"
            element={<ProfileSetup />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Suspense>
  );
}
