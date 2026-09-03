export function getOpportunityGroup(op) {
  if (!op) return 'international'

  const scope = String(op.scope || '').trim().toUpperCase()

  if (scope === 'LOCAL') {
    return 'local'
  }

  if (scope === 'ERASMUS') {
    return 'erasmus'
  }

  if (scope === 'INTERNATIONAL') {
    return 'international'
  }

  // Köhnə datalarda scope yoxdursa,
  // mövcud məntiqə uyğun fallback burada saxlanıla bilər.
  return 'international'
}