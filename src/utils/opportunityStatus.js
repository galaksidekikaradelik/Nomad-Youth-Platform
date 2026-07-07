export function isExpired(opportunity) {
  if (!opportunity?.deadline) return false

  const deadlineDate = new Date(opportunity.deadline)
  if (isNaN(deadlineDate.getTime())) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  deadlineDate.setHours(0, 0, 0, 0)

  return deadlineDate < today
}

export function filterActiveOpportunities(opportunities) {
  return opportunities.filter(op => !isExpired(op))
}