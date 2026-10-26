
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const assetsRoot = path.resolve('src/assets')

async function findImages(dir) {
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  })

  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...await findImages(fullPath))
    } else if (
        /^auth-bg(?:-(?:day|night))?\.(webp|png|jpe?g)$/i.test(
        entry.name
      )
    ) {
      files.push(fullPath)
    }
  }

  return files
}

const images = await findImages(assetsRoot)

if (images.length === 0) {
  console.log('Auth fon şəkilləri tapılmadı.')
  process.exit(1)
}

for (const input of images) {
  const parsed = path.parse(input)

  const output = path.join(
    parsed.dir,
    `${parsed.name}-optimized.webp`
  )

  const before = (await fs.stat(input)).size

  const info = await sharp(input)
    .rotate()
    .resize({
      width: 1600,
      withoutEnlargement: true,
    })
    .webp({
      quality: 76,
      effort: 6,
    })
    .toFile(output)

  console.log({
    file: parsed.base,
    beforeKB: Math.round(before / 1024),
    afterKB: Math.round(info.size / 1024),
    output,
  })
}
