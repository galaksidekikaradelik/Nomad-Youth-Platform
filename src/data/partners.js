import sossferaLogo from '../assets/teskilatlar/logo/sosfera.webp'
import mzbLogo from '../assets/teskilatlar/logo/mzb.webp' 
import yspLogo from '../assets/teskilatlar/logo/YSP.webp' 
import bhosLogo from '../assets/teskilatlar/logo/bhos.webp'
import ywcLogo from '../assets/teskilatlar/logo/youthsy.webp'
import sdgLogo from '../assets/teskilatlar/logo/sdg-logo-əsas-versiya.webp'
import gprintLogo from '../assets/teskilatlar/logo/greenprint.webp'
import ecohubLogo from '../assets/teskilatlar/logo/ecohub.webp'
import y32Logo from '../assets/teskilatlar/logo/y32.webp'
import artemisLogo from '../assets/teskilatlar/logo/artemis.webp'
import cukurovaLogo from '../assets/teskilatlar/logo/cukurova.webp'
import anousLogo from '../assets/teskilatlar/logo/anous.webp'
import esngeorgiaLogo from '../assets/teskilatlar/logo/esngeorgia.webp'


export const INTERNATIONAL_PARTNERS = [
  { id: 'intl-1', 
    name: 'Youth32 ', 
    place: 'Türkiyə', 
    logo:  y32Logo 
  },

  { id: 'intl-2', 
    name: 'A NOUS – Maison des Associations', 
    place: 'Fransa', 
    logo: anousLogo
    
  },

  { id: 'intl-3', 
    name: 'Artemis Gençlik Derneği', 
    place: 'Türkiyə', 
    logo: artemisLogo
  },

  { id: 'intl-4', 
    name: 'Erasmus Student Network (ESN) Georgia', 
    place: 'Gürcüstan', 
    logo: esngeorgiaLogo
  },

  { id: 'intl-5', 
    name: 'Çukurova Gelecek Nesil Gençlik Derneği', 
    place: 'Türkiyə', 
    logo: cukurovaLogo
    
  },
]

export const LOCAL_PARTNERS = [
  {
    id: 'local-1',
    name: 'EcoHub Ekoloji Təşəbbüslərə Dəstək İctimai Birliyi', 
    place: 'Bakı, Azərbaycan', 
    logo: ecohubLogo
  },

  { 
    id: 'local-2',
    name: 'SDG Youth Community', 
    place: 'Bakı, Azərbaycan', 
    logo: sdgLogo
  },

  { 
    id: 'local-3', 
    name: 'Youth Sound Platform', 
    place: 'Bakı, Azərbaycan', 
    logo: yspLogo
  },

  { 
    id: 'local-4', 
    name: 'BHOS Career Club', 
    place: 'Bakı, Azərbaycan', 
    logo: bhosLogo
  },

  { 
    id: 'local-5', 
    name: 'Youth Way Community', 
    place: 'Bakı, Azərbaycan', 
    logo: ywcLogo
  },

  { 
    id: 'local-6', 
    name: 'SOSSFERA',
    place: 'Bakı, Azərbaycan',
    logo: sossferaLogo
  },

  { 
    id: 'local-7', 
    name: 'Greenprint', 
    place: 'Bakı, Azərbaycan', 
    logo: gprintLogo
  },

  { 
    id: 'local-8', 
    name: 'Məqsəd Zəfərin Başlanğıcıdır Təşkilatı (MZB)', 
    place: 'Bakı, Azərbaycan', 
    logo: mzbLogo
  },

]

// "Müraciət et" düyməsinin getdiyi daxili səhifə.
export const PARTNER_APPLY_URL = '/contact'