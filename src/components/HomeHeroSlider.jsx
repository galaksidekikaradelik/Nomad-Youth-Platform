
import { useEffect, useState } from 'react'

import MembershipHero from './MembershipHero'
import SendingOrganizationHero from './SendingOrganizationHero'

import '../style/index.css'

const INTERVAL_MS = 20000

export default function HomeHeroSlider() {
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined

    const timer = window.setInterval(() => {
      setActive(current => (current + 1) % 2)
    }, INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [paused, cycle])

  function goTo(index) {
    setActive(index)
    setCycle(value => value + 1)
  }

  return (
    <div
      className="home-hero-slider"
      aria-label="Nomad Youth hero slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={event => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget
          )
        ) {
          setPaused(false)
        }
      }}
    >
      <div className="home-hero-slider__slides">
        <div
          className={`home-hero-slider__slide${
            active === 0 ? ' is-active' : ''
          }`}
          aria-hidden={active !== 0}
          inert={active !== 0 ? true : undefined}
        >
          <MembershipHero />
        </div>

        <div
          className={`home-hero-slider__slide${
            active === 1 ? ' is-active' : ''
          }`}
          aria-hidden={active !== 1}
          inert={active !== 1 ? true : undefined}
        >
          <SendingOrganizationHero />
        </div>
      </div>

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
