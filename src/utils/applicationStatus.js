// Müraciət statusları (preparing/applied/accepted/rejected) hələ backend-də
// saxlanmır — user-ə görə localStorage-da saxlanır. Bu fayl OpportunityCard.jsx
// və Dashboard.jsx arasında ORTAQ mənbədir ki, storage key məntiqi iki yerdə
// təkrarlanmasın və uyğunsuzluq yaranmasın.

export const STATUS_CONFIG = {
  preparing: { labelKey: 'status_preparing', modifier: 'preparing' },
  applied:   { labelKey: 'status_applied',   modifier: 'applied' },
  accepted:  { labelKey: 'status_accepted',  modifier: 'accepted' },
  rejected:  { labelKey: 'status_rejected',  modifier: 'rejected' },
}

// user.id yoxdursa email-ə, o da yoxdursa username-ə keçir ki, kod sınmasın.
export function getStatusStorageKey(user) {
  const uid = user?.id ?? user?.email ?? user?.username ?? 'anon'
  return `nomad_opportunity_status_${uid}`
}

export function readStoredStatuses(user) {
  try {
    return JSON.parse(localStorage.getItem(getStatusStorageKey(user)) || '{}')
  } catch {
    return {}
  }
}