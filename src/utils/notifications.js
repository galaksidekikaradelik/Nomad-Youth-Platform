import { getLikeStorageKey, readStoredSet } from './likes'

const MAX_NOTIFICATIONS = 50

function getSeenIdsKey(user) {
  const uid = user?.id ?? user?.email ?? user?.username ?? 'anon'
  return `nomad_notifications_seen_${uid}`
}

function getNotificationsKey(user) {
  const uid = user?.id ?? user?.email ?? user?.username ?? 'anon'
  return `nomad_notifications_${uid}`
}

function oppKeyOf(op) {
  return String(op.id || op.title)
}

function readSeenIds(user) {
  try {
    const arr = JSON.parse(localStorage.getItem(getSeenIdsKey(user)) || '[]')
    return new Set(arr)
  } catch {
    return new Set()
  }
}

function writeSeenIds(user, idsSet) {
  localStorage.setItem(getSeenIdsKey(user), JSON.stringify([...idsSet]))
}

export function readNotifications(user) {
  if (!user) return []
  try {
    return JSON.parse(localStorage.getItem(getNotificationsKey(user)) || '[]')
  } catch {
    return []
  }
}

function writeNotifications(user, notifications) {
  const trimmed = notifications.slice(0, MAX_NOTIFICATIONS)
  localStorage.setItem(getNotificationsKey(user), JSON.stringify(trimmed))
  return trimmed
}

export function syncNotifications(user, opportunities) {
  if (!user) return []

  const seenIds = readSeenIds(user)

  if (seenIds.size === 0) {
    const initialIds = new Set(opportunities.map(oppKeyOf))
    writeSeenIds(user, initialIds)
    return readNotifications(user)
  }

  const newOnes = opportunities.filter(op => !seenIds.has(oppKeyOf(op)))
  if (newOnes.length === 0) return readNotifications(user)

  const likedMap = readStoredSet(getLikeStorageKey(user))
  const likedOpportunities = opportunities.filter(op => likedMap[oppKeyOf(op)])
  const likedCategoryGroups = new Set(
    likedOpportunities.flatMap(op => op.categoryGroups || [])
  )

  const existing = readNotifications(user)
  const created = []

  newOnes.forEach(op => {
    const key = oppKeyOf(op)
    const now = new Date().toISOString()

    created.push({
      id: `new_${key}_${Date.now()}`,
      type: 'new_listing',
      oppKey: key,
      title: op.title,
      read: false,
      createdAt: now,
    })

    const isSimilarToLiked = (op.categoryGroups || []).some(cat => likedCategoryGroups.has(cat))
    if (isSimilarToLiked) {
      created.push({
        id: `similar_${key}_${Date.now()}`,
        type: 'similar_match',
        oppKey: key,
        title: op.title,
        read: false,
        createdAt: now,
      })
    }
  })

  newOnes.forEach(op => seenIds.add(oppKeyOf(op)))
  writeSeenIds(user, seenIds)

  return writeNotifications(user, [...created, ...existing])
}

export function markAllAsRead(user) {
  const notifications = readNotifications(user).map(n => ({ ...n, read: true }))
  return writeNotifications(user, notifications)
}

export function getUnreadCount(user) {
  return readNotifications(user).filter(n => !n.read).length
}