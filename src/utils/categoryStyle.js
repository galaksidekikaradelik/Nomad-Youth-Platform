const CATEGORY_PALETTE = [
  { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' }, 
  { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' }, 
  { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' }, 
  { bg: '#FDF2F8', text: '#BE185D', border: '#FBCFE8' }, 
  { bg: '#F5F3FF', text: '#6D28D9', border: '#DDD6FE' }, 
  { bg: '#ECFEFF', text: '#0E7490', border: '#A5F3FC' }, 
  { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' }, 
  { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' }, 
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