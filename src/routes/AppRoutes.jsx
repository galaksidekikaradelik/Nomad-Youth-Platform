import { Routes, Route } from "react-router-dom";
import ProfileCompletionGate from "../layouts/ProfileCompletionGate";

import Home from "../pages/Home";
import Opportunities from "../pages/Opportunities";
import OpportunityDetailsPage from "../pages/OpportunityDetailsPage";

import About from "../pages/About";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import Services from "../pages/Services";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ProfileSetup from "../pages/ProfileSetup";
import VerifyEmail from "../pages/VerifyEmail";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Email verification */}
      <Route path="/verify-email" element={<VerifyEmail />} />

      <Route element={<ProfileCompletionGate />}>
        {/* Main pages */}
        <Route path="/" element={<Home />} />

        {/* Opportunities list */}
        <Route path="/opportunities" element={<Opportunities />} />

        {/* Single opportunity */}
        <Route
          path="/opportunities/:opportunityId"
          element={<OpportunityDetailsPage />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/services" element={<Services />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}