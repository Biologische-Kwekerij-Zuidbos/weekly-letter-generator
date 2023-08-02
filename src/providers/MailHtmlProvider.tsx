import moment from "moment"
import { useMemo, useState } from "react"
import MailHtmlContext from "../contexts/MailHtmlContext"
import { WeeklyLetterForm } from "../components/Form"
import getHtmlFromLayout from "../util/layout"
import letterLayoutString from "../assets/letter_layout.html?raw"
import recipeLayoutString from "../assets/recipe_layout.html?raw"

const getRecipesHtml = (recipeItems: string[]): string => {
  const html = getHtmlFromLayout(recipeLayoutString, [
    {
      name: "RECIPES",
      value: recipeItems.map((item) => `<li>${item}</li>\n`).join(""),
    },
  ])
  return html
}

const getLetterHtml = (
  packageItems: string[],
  offerItems: string[],
  recipesHtml: string
): string => {
  const html = getHtmlFromLayout(letterLayoutString, [
    {
      name: "PACKAGE_ITEMS",
      value: packageItems.map((item) => `<li>${item}</li>\n`).join(""),
    },
    {
      name: "OFFER_ITEMS",
      value: offerItems.map((item) => `<li>${item}</li>\n`).join(""),
    },
    {
      name: "RECIPES",
      value: recipesHtml,
    },
  ])
  return html
}

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

  const mailHtml = getLetterHtml(
    packageItems ?? [],
    offerItems ?? [],
    getRecipesHtml(recipeItems ?? [])
  )

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
