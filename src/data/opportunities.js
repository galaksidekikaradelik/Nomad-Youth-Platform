
// Terminalda işə sal: node scripts/convertExcel.js


import rawData from './opportunities.json'

export const opportunities = rawData.map(op => ({
  ...op,
  // featured/paid kimi sahələr Excel-də yoxdur, default dəyər veririk
  featured: false,
  paid: false,
}))