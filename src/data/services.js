import {
  Globe2,
  SearchCheck,
  Send,
  Compass,
  MessageSquareText,
  FileUser,
  BadgeCheck,
  FileSearch,
  PenLine,
  FileSignature,
  GraduationCap,
  Map,
  Stamp,
  Award,
  MessageCircleQuestion,
  Globe,
  FileText,
  MessageCircle,
  Users,
  Building2,
} from 'lucide-react'

export const SERVICE_META = {
  'erasmus-membership': { icon: Users, category: 'membership', key: 'erasmus_membership', hasNote: true },
  'sending-organization': { icon: Building2, category: 'membership', key: 'sending_organization', hasNote: true },

  'erasmus-consulting': { icon: Globe2, category: 'erasmus', key: 'erasmus_consulting' },
  'project-consulting': { icon: SearchCheck, category: 'erasmus', key: 'project_consulting' },
  application: { icon: Send, category: 'erasmus', key: 'application', hasNote: true },
  'erasmus-mentorship': { icon: Compass, category: 'erasmus', key: 'erasmus_mentorship' },
  'application-review': { icon: MessageSquareText, category: 'erasmus', key: 'application_review' },

  cv: { icon: FileUser, category: 'cv', key: 'cv' },
  europass: { icon: BadgeCheck, category: 'cv', key: 'europass' },
  'cv-review': { icon: FileSearch, category: 'cv', key: 'cv_review' },
  motivation: { icon: PenLine, category: 'cv', key: 'motivation', hasNote: true },
  recommendation: { icon: FileSignature, category: 'cv', key: 'recommendation', hasNote: true },

  'erasmus-mundus': { icon: GraduationCap, category: 'abroad', key: 'erasmus_mundus', hasNote: true },
  'study-abroad': { icon: Map, category: 'abroad', key: 'study_abroad', hasNote: true },
  'visa-support': { icon: Stamp, category: 'abroad', key: 'visa_support', hasNote: true },

  'un-certificates': { icon: Award, category: 'other', key: 'un_certificates' },
  other: { icon: MessageCircleQuestion, category: 'other', key: 'other' },
}

export const CATEGORY_META = [
  {
    id: 'membership',
    icon: Users,
    services: ['erasmus-membership', 'sending-organization'],
  },
  {
    id: 'erasmus',
    icon: Globe,
    services: [
      'erasmus-consulting',
      'project-consulting',
      'application',
      'erasmus-mentorship',
      'application-review',
    ],
  },
  {
    id: 'cv',
    icon: FileText,
    services: ['cv', 'europass', 'cv-review', 'motivation', 'recommendation'],
  },
  {
    id: 'abroad',
    icon: GraduationCap,
    services: ['erasmus-mundus', 'study-abroad', 'visa-support'],
  },
  {
    id: 'other',
    icon: MessageCircle,
    services: ['un-certificates', 'other'],
  },
]

export function buildServiceContent(t) {
  return Object.fromEntries(
    Object.entries(SERVICE_META).map(([id, meta]) => {
      const p = `svc_${meta.key}_`

      return [
        id,
        {
          icon: meta.icon,
          category: meta.category,
          title: t(`${p}title`),
          shortDesc: t(`${p}desc`),
          duration: t(`${p}duration`),
          format: t(`${p}format`),
          result: t(`${p}result`),
          primaryCta: t(`${p}cta`),
          audience: t(`${p}audience`),
          includes: t(`${p}includes`),
          note: meta.hasNote ? t(`${p}note`) : undefined,
        },
      ]
    })
  )
}

export function buildCategories(t) {
  return CATEGORY_META.map((cat) => ({
    ...cat,
    title: t(`svc_cat_${cat.id}`),
  }))
}