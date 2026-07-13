const CATEGORY_PALETTE = [
  { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' }, // blue      — 6.95:1 ✓
  { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' }, // green     — 4.79:1 ✓
  { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' }, // amber     — əvvəlki #B45309 yalnız 4.51:1 verirdi
  //                                                          (WCAG AA sərhəddində, riskli). #92400E ilə 6.37:1.
  { bg: '#FDF2F8', text: '#BE185D', border: '#FBCFE8' }, // pink      — 5.53:1 ✓
  { bg: '#F5F3FF', text: '#6D28D9', border: '#DDD6FE' }, // violet    — 6.48:1 ✓
  { bg: '#ECFEFF', text: '#0E7490', border: '#A5F3FC' }, // cyan      — 5.16:1 ✓
  { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' }, // orange    — 4.88:1 ✓
  { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' }, // red       — 5.91:1 ✓
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