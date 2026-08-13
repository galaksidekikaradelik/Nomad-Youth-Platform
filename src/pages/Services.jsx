import { useState, useEffect } from 'react'
import {
  FileText,
  BadgeCheck,
  Search,
  PenTool,
  ClipboardCheck,
  Send,
  CheckCircle2,
  Compass,
  Globe,
  ScrollText,
  MessageCircle,
  GraduationCap,
  UsersRound,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from '../hooks/useLanguage'
import ServicePopupModal from '../components/ServicePopupModal'
import { trackServiceView, trackServiceClick } from '../services/analytics'


const SERVICES = [
  { id: 'erasmus-consulting', icon: Globe,          titleKey: 'service_erasmus_consulting_title', descKey: 'service_erasmus_consulting_desc', featuresKey: 'service_erasmus_consulting_features' },
  { id: 'project-consulting', icon: Compass,        titleKey: 'service_project_consulting_title', descKey: 'service_project_consulting_desc', featuresKey: 'service_project_consulting_features' },
  { id: 'cv',                 icon: FileText,       titleKey: 'service_cv_title',                 descKey: 'service_cv_desc',                 featuresKey: 'service_cv_features' },
  { id: "erasmus-mentorship", icon: UsersRound,     titleKey: "service_erasmus_mentorship_title", descKey: "service_erasmus_mentorship_desc", featuresKey: 'service_erasmus_mentorship_features' },
  { id: "visa-support",       icon: ShieldCheck,    titleKey: "service_visa_support_title",       descKey: "service_visa_support_desc",       featuresKey: 'service_visa_support_features' },
  { id: "erasmus-mundus",     icon: GraduationCap,  titleKey: "service_erasmus_mundus_title",     descKey: "service_erasmus_mundus_desc",     featuresKey: 'service_erasmus_mundus_features' },
  { id: 'europass',           icon: BadgeCheck,     titleKey: 'service_europass_title',           descKey: 'service_europass_desc',           featuresKey: 'service_europass_features' },
  { id: 'study-abroad',       icon: GraduationCap,  titleKey: 'service_study_abroad_title',       descKey: 'service_study_abroad_desc',       featuresKey: 'service_study_abroad_features' },
  { id: 'cv-review',          icon: Search,         titleKey: 'service_cv_review_title',          descKey: 'service_cv_review_desc',          featuresKey: 'service_cv_review_features' },
  { id: 'motivation',         icon: PenTool,        titleKey: 'service_motivation_title',         descKey: 'service_motivation_desc',         featuresKey: 'service_motivation_features' },
  { id: 'recommendation',     icon: ClipboardCheck, titleKey: 'service_recommendation_title',     descKey: 'service_recommendation_desc',     featuresKey: 'service_recommendation_features' },
  { id: 'application',        icon: Send,           titleKey: 'service_application_title',        descKey: 'service_application_desc',        featuresKey: 'service_application_features' },
  { id: 'application-review', icon: CheckCircle2,   titleKey: 'service_application_review_title', descKey: 'service_application_review_desc', featuresKey: 'service_application_review_features' },
  { id: "un-certificates",    icon: ScrollText,     titleKey: "service_un_certificates_title",    descKey: "service_un_certificates_desc",    featuresKey: 'service_un_certificates_features' },
  { id: 'other',              icon: MessageCircle,  titleKey: 'service_other_title',              descKey: 'service_other_desc',              featuresKey: 'service_other_features' },
]

export default function Services() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(null)

  const raw = SERVICES.find(s => s.id === selected)
  const selectedService = raw
    ? { ...raw, title: t(raw.titleKey), desc: t(raw.descKey), features: t(raw.featuresKey) }
    : null

  useEffect(() => {
    // popup həqiqətən açılanda "baxış" kimi izlənir
    if (selectedService) {
      trackServiceView(selectedService)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <div className="section">
      <div className="container">

        <div className="page-header">
          <div className="page-header__eyebrow">{t('services_eyebrow')}</div>
          <h1 className="page-header__title">{t('services_title')}</h1>
          <p className="page-header__desc">{t('services_desc')}</p>
        </div>

        <div className="grid-3" style={{ marginBottom: 'var(--space-2xl)' }}>
          {SERVICES.map(s => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
                className="category-card"
                onClick={() => {
                  trackServiceClick({ id: s.id, title: t(s.titleKey) })
                  setSelected(s.id)
                }}
                style={{ width: '100%', cursor: 'pointer' }}
              >
                <div className="category-card__icon service-icon-badge service-icon-badge--card">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div className="category-card__name">{t(s.titleKey)}</div>
                <div className="category-card__count">{t(s.descKey)}</div>
              </button>
            )
          })}
        </div>

        <ServicePopupModal
          service={selectedService}
          onClose={() => setSelected(null)}
        />

      </div>
    </div>
  )
}