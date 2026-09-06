import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    const prevPathname = prevPathnameRef.current
    prevPathnameRef.current = pathname
    const isOpportunitiesInternalTransition =
      prevPathname.startsWith('/opportunities') &&
      pathname.startsWith('/opportunities')

    if (isOpportunitiesInternalTransition) {
      return
    }

    window.scrollTo(0, 0)
  }, [pathname])

  return null
}