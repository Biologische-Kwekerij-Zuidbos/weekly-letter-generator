import moment from "moment"
import { createContext, useContext } from "react"

export type MailHtmlContextType = {
  mailHtml: string
  year: number
  week: number
  setPackageItems: (items: string[]) => void
}

const MailHtmlContext = createContext<MailHtmlContextType>({
  mailHtml: "",
  year: new Date().getFullYear(),
  week: moment().week(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPackageItems: () => {},
})

export const useMailHtml = () => useContext(MailHtmlContext)

export default MailHtmlContext
