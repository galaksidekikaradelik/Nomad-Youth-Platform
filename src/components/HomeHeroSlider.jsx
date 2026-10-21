
import { useEffect, useState } from 'react'

import MembershipHero from './MembershipHero'
import SendingOrganizationHero from './SendingOrganizationHero'

import '../style/index.css'

const INTERVAL_MS = 5000

export default function HomeHeroSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive(current => (current + 1) % 2)
    }, INTERVAL_MS)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const goTo = index => {
    setActive(index)
  }

  return (
    <div
      className="home-hero-slider"
      aria-label="Nomad Youth hero slider"
      aria-roledescription="carousel"
    >
      <div className="home-hero-slider__slides">

        {/* FIRST HERO */}

        <div
          className={`home-hero-slider__slide${
            active === 0 ? ' is-active' : ''
          }`}
          aria-hidden={active !== 0}
          inert={active !== 0}
        >
          <MembershipHero />
        </div>

        {/* SECOND HERO */}

        <div
          className={`home-hero-slider__slide${
            active === 1 ? ' is-active' : ''
          }`}
          aria-hidden={active !== 1}
          inert={active !== 1}
        >
          <SendingOrganizationHero />
        </div>
      </div>

      {/* SLIDER INDICATORS */}

      <div
        className="home-hero-slider__pagination"
        role="group"
        aria-label="Hero seçimi"
      >
        {[0, 1].map(index => (
          <button
            key={index}
            type="button"
            className={`home-hero-slider__dot${
              active === index ? ' is-active' : ''
            }`}
            aria-label={
              index === 0
                ? 'Üzvlük hero-su'
                : 'Sending Organization hero-su'
            }
            aria-pressed={active === index}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
