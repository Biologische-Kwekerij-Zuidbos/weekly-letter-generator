import moment from "moment"
import { useMemo, useState } from "react"
import MailHtmlContext from "../contexts/MailHtmlContext"
import { WeeklyLetterForm } from "../components/Form"

type MailHtmlProviderProps = {
  children: React.ReactNode
}

const MailHtmlProvider = ({ children }: MailHtmlProviderProps) => {
  const year = new Date().getFullYear()
  const week = Number(moment().format("w"))

  const [values, setValues] = useState<WeeklyLetterForm>()
  const packageItems = values?.packageLines.split("\n")
  const offerItems = values?.offerLines.split("\n")
  const recipeItems = values?.recipeLines.split("\n")

  const mailHtml = `
        <div>
            <h1>Test</h1>
            ${packageItems?.map((item) => `<p>${item}</p>`).join("")}
            ${offerItems?.map((item) => `<p>${item}</p>`).join("")}
            ${recipeItems?.map((item) => `<p>${item}</p>`).join("")}
        </div>
    `

  const value = useMemo(
    () => ({
      mailHtml,
      year,
      week,
      setValues,
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
