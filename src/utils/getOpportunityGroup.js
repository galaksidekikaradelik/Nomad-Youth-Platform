export const getOpportunityGroup = (op) => {
  const escOrSalto = String(op.escOrSalto || '')
    .trim()
    .toUpperCase()

  if (
    escOrSalto === 'ESC' ||
    escOrSalto === 'SALTO'
  ) {
    return 'erasmus'
  }
  const location = String(op.location || '')
    .trim()
    .toLocaleLowerCase('az')

  if (location === 'azərbaycan') {
    return 'local'
  }

  return 'international'
}