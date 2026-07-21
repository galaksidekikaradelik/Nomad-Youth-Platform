import apiClient from "./axios";
import { mapOpportunities } from "./mappers/opportunityMapper";

/**
 * Fetches opportunity cards from the backend and maps them into the
 * shape the existing frontend components expect.
 */
export async function fetchOpportunityCards() {
  const { data } = await apiClient.get("/opportunities");
  return mapOpportunities(data);
}