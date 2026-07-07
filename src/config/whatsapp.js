const WHATSAPP_NUMBER_RAW = '994 70 234 35 91'
export const WHATSAPP_NUMBER = WHATSAPP_NUMBER_RAW.replace(/[^\d]/g, '')

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}