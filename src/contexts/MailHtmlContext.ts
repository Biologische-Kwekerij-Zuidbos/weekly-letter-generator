import moment from "moment"
import { createContext, useContext } from "react"
import { WeeklyLetterForm } from "../components/Form"

export type MailHtmlContextType = {
  mailHtml: string
  year: number
  week: number
  setValues: (values: WeeklyLetterForm) => void
  isLoading: boolean
  errors: unknown[]
}

const MailHtmlContext = createContext<MailHtmlContextType>({
  mailHtml: "",
  year: new Date().getFullYear(),
  week: moment().week(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setValues: () => {},
  isLoading: false,
  errors: [],
})

export const useMailHtml = () => useContext(MailHtmlContext)

export default MailHtmlContext
