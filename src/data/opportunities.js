// src/data/opportunities.js
//
// Bu fayl Excel-dən çevrilmiş JSON-u oxuyub React komponentləri üçün hazırlayır.
// Yeni elan əlavə etmək üçün:
//   1. Excel faylına (src/data/opportunities.xlsx) sətir əlavə et
//   2. Terminalda işə sal: node scripts/convertExcel.js
//   3. Sayt avtomatik yenilənəcək

import rawData from './opportunities.json'

export const opportunities = rawData.map(op => ({
  ...op,
  // featured/paid kimi sahələr Excel-də yoxdur, default dəyər veririk
  featured: false,
  paid: false,
}))