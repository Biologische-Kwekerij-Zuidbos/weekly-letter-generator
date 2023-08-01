import moment from "moment"
import { useMemo, useState } from "react"
import MailHtmlContext from "../contexts/MailHtmlContext"

type MailHtmlProviderProps = {
  children: React.ReactNode
}

const MailHtmlProvider = ({ children }: MailHtmlProviderProps) => {
  const year = new Date().getFullYear()
  const week = Number(moment().format("w"))

  const [packageItems, setPackageItems] = useState<string[]>([])

  const mailHtml = `
        <div>
            <h1>Test</h1>
        </div>
    `

  const value = useMemo(
    () => ({
      mailHtml,
      year,
      week,
      setPackageItems,
    }),
    [mailHtml, week, year]
  )

  return (
    <MailHtmlContext.Provider value={value}>
      {children}
    </MailHtmlContext.Provider>
  )
}

export default MailHtmlProvider
