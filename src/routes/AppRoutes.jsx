import { Routes, Route } from "react-router-dom";
import ProfileCompletionGate from "../layouts/ProfileCompletionGate";

import Home from "../pages/Home";
import Opportunities from "../pages/Opportunities";
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

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/verify-email" element={<VerifyEmail />} />


      
      <Route element={<ProfileCompletionGate />}>
        <Route path="/" element={<Home />} />
        <Route path="/opportunities" element={<Opportunities />} />
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

    </Routes>
  );
}