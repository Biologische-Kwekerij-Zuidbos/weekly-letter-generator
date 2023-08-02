export type LayoutEntry = {
  name: string
  value: string
}

const getLayoutEntryEncoding = (entry: LayoutEntry): string => {
  return `$$${entry.name}$$`
}

const substituteLayoutEntry = (layout: string, entry: LayoutEntry): string => {
  const encoding = getLayoutEntryEncoding(entry)
  return layout.replace(encoding, entry.value)
}

const getHtmlFromLayout = (layout: string, entries: LayoutEntry[]): string => {
  const html = entries.reduce(substituteLayoutEntry, layout)
  const missingLayoutEntries = html.match(/\$\$.*\$\$/g)
  if (missingLayoutEntries) {
    console.error(`Missing layout entries: ${missingLayoutEntries}`)
  }

  return html
}

export default getHtmlFromLayout
