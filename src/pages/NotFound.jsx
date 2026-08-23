import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="section">
      <div className="container">
        <div className="empty-state">
          <div className="empty-state__title">
            404
          </div>

          <p className="empty-state__desc">
            Axtardığınız səhifə tapılmadı.
          </p>

          <Link to="/" className="btn">
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    </div>
  )
}