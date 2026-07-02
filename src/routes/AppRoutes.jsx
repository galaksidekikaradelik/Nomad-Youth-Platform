import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Opportunities from '../pages/Opportunities'
import About from '../pages/About'
import Contact from '../pages/Contact'
import FAQ from '../pages/FAQ'
import Services from '../pages/Services'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/"              element={<Home />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/about"         element={<About />} />
        <Route path="/contact"       element={<Contact />} />
        <Route path="/faq"           element={<FAQ />} />
        <Route path="/services"      element={<Services />} />
      </Route>
    </Routes>
  )
}