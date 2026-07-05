// İstifadə: node scripts/convertExcel.js

import Papa from 'papaparse'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { mapCategoriesToCanonical } from '../src/utils/categoryMapping.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTh8SnV1dE4f9q77ekbT4j8xlDSYLQx1BRKDOywGjmUhSVAHK-1NUnJN7JYJ4sn3w/pub?output=csv'

const OUTPUT_PATH = path.join(__dirname, '../src/data/opportunities.json')

function excelDateToISO(value) {
  if (!value) return null
  if (typeof value === 'string') {
    const parts = value.trim().split('.')
    if (parts.length === 3) {
      const [day, month, year] = parts
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
  return null
}

function parseCategories(value) {
  if (!value) return []
  return value
    .toString()
    .split(',')
    .map(c => c.trim())
    .filter(Boolean)
}

async function fetchCSV(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`CSV yüklənmədi: ${res.status} ${res.statusText}`)
  }
  return res.text()
}

async function run() {
  console.log('⏳ Google Sheets-dən data çəkilir...')
  const csvText = await fetchCSV(SHEET_CSV_URL)

  const { data: rows } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  const opportunities = rows.map((row, index) => {
    const title = row['Layihənin keçid linki']?.toString().trim()
    const deadline = excelDateToISO(row['Deadline'])
    const type = row['Növ']?.toString().trim()               // Seminar / Kurs / Konfrans / Vebinar / Fəaliyyət
    const format = row['Növü']?.toString().trim()             // Online / Offline
    const category = parseCategories(row['Kateqoriya'])       // yalnız mövzu (Rifah, Gənclər, Təhsil...)
    const categoryGroups = mapCategoriesToCanonical(category)
    const country = row['Ölkə']?.toString().trim()
    const applyLink = row['Apply linki']?.toString().trim()
    const publishedAt = excelDateToISO(row['Açıqlanma tarixi'])
    const descriptionAz = row['Sum_az']?.toString().trim() || ''
    const descriptionEn = row['Sum_en']?.toString().trim() || ''
    const descriptionRu = row['Sum_rus']?.toString().trim() || ''

    return {
      id: index + 1,
      title,
      deadline,
      type,
      format,
      category,
      categoryGroups,
      location: country,
      applyLink,
      publishedAt,
      description: descriptionAz,
      descriptionTranslations: {
        az: descriptionAz,
        en: descriptionEn,
        ru: descriptionRu,
      },
      tags: [format, country, type, ...category].filter(Boolean),
    }
  }).filter(op => op.title)

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(opportunities, null, 2), 'utf-8')
  console.log(`✅ ${opportunities.length} elan çevrildi → ${OUTPUT_PATH}`)
}

run().catch(err => {
  console.error('❌ Xəta:', err.message)
  process.exit(1)
})