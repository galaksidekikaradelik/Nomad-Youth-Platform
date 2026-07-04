import rawData from './opportunities.json'

export const opportunities = rawData.map(op => ({
  ...op,
  featured: false,
  paid: false,
}))