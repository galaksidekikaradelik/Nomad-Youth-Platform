
import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'

import MembershipHero from './MembershipHero'

import '../style/index.css'

const SendingOrganizationHero = lazy(() =>
  import('./SendingOrganizationHero')
)

const INTERVAL_MS = 20000

export default function HomeHeroSlider() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [secondReady, setSecondReady] = useState(false)

  const timerRef = useRef(null)

  useEffect(() => {
    if (paused) return undefined

    timerRef.current = window.setInterval(() => {
      setActive(current => (current + 1) % 2)
    }, INTERVAL_MS)

    return () => {
      window.clearInterval(timerRef.current)
    }
  }, [paused])

  const goTo = index => {
    setActive(index)

    window.clearInterval(timerRef.current)

    if (!paused) {
      timerRef.current = window.setInterval(() => {
        setActive(current => (current + 1) % 2)
      }, INTERVAL_MS)
    }
  }

  useEffect(() => {
    if (active === 1 && !secondReady) {
      setSecondReady(true)
    }
  }, [active, secondReady])

  const showSecond = active === 1 && secondReady

  return (
    <div
      className="home-hero-slider"
      aria-label="Nomad Youth hero slider"
      aria-roledescription="carousel"
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

        {/* MEMBERSHIP HERO */}

        <div
          className={`home-hero-slider__slide${
            !showSecond ? ' is-active' : ''
          }`}
          aria-hidden={showSecond}
          inert={showSecond}
        >
          <MembershipHero />
        </div>

        {/* SENDING ORGANIZATION HERO */}

        {secondReady && (
          <div
            className={`home-hero-slider__slide${
              showSecond ? ' is-active' : ''
            }`}
            aria-hidden={!showSecond}
            inert={!showSecond}
          >
            <Suspense fallback={null}>
              <SendingOrganizationHero />
            </Suspense>
          </div>
        )}
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