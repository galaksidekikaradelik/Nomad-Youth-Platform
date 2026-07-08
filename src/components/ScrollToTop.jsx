import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Hər route dəyişəndə səhifəni yuxarı sürüşdürür.
// React Router səhifəni "yenidən yükləmədiyi" üçün scroll mövqeyi
// default olaraq saxlanılır — bunu manual sıfırlamaq lazımdır.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}