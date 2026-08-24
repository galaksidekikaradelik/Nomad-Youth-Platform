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
} from 'lucide-react'

export const SERVICE_CONTENT = {
  'erasmus-consulting': {
    icon: Globe2,
    category: 'erasmus',
    title: 'Erasmus+ və ESC konsultasiyası',
    shortDesc:
      'Erasmus+ və ESC imkanlarını daha yaxşı anlayın, profilinizə uyğun istiqaməti müəyyənləşdirin və növbəti addımlarınızı aydınlaşdırın.',
    duration: '30–45 dəqiqə',
    format: 'Onlayn və ya əyani',
    result: 'Fərdi fəaliyyət planı',
    primaryCta: 'Konsultasiya üçün müraciət edin',
    audience: [
      'Erasmus+ və ESC-yə ilk dəfə müraciət edənlərə',
      'Hansı proqram və layihə növünün özünə uyğun olduğunu bilməyənlərə',
      'Haradan başlayacağını müəyyənləşdirmək istəyənlərə',
    ],
    includes: [
      'Məqsəd və gözləntilərin qısa analizi',
      'Profilinizə uyğun imkan və istiqamətlərin izahı',
      'Sizə uyğun layihə növləri üzrə tövsiyələr',
      'Növbəti addımlar üçün yazılı fəaliyyət planı',
    ],
  },

  'project-consulting': {
    icon: SearchCheck,
    category: 'erasmus',
    title: 'Beynəlxalq imkanların seçilməsi',
    shortDesc:
      'Profilinizə, maraqlarınıza və məqsədlərinizə uyğun beynəlxalq imkanları sizin üçün araşdıraq və ən uyğun variantları seçək.',
    duration: '2–3 iş günü',
    format: 'Onlayn',
    result: '3–5 uyğun imkan və seçim tövsiyəsi',
    primaryCta: 'Mənə uyğun imkanları tapın',
    audience: [
      'Çoxsaylı imkanlar arasında seçim etməkdə çətinlik çəkənlərə',
      'Öz profilinə həqiqətən uyğun imkanları görmək istəyənlərə',
      'Uyğun olmayan müraciətlərə vaxt itirmək istəməyənlərə',
    ],
    includes: [
      'Profil və maraqlarınızın analizi',
      'Aktiv imkanların sizin üçün uyğunluq yoxlanması',
      '3–5 uyğun imkanın qısa siyahısı',
      'Hər imkan üzrə əsas tələblər, üstünlüklər və son tarixlər',
    ],
  },

  application: {
    icon: Send,
    category: 'erasmus',
    title: 'Beynəlxalq imkanlara müraciət dəstəyi',
    shortDesc:
      'Seçdiyiniz beynəlxalq imkana müraciətinizi daha sistemli və dolğun hazırlamaq üçün addım-addım dəstək alın.',
    duration: 'Son tarixə uyğun plan',
    format: 'Onlayn və ya əyani',
    result: 'Tam müraciət yoxlanışı',
    primaryCta: 'Müraciət dəstəyi alın',
    audience: [
      'Müraciət etmək istədiyi konkret proqramı seçənlərə',
      'Müraciət formasını daha düzgün və dolğun hazırlamaq istəyənlərə',
      'Göndərməzdən əvvəl son yoxlamaya ehtiyacı olanlara',
    ],
    includes: [
      'Elan və uyğunluq şərtlərinin analizi',
      'Fərdi müraciət planı və tələb olunan sənədlərin siyahısı',
      'Müraciət cavablarının məzmun və dil baxımından yoxlanması',
      'Göndərməzdən əvvəl yekun keyfiyyət yoxlaması',
    ],
    note:
      'Qəbul və ya seçim nəticəsinə zəmanət verilmir. Yekun qərar proqram təşkilatçılarına məxsusdur.',
  },

  'erasmus-mentorship': {
    icon: Compass,
    category: 'erasmus',
    title: 'Erasmus+ mentorluğu',
    shortDesc:
      'Erasmus+ məqsədiniz üzərində bir ay ərzində sistemli işləyin. Fərdi plan, müntəzəm geribildirim və mərhələli istiqamətləndirmə ilə prosesi bizimlə birlikdə idarə edin.',
    duration: '1 ay',
    format: 'Onlayn və ya əyani',
    result: 'Fərdi plan və həftəlik müşayiət',
    primaryCta: 'Mentorluğa başlayın',
    audience: [
      'Erasmus+ üçün sistemli şəkildə hazırlaşmaq istəyənlərə',
      'Proses boyunca fərdi müşayiətə ehtiyacı olanlara',
      'Bir neçə müraciəti paralel şəkildə planlaşdıranlara',
    ],
    includes: [
      'Başlanğıc profil və məqsəd qiymətləndirməsi',
      'Bir aylıq fərdi fəaliyyət planı',
      'Həftəlik irəliləyiş yoxlaması',
      'Proses boyunca mərhələli geribildirim və istiqamətləndirmə',
    ],
  },

  'application-review': {
    icon: MessageSquareText,
    category: 'erasmus',
    title: 'Erasmus+ müsahibə və layihəyə hazırlıq',
    shortDesc:
      'Seçim müsahibəsinə daha inamlı hazırlaşın, sizi gözləyən prosesi əvvəlcədən anlayın və layihəyə hazırlığınızı tamamlayın.',
    duration: '60 dəqiqə',
    format: 'Onlayn və ya əyani',
    result: 'Sınaq müsahibəsi və hazırlıq siyahısı',
    primaryCta: 'Müsahibəyə hazırlaşın',
    audience: [
      'Müsahibəyə dəvət alanlara',
      'Öz motivasiyasını və təcrübəsini daha yaxşı təqdim etmək istəyənlərə',
      'Seçim və layihəyə hazırlıq mərhələsinə keçənlərə',
    ],
    includes: [
      'Elan və profilinizin qısa analizi',
      'Ehtimal olunan müsahibə mövzuları və suallar',
      'Sınaq müsahibəsi və fərdi geribildirim',
      'Layihəyə hazırlıq üçün praktiki yoxlama siyahısı',
    ],
  },

  cv: {
    icon: FileUser,
    category: 'cv',
    title: 'CV hazırlanması',
    shortDesc:
      'Təhsiliniz, təcrübəniz və bacarıqlarınızı aydın və peşəkar şəkildə təqdim edən, müraciət məqsədinizə uyğun CV hazırlayaq.',
    duration: '2 iş günü',
    format: 'Onlayn',
    result: 'Redaktə edilə bilən CV və PDF',
    primaryCta: 'CV-mi hazırlamağa başlayın',
    audience: [
      'İlk CV-sini hazırlayanlara',
      'Mövcud CV-sini tam yeniləmək istəyənlərə',
      'Beynəlxalq proqram və iş müraciətlərinə hazırlaşanlara',
    ],
    includes: [
      'Müraciət məqsədinizin müəyyənləşdirilməsi',
      'Təhsil və təcrübənizin düzgün strukturlaşdırılması',
      'Nailiyyət və bacarıqlarınızın daha konkret ifadəsi',
      'Bir düzəliş mərhələsi, redaktə edilə bilən fayl və PDF',
    ],
  },

  europass: {
    icon: BadgeCheck,
    category: 'cv',
    title: 'Europass CV hazırlanması',
    shortDesc:
      'Avropa proqramları, təhsil və iş müraciətləri üçün Europass strukturuna uyğun, səliqəli və aydın CV hazırlayaq.',
    duration: '2 iş günü',
    format: 'Onlayn',
    result: 'Europass formatında CV və PDF',
    primaryCta: 'Europass CV-mi hazırlat',
    audience: [
      'Erasmus+, ESC və Avropa proqramlarına müraciət edənlərə',
      'Europass formatı tələb olunan elanlara hazırlaşanlara',
      'Məlumatlarını beynəlxalq standarta uyğunlaşdırmaq istəyənlərə',
    ],
    includes: [
      'Məlumatların Europass bölmələrinə uyğun strukturlaşdırılması',
      'Beynəlxalq müraciətlərə uyğun yazım',
      'Bacarıq və təcrübələrin daha aydın təqdimatı',
      'Bir düzəliş mərhələsi və PDF versiyası',
    ],
  },

  'cv-review': {
    icon: FileSearch,
    category: 'cv',
    title: 'CV yoxlanışı',
    shortDesc:
      'Mövcud CV-nizin məzmun, struktur və təqdimat baxımından güclü və zəif tərəflərini müəyyənləşdirin və konkret təkmilləşdirmə tövsiyələri alın.',
    duration: '48 saat',
    format: 'Onlayn',
    result: 'Yazılı rəy və düzəliş qeydləri',
    primaryCta: 'CV-nizi yoxlatdırın',
    audience: [
      'CV-sinin nə dərəcədə güclü olduğundan əmin olmayanlara',
      'Peşəkar ikinci rəy almaq istəyənlərə',
      'CV-sini konkret müraciətə uyğunlaşdırmaq istəyənlərə',
    ],
    includes: [
      'Struktur və oxunaqlılığın yoxlanılması',
      'Məzmun və ifadə dilinin qiymətləndirilməsi',
      'Hədəf müraciətə uyğunluq üzrə tövsiyələr',
      'Prioritetləşdirilmiş yazılı geribildirim',
    ],
  },

  motivation: {
    icon: PenLine,
    category: 'cv',
    title: 'Motivasiya məktubu dəstəyi',
    shortDesc:
      'Motivasiyanızı, təcrübənizi və məqsədlərinizi konkret proqrama uyğun, inandırıcı və sizə məxsus formada ifadə etməyə dəstək alın.',
    duration: '2–3 iş günü',
    format: 'Onlayn',
    result: 'Fərdiləşdirilmiş məktub və 1 düzəliş',
    primaryCta: 'Motivasiya məktubu dəstəyi alın',
    audience: [
      'Təhsil, təqaüd və beynəlxalq proqramlara müraciət edənlərə',
      'Fikirlərini strukturlaşdırmaqda çətinlik çəkənlərə',
      'Mövcud məktubunu konkret proqrama uyğunlaşdırmaq istəyənlərə',
    ],
    includes: [
      'Elan və qiymətləndirmə meyarlarının analizi',
      'Təcrübə, motivasiya və məqsədlərinizin strukturlaşdırılması',
      'Proqrama uyğun fərdiləşdirilmiş mətn',
      'Bir düzəliş mərhələsi',
    ],
    note:
      'Yalnız sizin təqdim etdiyiniz real məlumatlardan istifadə olunur; uydurma təcrübə və nailiyyət əlavə edilmir.',
  },

  recommendation: {
    icon: FileSignature,
    category: 'cv',
    title: 'Tövsiyə məktubu dəstəyi',
    shortDesc:
      'Tövsiyə verən şəxsin sizi konkret nümunələrlə daha aydın təqdim edə bilməsi üçün məktubun strukturlaşdırılmasına və redaktəsinə dəstək alın.',
    duration: '2 iş günü',
    format: 'Onlayn',
    result: 'Strukturlaşdırılmış layihə və 1 düzəliş',
    primaryCta: 'Tövsiyə məktubu dəstəyi alın',
    audience: [
      'Təhsil və təqaüd proqramlarına müraciət edənlərə',
      'Tövsiyə verən şəxs üçün struktur hazırlamaq istəyənlərə',
      'Mövcud məktubu təkmilləşdirmək istəyənlərə',
    ],
    includes: [
      'Müraciət tələblərinin analizi',
      'Tövsiyə verəndən tələb olunan məlumatların siyahısı',
      'Konkret nümunələrə əsaslanan struktur',
      'Bir düzəliş mərhələsi',
    ],
    note:
      'Yekun məktub tövsiyə verən şəxsin real fikrini əks etdirməli və onun tərəfindən təsdiqlənməlidir.',
  },

  'erasmus-mundus': {
    icon: GraduationCap,
    category: 'abroad',
    title: 'Erasmus Mundus müraciət dəstəyi',
    shortDesc:
      'Profilinizə uyğun Erasmus Mundus proqramlarını seçin, sənədlərinizi planlaşdırın və müraciətinizi mərhələli şəkildə hazırlayın.',
    duration: 'Fərdi müraciət planı',
    format: 'Onlayn və ya əyani',
    result: 'Proqram seçimi və yekun yoxlanış',
    primaryCta: 'Erasmus Mundus müraciətinə başlayın',
    audience: [
      'Erasmus Mundus magistr proqramlarına müraciət etməyi planlayanlara',
      'Proqram seçimi və sənəd strategiyasına ehtiyacı olanlara',
      'Müraciətini göndərməzdən əvvəl tam yoxlatmaq istəyənlərə',
    ],
    includes: [
      'Akademik profilinizin analizi',
      'Uyğun proqramların seçilməsi və prioritetləşdirilməsi',
      'Sənəd və son tarixlər üzrə fərdi plan',
      'Yekun müraciət yoxlanışı',
    ],
    note:
      'Qəbul və ya təqaüd nəticəsinə zəmanət verilmir. Yekun qərar müvafiq proqram konsorsiumuna məxsusdur.',
  },

  'study-abroad': {
    icon: Map,
    category: 'abroad',
    title: 'Xaricdə təhsil konsultasiyası',
    shortDesc:
      'Təhsil məqsədinizə, akademik profilinizə və imkanlarınıza uyğun ölkə, proqram və növbəti addımları birlikdə müəyyənləşdirək.',
    duration: '45–60 dəqiqə',
    format: 'Onlayn və ya əyani',
    result: 'Fərdi təhsil yol xəritəsi',
    primaryCta: 'Təhsil planınızı qurun',
    audience: [
      'Xaricdə təhsil imkanlarını araşdıranlara',
      'Ölkə və proqram seçimində qərarsız qalanlara',
      'Müraciət prosesinə haradan başlayacağını bilməyənlərə',
    ],
    includes: [
      'Akademik profil və prioritetlərinizin analizi',
      'Sizə uyğun ölkə və proqram istiqamətləri',
      'Qəbul və sənəd tələblərinin izahı',
      'Görüşdən sonra yazılı yol xəritəsi',
    ],
    note:
      'Bu xidmət konsultasiya və planlaşdırmanı əhatə edir. Universitetlərə tam müraciət ayrıca xidmət kimi razılaşdırılır.',
  },

  'visa-support': {
    icon: Stamp,
    category: 'abroad',
    title: 'Viza müraciəti dəstəyi',
    shortDesc:
      'Viza növünüzə uyğun sənəd tələblərini aydınlaşdırın, müraciət faylınızı sistemləşdirin və təqdimatdan əvvəl yoxladın.',
    duration: 'Ölkə və viza növünə uyğun',
    format: 'Onlayn və ya əyani',
    result: 'Fərdi sənəd siyahısı və fayl yoxlanışı',
    primaryCta: 'Viza dəstəyi al',
    audience: [
      'Təhsil, layihə və qısamüddətli səfər vizasına hazırlaşanlara',
      'Hansı sənədlərin lazım olduğunu dəqiqləşdirmək istəyənlərə',
      'Müraciət faylını təqdimatdan əvvəl yoxlatmaq istəyənlərə',
    ],
    includes: [
      'Rəsmi viza tələblərinin izahı',
      'Fərdi sənəd siyahısı',
      'Forma və sənədlər üzrə istiqamətləndirmə',
      'Təqdimatdan əvvəl yekun yoxlama',
    ],
    note:
      'Nomad Youth hüquqi nümayəndəlik göstərmir və viza qərarına zəmanət vermir. Yekun qərar müvafiq konsulluq və ya viza orqanına məxsusdur.',
  },

  'un-certificates': {
    icon: Award,
    category: 'other',
    title: 'BMT sertifikat kursları',
    shortDesc:
      'BMT və digər beynəlxalq təşkilatların sertifikat proqramları arasından maraq və məqsədinizə uyğun kursları tapmaq üçün istiqamətləndirmə alın.',
    duration: '—',
    format: 'Onlayn',
    result: 'Fərdi kurs və proqram istiqamətləri',
    primaryCta: 'Uyğun kursları tap',
    audience: [
      'Beynəlxalq sertifikat proqramları axtaranlara',
      'BMT və digər beynəlxalq təşkilatların kursları ilə maraqlananlara',
      'Öz sahəsinə uyğun təlim istiqaməti seçmək istəyənlərə',
    ],
    includes: [
      'Mövcud proqram və kursların araşdırılması',
      'Uyğunluq şərtlərinin izahı',
      'Məqsədinizə uyğun kurs və sertifikat tövsiyələri',
      'Qeydiyyat və müraciət prosesi barədə istiqamətləndirmə',
    ],
  },

  other: {
    icon: MessageCircleQuestion,
    category: 'other',
    title: 'Digər sorğular',
    shortDesc:
      'Axtardığınız xidməti siyahıda görmədiniz? Ehtiyacınızı qısa şəkildə bizə bildirin, sizə uyğun dəstək imkanını müəyyənləşdirək.',
    duration: '—',
    format: 'Onlayn',
    result: 'Uyğun xidmət və ya istiqamət tövsiyəsi',
    primaryCta: 'Sorğunuzu göndərin',
    audience: [
      'Siyahıdakı xidmətlərə tam uyğun gəlməyən ehtiyacı olanlara',
      'Hansı xidməti seçməli olduğunu bilməyənlərə',
      'Fərdi sual və ya xüsusi dəstək ehtiyacı olanlara',
    ],
    includes: [
      'Sorğunuzu qısa şəkildə nəzərdən keçirəcəyik',
      'Ehtiyacınızı dəqiqləşdirəcəyik',
      'Uyğun xidmət və ya istiqamət təklif edəcəyik',
      'Lazım olduqda uyğun görüş formatını müəyyənləşdirəcəyik',
    ],
  },
}

export const CATEGORIES = [
  {
    id: 'erasmus',
    icon: Globe,
    title: 'Erasmus və layihələr',
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
    title: 'CV və sənədlər',
    services: [
      'cv',
      'europass',
      'cv-review',
      'motivation',
      'recommendation',
    ],
  },

  {
    id: 'abroad',
    icon: GraduationCap,
    title: 'Xaricdə təhsil',
    services: [
      'erasmus-mundus',
      'study-abroad',
      'visa-support',
    ],
  },

  {
    id: 'other',
    icon: MessageCircle,
    title: 'Digər dəstək',
    services: [
      'un-certificates',
      'other',
    ],
  },
]