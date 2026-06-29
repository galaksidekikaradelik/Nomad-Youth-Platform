// scripts/convertExcel.js
// İstifadə: node scripts/convertExcel.js
//
// src/data/opportunities.xlsx faylını oxuyub
// src/data/opportunities.json faylına çevirir.

import XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const INPUT_PATH = path.join(__dirname, '../src/data/opportunities.xlsx')
const OUTPUT_PATH = path.join(__dirname, '../src/data/opportunities.json')

function excelDateToISO(value) {
  // Excel-dən tarix "31.05.2026" kimi string, ya da Excel serial nömrə (45794 kimi) gələ bilər
  if (!value) return null

  if (typeof value === 'number') {
    // Excel serial tarix
    const date = XLSX.SSF.parse_date_code(value)
    return new Date(date.y, date.m - 1, date.d).toISOString().split('T')[0]
  }

  if (typeof value === 'string') {
    // "dd.mm.yyyy" formatını gözləyirik
    const parts = value.trim().split('.')
    if (parts.length === 3) {
      const [day, month, year] = parts
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }

  return null
}

function run() {
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`❌ Fayl tapılmadı: ${INPUT_PATH}`)
    console.error('Excel faylını "src/data/opportunities.xlsx" kimi yerləştir.')
    process.exit(1)
  }

  const workbook = XLSX.readFile(INPUT_PATH)
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' })

  const opportunities = rows.map((row, index) => {
    const title = row['Layihənin keçid linki']?.toString().trim()
    const deadline = excelDateToISO(row['Deadline'])
    const type = row['Növü']?.toString().trim()
    const country = row['Ölkə']?.toString().trim()
    const applyLink = row['Apply linki']?.toString().trim()
    const publishedAt = excelDateToISO(row['Açıqlanma tarixi'])

    return {
      id: index + 1,
      title,
      deadline,
      type,
      location: country,
      applyLink,
      publishedAt,
      tags: [type, country].filter(Boolean),
    }
  }).filter(op => op.title) // boş sətirləri at

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(opportunities, null, 2), 'utf-8')
  console.log(`✅ ${opportunities.length} elan çevrildi → ${OUTPUT_PATH}`)
}

run()