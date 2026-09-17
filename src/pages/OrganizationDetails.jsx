import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ActiveTabContent from '../components/organization/ActiveTabContent'
import ActivityHistory from '../components/organization/ActivityHistory'
import AboutSection from '../components/organization/AboutSection'
import Lightbox from '../components/organization/Lightbox'
import OrganizationHero from '../components/organization/OrganizationHero'
import OrganizationTabs, {
  TABS,
} from '../components/organization/OrganizationTabs'
import PastProjects from '../components/organization/PastProjects'
import ProjectModal from '../components/organization/ProjectModal'
import { organizationLogos } from '../data/organizationLogos'
import { t } from '../data/translations'
import { useLightbox } from '../hooks/useLightbox'
import { useOrganization } from '../hooks/useOrganization'

// Hələlik AZ
const lang = 'az'

// EcoHub üçün frontend-də saxlanılan aktiv layihə.
// Backend-ə keçdikdə bu, `organization.activeProjects`
// kimi API-dən gələ bilər.
function getActiveProjects(slug) {
  if (slug !== 'ecohub') return []

  return [
    {
      id: 'xezeri-qoruyaq-2026',
      title: 'Xəzəri Qoruyaq 2026',
      description:
        'Bu il də Xəzər dənizinin və sahil ərazilərinin qorunmasına töhfə vermək üçün “Xəzəri Qoruyaq” aksiyasında birlikdə oluruq.',
      date: '19 sentyabr',
      time: '09:00–13:00',
      additionalInfo: 'Nəqliyyat və qidalanma təşkilat tərəfindən qarşılanacaq.',
      applicationUrl: 'https://forms.gle/2Gf6pTq3gzxhbE4V9',
    },
  ]
}

export default function OrganizationDetails() {
  const { slug } = useParams()
  const { organization, loading, error } = useOrganization(slug)

  const [activeTab, setActiveTab] = useState(TABS.ACTIVE)
  const [selectedProject, setSelectedProject] = useState(null)

  const { lightbox, openLightbox, closeLightbox, showPrevImage, showNextImage } =
    useLightbox()

  if (loading) {
    return (
      <main className="organization-details">
        <div className="organization-details__container">
          <p>Yüklənir...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="organization-details">
        <div className="organization-details__container">
          <h1>Təşkilatı yükləmək mümkün olmadı</h1>

          <Link to="/opportunities" className="organization-details__back">
            ← {t('back_to_opportunities')}
          </Link>
        </div>
      </main>
    )
  }

  if (!organization) {
    return (
      <main className="organization-details">
        <div className="organization-details__container">
          <h1>{t('org_not_found')}</h1>

          <Link to="/opportunities" className="organization-details__back">
            ← {t('back_to_opportunities')}
          </Link>
        </div>
      </main>
    )
  }

  const {
    name,
    tagline,
    description,
    categories = [],
    website,
    instagram,
    facebook,
    linkedin,
    email,
    phone,
    location,
    logo,
    opportunities = [],
    pastProjects = [],
    activityHistory = [],
  } = organization

  const activeOpportunities = opportunities.length
  const activeProjects = getActiveProjects(slug)

  // Backend logo sahəsini bəzən tam URL,
  // bəzən sadəcə fayl adı kimi qaytara bilər.
  const resolvedLogo = logo ? organizationLogos[logo] || logo : null

  return (
    <main className="organization-details">
      <div className="organization-details__container">
        <Link to="/opportunities" className="organization-details__back">
          ← {t('back_to_opportunities')}
        </Link>

        <OrganizationHero
          name={name}
          tagline={tagline}
          resolvedLogo={resolvedLogo}
          activeOpportunities={activeOpportunities}
          website={website}
          instagram={instagram}
          linkedin={linkedin}
          facebook={facebook}
          email={email}
          phone={phone}
          categories={categories}
          lang={lang}
        />

        <OrganizationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === TABS.ACTIVE && (
          <ActiveTabContent
            opportunities={opportunities}
            activeProjects={activeProjects}
            lang={lang}
            onSelectProject={setSelectedProject}
          />
        )}

        {activeTab === TABS.PAST && (
          <PastProjects
            pastProjects={pastProjects}
            slug={slug}
            name={name}
            onOpenLightbox={openLightbox}
          />
        )}

        {activeTab === TABS.ABOUT && (
          <AboutSection
            description={description}
            location={location}
            email={email}
            phone={phone}
            website={website}
          />
        )}

        <ActivityHistory activityHistory={activityHistory} />
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Lightbox
        lightbox={lightbox}
        closeLightbox={closeLightbox}
        showPrevImage={showPrevImage}
        showNextImage={showNextImage}
      />
    </main>
  )
}
