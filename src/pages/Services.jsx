import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  X,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import {
  SERVICE_CONTENT,
  CATEGORIES,
} from '../data/services'
import { buildWhatsAppLink } from '../config/whatsapp'


function ServiceModal({ service, onClose }) {
  if (!service) return null

  const Icon = service.icon

  const handleWhatsApp = () => {
    const message =
      `Salam, Nomad Youth!\n\n` +
      `“${service.title}” xidməti ilə maraqlanıram.\n` +
      `Xidmət barədə daha ətraflı məlumat və müraciət etmək istəyirəm.`

    window.open(
      buildWhatsAppLink(message),
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div
      className="ny-overlay"
      onClick={onClose}
    >
      <div
        className="ny-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="ny-close"
          onClick={onClose}
          aria-label="Bağla"
        >
          <X size={18} />
        </button>

        <div className="ny-modal-head">

          <div className="ny-modal-icon">
            <Icon
              size={26}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h2 className="ny-modal-title">
              {service.title}
            </h2>

            <p className="ny-modal-desc">
              {service.shortDesc}
            </p>
          </div>

        </div>

        <div className="ny-tags">

          <span className="ny-tag ny-tag--duration">
            {service.duration}
          </span>

          <span className="ny-tag ny-tag--format">
            {service.format}
          </span>

          <span className="ny-tag ny-tag--result">
            {service.result}
          </span>

        </div>

        <div className="ny-cols">

          <div>

            <h3 className="ny-col-title">
              Bu xidmət kimə uyğundur?
            </h3>

            <ul className="ny-list">

              {service.audience.map((item) => (
                <li key={item}>

                  <span className="ny-dot" />

                  {item}

                </li>
              ))}

            </ul>

          </div>

          <div>

            <h3 className="ny-col-title">
              Nə əldə edəcəksiniz?
            </h3>

            <ul className="ny-list">

              {service.includes.map((item) => (
                <li key={item}>

                  <Check
                    size={15}
                    className="ny-check"
                  />

                  {item}

                </li>
              ))}

            </ul>

          </div>

        </div>

        {service.note && (
          <p className="ny-note">
            {service.note}
          </p>
        )}

        <div className="ny-actions">

          <button
            className="ny-btn ny-btn--primary ny-modal-btn"
            onClick={handleWhatsApp}
          >
            {service.primaryCta}
          </button>

        </div>

        <p className="ny-fineprint">
          Sorğu qəbul edildikdən sonra 24 saat ərzində
          əlaqə saxlanılır.
        </p>

      </div>
    </div>
  )
}


export default function NomadYouthServices() {

  const [activeCategory, setActiveCategory] =
    useState('membership')

  const [selectedId, setSelectedId] =
    useState(null)

  const servicesRef = useRef(null)


  const selected = selectedId
    ? SERVICE_CONTENT[selectedId]
    : null


  const category = CATEGORIES.find(
    (c) => c.id === activeCategory
  )


  
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    )

    const categoryFromUrl =
      params.get('category')

    const shouldOpenService =
      params.get('open') === '1'

    const exists = CATEGORIES.some(
      (c) => c.id === categoryFromUrl
    )

    const targetCategory = exists
      ? categoryFromUrl
      : 'membership'

    setActiveCategory(targetCategory)

    
    if (shouldOpenService) {
      const categoryData = CATEGORIES.find(
        (c) => c.id === targetCategory
      )

      const firstServiceId =
        categoryData?.services?.[0]

      if (
        firstServiceId &&
        SERVICE_CONTENT[firstServiceId]
      ) {
        setSelectedId(firstServiceId)
      }
    }
  }, [])


  const scrollToCategories = () => {

    document
      .querySelector('.ny-cat-grid')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

  }


  const handleCategoryClick = (categoryId) => {

    setActiveCategory(categoryId)

    const params = new URLSearchParams(
      window.location.search
    )

    params.set(
      'category',
      categoryId
    )

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    )

  }


  useEffect(() => {

    if (
      !activeCategory ||
      !servicesRef.current
    ) {
      return
    }

    /*
     * İlk açılışda səhifəni avtomatik
     * aşağı sürüşdürmürük.
     *
     * Yalnız istifadəçi kateqoriyaya klik etdikdə
     * aşağı keçid edilir.
     */
  }, [activeCategory])


  return (
    <>
      <Navbar />

      <div className="ny-page">

        {/* HERO */}

        <section className="ny-hero">

          <div className="ny-hero-inner">

            <div>

              <span className="ny-pill">
                Ehtiyacına uyğun dəstək
              </span>

              <h1 className="ny-hero-title">
                Ehtiyacınıza uyğun dəstəyi
                <br />
                bir yerdə tapın.
              </h1>

              <p className="ny-hero-desc">
                Erasmus+, üzvlük, sənədlər və xaricdə
                təhsil üzrə ehtiyacınıza uyğun dəstəyi
                seçin və növbəti addımınızı daha rahat
                planlaşdırın.
              </p>

              <div className="ny-hero-actions">

                <button
                  className="ny-btn ny-btn--primary"
                  onClick={scrollToCategories}
                >
                  Xidmətləri kəşf et →
                </button>

              </div>

            </div>

            <div className="ny-stats-banner">

              <ul className="ny-side-list">

                <li>

                  <span className="ny-side-dot-title">
                    5 istiqamət
                  </span>

                  <span className="ny-side-dot">
                    Müxtəlif ehtiyaclar üçün seçim
                  </span>

                </li>

                <li>

                  <span className="ny-side-dot-title">
                    Üzvlük
                  </span>

                  <span className="ny-side-dot">
                    Erasmus+ iştirakçı bazasına çıxış
                  </span>

                </li>

                <li>

                  <span className="ny-side-dot-title">
                    Erasmus+
                  </span>

                  <span className="ny-side-dot">
                    Layihə və təşkilati dəstək
                  </span>

                </li>

                <li>

                  <span className="ny-side-dot-title">
                    Xaricdə təhsil
                  </span>

                  <span className="ny-side-dot">
                    Təhsil yolunda əlavə dəstək
                  </span>

                </li>

              </ul>

            </div>

          </div>

        </section>


        {/* CATEGORY CARDS */}

        <section className="ny-container">

          <div className="ny-cat-grid">

            {CATEGORIES.map((c) => {

              const Icon = c.icon

              const isActive =
                activeCategory === c.id

              return (

                <button
                  key={c.id}
                  className={`ny-card ${
                    isActive
                      ? 'ny-card--active'
                      : ''
                  }`}
                  onClick={() =>
                    handleCategoryClick(c.id)
                  }
                >

                  <div className="ny-icon-badge">

                    {Icon ? (
                      <Icon
                        size={22}
                        strokeWidth={1.8}
                      />
                    ) : null}

                  </div>

                  <div className="ny-card-title">
                    {c.title}
                  </div>

                  <div className="ny-card-desc">
                    {c.services.length} xidmət
                  </div>

                  <span className="ny-card-link">

                    {isActive
                      ? 'Xidmətləri göstərilir'
                      : 'Xidmətlərə bax'}

                    <ArrowRight size={14} />

                  </span>

                </button>

              )
            })}

          </div>

        </section>


        {/* SERVICES */}

        {activeCategory && category && (

          <section
            ref={servicesRef}
            className="ny-container ny-services-section"
          >

            <h2 className="ny-section-title">
              {category.title}
            </h2>

            <p className="ny-section-sub">
              {category.services.length} xidmət
            </p>

            <div className="ny-grid">

              {category.services.map((id) => {

                const service =
                  SERVICE_CONTENT[id]

                if (!service) return null

                const Icon = service.icon

                return (

                  <button
                    key={id}
                    className="ny-card"
                    onClick={() =>
                      setSelectedId(id)
                    }
                  >

                    <div className="ny-icon-badge">

                      <Icon
                        size={22}
                        strokeWidth={1.8}
                      />

                    </div>

                    <div className="ny-card-title">
                      {service.title}
                    </div>

                    <div className="ny-card-desc">
                      {service.shortDesc}
                    </div>

                    <span className="ny-card-link">

                      Ətraflı bax

                      <ArrowRight size={14} />

                    </span>

                  </button>

                )

              })}

            </div>

          </section>

        )}


        {/* MODAL */}

        <ServiceModal
          service={selected}
          onClose={() =>
            setSelectedId(null)
          }
        />

      </div>
    </>
  )
}
