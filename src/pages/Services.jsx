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
  { id: 'erasmus-consulting', icon: Globe,          titleKey: 'service_erasmus_consulting_title', descKey: 'service_erasmus_consulting_desc' },
  { id: 'project-consulting', icon: Compass,        titleKey: 'service_project_consulting_title', descKey: 'service_project_consulting_desc' },
  { id: 'cv',                 icon: FileText,       titleKey: 'service_cv_title',                 descKey: 'service_cv_desc' },
  { id: "erasmus-mentorship", icon: UsersRound,     titleKey: "service_erasmus_mentorship_title", descKey: "service_erasmus_mentorship_desc"},
  { id: "visa-support",        icon: ShieldCheck,       titleKey: "service_visa_support_title",       descKey: "service_visa_support_desc" },
  { id: "erasmus-mundus",     icon: GraduationCap,  titleKey: "service_erasmus_mundus_title",     descKey: "service_erasmus_mundus_desc" },
  { id: 'europass',           icon: BadgeCheck,     titleKey: 'service_europass_title',           descKey: 'service_europass_desc' },
  { id: 'study-abroad',       icon: GraduationCap,  titleKey: 'service_study_abroad_title',       descKey: 'service_study_abroad_desc' },
  { id: 'cv-review',          icon: Search,         titleKey: 'service_cv_review_title',          descKey: 'service_cv_review_desc' },
  { id: 'motivation',         icon: PenTool,        titleKey: 'service_motivation_title',         descKey: 'service_motivation_desc' },
  { id: 'recommendation',     icon: ClipboardCheck, titleKey: 'service_recommendation_title',     descKey: 'service_recommendation_desc' },
  { id: 'application',        icon: Send,           titleKey: 'service_application_title',        descKey: 'service_application_desc' },
  { id: 'application-review', icon: CheckCircle2,   titleKey: 'service_application_review_title', descKey: 'service_application_review_desc' },
  { id: "un-certificates",    icon: ScrollText,          titleKey: "service_un_certificates_title",    descKey: "service_un_certificates_desc" },  
  { id: 'other',              icon: MessageCircle,  titleKey: 'service_other_title',              descKey: 'service_other_desc' },
  
]

export default function Services() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(null)

  const raw = SERVICES.find(s => s.id === selected)
  const selectedService = raw
    ? { ...raw, title: t(raw.titleKey), desc: t(raw.descKey) }
    : null

  useEffect(() => {
    if (selectedService) {
      trackServiceView(selectedService)
    }
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