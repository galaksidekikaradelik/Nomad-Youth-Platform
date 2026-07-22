import apiClient from "./axios";
import { mapOpportunities } from "./mappers/opportunityMapper";

export async function fetchOpportunityCards() {
  const { data } = await apiClient.get("/opportunities");
  return mapOpportunities(data);
}