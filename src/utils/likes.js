export function getLikeStorageKey(user) {
  const uid = user?.id ?? user?.email ?? user?.username ?? 'anon'
  return `nomad_opportunity_likes_${uid}`
}

export function getSaveStorageKey(user) {
  const uid = user?.id ?? user?.email ?? user?.username ?? 'anon'
  return `nomad_opportunity_saves_${uid}`
}

export function readStoredSet(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '{}')
  } catch {
    return {}
  }
}