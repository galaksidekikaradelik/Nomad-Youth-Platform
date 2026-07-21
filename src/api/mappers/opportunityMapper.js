export function mapOpportunity(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    title: raw.title,
    deadline: raw.deadline,
    applyLink: raw.applyLink,
    location: raw.country ?? "",
    type: raw.type ?? "",
    format: raw.sort ?? "Hamısı",
    category: raw.category ?? null,
    categoryGroups: raw.category ? [raw.category] : [],
    tags: raw.category ? [raw.category] : [],
    publishedAt: raw.openingDate ?? null,
    sortOrder: 0,
    description: raw.sumAz ?? "",
    descriptionTranslations: {
      az: raw.sumAz ?? "",
      en: raw.sumEn ?? "",
      ru: raw.sumRus ?? "",
    },
  };
}

export function mapOpportunities(rawList = []) {
  return rawList.map(mapOpportunity);
}