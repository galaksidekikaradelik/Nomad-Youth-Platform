export function mapOpportunity(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    title: raw.title,
    deadline: raw.deadline,
    applyLink: raw.applyLink,

    location: raw.city
      ? `${raw.city}, ${raw.country ?? ""}`
      : (raw.country ?? ""),

    city: raw.city ?? "",
    country: raw.country ?? "",

    type: raw.type ?? "",
    typeDetail: raw.typeDetail ?? "Hamısı",

    category: raw.category ?? null,
    categoryGroups: raw.category ? [raw.category] : [],
    tags: raw.category ? [raw.category] : [],

    openingDate: raw.openingDate ?? null,
    publishedAt: raw.publishedAt ?? null,
    sortOrder: 0,

    description: raw.sumAz ?? "",

    descriptionTranslations: {
      az: raw.sumAz ?? "",
      en: raw.sumEn ?? "",
      ru: raw.sumRus ?? "",
    },

    duration: raw.duration ?? null,
    durationType: raw.durationType ?? null,

    visaType: raw.visaType ?? null,

    language: raw.language ?? null,
    eventDateRange: raw.eventDateRange ?? null,
    participantCount: raw.participantCount ?? null,
    financialSupport: raw.financialSupport ?? null,
    ageRequirement: raw.ageRequirement ?? null,
    escOrSalto: raw.escOrSalto ?? null,
    volunteeringType: raw.volunteeringType ?? null,
  };
}

export function mapOpportunities(rawList = []) {
  return rawList.map(mapOpportunity);
}