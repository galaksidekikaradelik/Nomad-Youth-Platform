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

        {/* CLOSE */}
        <button
          className="ny-close"
          onClick={onClose}
          aria-label="Bağla"
        >
          <X size={18} />
        </button>


        {/* HEADER */}
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


        {/* COLUMNS */}
        <div className="ny-cols">

          {/* AUDIENCE */}
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


          {/* INCLUDES */}
          <div>

            <h3 className="ny-col-title">
              Nə əldə edəcəksən?
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


        


        {/* NOTE */}
        {service.note && (
          <p className="ny-note">
            {service.note}
          </p>
        )}


        {/* ACTIONS */}
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

  /*
   * Erasmus ilk açılışda aktivdir
   */
  const [activeCategory, setActiveCategory] =
    useState('erasmus')

  const [selectedId, setSelectedId] =
    useState(null)


  const servicesRef = useRef(null)


  const selected = selectedId
    ? SERVICE_CONTENT[selectedId]
    : null


  const category = CATEGORIES.find(
    (c) => c.id === activeCategory
  )


  /*
   * Kateqoriyalar hissəsinə scroll
   */
  const scrollToCategories = () => {

    document
      .querySelector('.ny-cat-grid')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

  }


  /*
   * Kateqoriya seçilməsi
   */
  const handleCategoryClick = (categoryId) => {

    /*
     * Eyni kateqoriyaya yenidən basılıbsa
     * bağla
     */
    if (activeCategory === categoryId) {

      setActiveCategory(null)

      return
    }


    /*
     * Yeni kateqoriyanı aç
     */
    setActiveCategory(categoryId)
  }


  /*
   * Kateqoriya dəyişəndə xidmətlərə scroll
   */
  useEffect(() => {

    if (
      !activeCategory ||
      !servicesRef.current
    ) {
      return
    }


    const timer = setTimeout(() => {

      servicesRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

    }, 100)


    return () => clearTimeout(timer)

  }, [activeCategory])


  return (
    <>
      <Navbar />


      <div className="ny-page">


        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="ny-hero">

          <div className="ny-hero-inner">

            <div>

              <span className="ny-pill">
                Hədəfinə uyğun dəstək
              </span>


              <h1 className="ny-hero-title">

                Doğru fürsəti seç,
                <br />
                güclü müraciətlə fərqlən.

              </h1>


              <p className="ny-hero-desc">

                Erasmus+, ESC, CV və xaricdə təhsil üçün
                ehtiyacına uyğun xidməti seç, prosesə daha
                hazırlıqlı başla.

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


            {/* STATS */}

            <div className="ny-stats-banner">

              <ul className="ny-side-list">

                <li>

                  <span className="ny-side-dot-title">
                    100+
                  </span>

                  <span className="ny-side-dot">
                    gəncin inkişaf yolunda yanında
                  </span>

                </li>


                <li>

                  <span className="ny-side-dot-title">
                    4 istiqamət
                  </span>

                  <span className="ny-side-dot">
                    Hədəfinə uyğun seçim
                  </span>

                </li>


                <li>

                  <span className="ny-side-dot-title">
                    15 xidmət
                  </span>

                  <span className="ny-side-dot">
                    Praktik dəstək formatı
                  </span>

                </li>


                <li>

                  <span className="ny-side-dot-title">
                    24 saat
                  </span>

                  <span className="ny-side-dot">
                    Sorğulara geri dönüş müddəti
                  </span>

                </li>

              </ul>

            </div>

          </div>

        </section>



        {/* =====================================================
            CATEGORIES
        ====================================================== */}

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
                      ? 'Xidmətləri bağla'
                      : 'Xidmətlərə bax'}

                    <ArrowRight size={14} />

                  </span>

                </button>

              )
            })}

          </div>

        </section>



        {/* =====================================================
            SERVICES
        ====================================================== */}

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

                    {/* SERVICE ICON */}

                    <div className="ny-icon-badge">

                      <Icon
                        size={22}
                        strokeWidth={1.8}
                      />

                    </div>


                    {/* TITLE */}

                    <div className="ny-card-title">

                      {service.title}

                    </div>


                    {/* DESCRIPTION */}

                    <div className="ny-card-desc">

                      {service.shortDesc}

                    </div>


                    {/* LINK */}

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



        {/* =====================================================
            MODAL
        ====================================================== */}

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