import apiClient from "./axios";
import { mapOpportunities } from "./mappers/opportunityMapper";

export async function fetchOpportunityCards({
  page = 0,
  size = 12,
  search = "",
  category = "",
  format = "",
} = {}) {
  const params = {
    page,
    size,
  };

  if (search.trim()) {
    params.search = search.trim();
  }

  if (category) {
    params.category = category;
  }

  if (format) {
    params.format = format;
  }

  const { data } = await apiClient.get("/opportunities/cards", {
    params,
  });

  return {
    ...data,
    content: mapOpportunities(data.content ?? []),
  };
}