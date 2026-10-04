import MembershipHero from '../components/MembershipHero'
import Hero from '../components/Hero'

import OpportunitiesSection from '../components/home/OpportunitiesSection'
import AboutSection from '../components/home/AboutSection'
import ServicesSection from '../components/home/ServicesSection'
import PartnershipSection from '../components/home/PartnershipSection'

import useReveal from '../hooks/useReveal'

export default function Home() {
  useReveal()

  return (
    <>
      <MembershipHero />
      <OpportunitiesSection />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <PartnershipSection />
    </>
  )
}
