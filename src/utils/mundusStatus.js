export function getMundusStatus(
  applicationOpens,
  deadline
) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const opens = applicationOpens
    ? new Date(applicationOpens)
    : null

  const end = deadline
    ? new Date(deadline)
    : null

  if (opens) {
    opens.setHours(0, 0, 0, 0)
  }

  if (end) {
    end.setHours(23, 59, 59, 999)
  }

  if (opens && today < opens) {
    return 'upcoming'
  }

  if (end && today > end) {
    return 'closed'
  }

  return 'open'
}