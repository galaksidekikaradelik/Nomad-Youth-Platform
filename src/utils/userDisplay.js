export function getUserInitial(user) {
  const source = user?.name || user?.firstName || user?.email || ''
  return source.trim().charAt(0).toUpperCase() || '?'
}