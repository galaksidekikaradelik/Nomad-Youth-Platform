// Kateqoriya adına görə sabit rəng seçir (hər kateqoriya həmişə eyni rəngdə olur)
const CATEGORY_PALETTE = [
  { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' }, // blue
  { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' }, // green
  { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' }, // amber
  { bg: '#FDF2F8', text: '#BE185D', border: '#FBCFE8' }, // pink
  { bg: '#F5F3FF', text: '#6D28D9', border: '#DDD6FE' }, // violet
  { bg: '#ECFEFF', text: '#0E7490', border: '#A5F3FC' }, // cyan
  { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' }, // orange
  { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' }, // red
]

export function getCategoryStyle(category) {
  let hash = 0
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash)
  }
  const palette = CATEGORY_PALETTE[Math.abs(hash) % CATEGORY_PALETTE.length]
  return {
    background: palette.bg,
    color: palette.text,
    border: `1px solid ${palette.border}`,
  }
}