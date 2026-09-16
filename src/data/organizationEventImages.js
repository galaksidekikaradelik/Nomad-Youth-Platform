const modules = import.meta.glob(
  '../assets/teskilatlar/tedbirler/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}',
  {
    eager: true,
    import: 'default',
  }
)

const eventImages = {}

Object.entries(modules).forEach(([path, url]) => {
  const marker = 'teskilatlar/tedbirler/'

  const index = path.indexOf(marker)

  if (index === -1) return

  const afterRoot = path.slice(index + marker.length)

  const parts = afterRoot.split('/')

  if (parts.length < 2) return

  const orgSlug = parts[0]

  if (!eventImages[orgSlug]) {
    eventImages[orgSlug] = {
      _general: [],
    }
  }

  if (parts.length === 2) {
    eventImages[orgSlug]._general.push(url)
    return
  }

  const projectSlug = parts[1]

  if (!eventImages[orgSlug][projectSlug]) {
    eventImages[orgSlug][projectSlug] = []
  }

  eventImages[orgSlug][projectSlug].push(url)
})

export function getEventImages(orgSlug, projectSlug) {
  const orgImages = eventImages[orgSlug]

  if (!orgImages) {
    return []
  }

  if (projectSlug && orgImages[projectSlug]?.length > 0) {
    return orgImages[projectSlug]
  }

  return orgImages._general || []
}

export default eventImages