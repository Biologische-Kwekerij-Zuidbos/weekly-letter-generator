import moment from "moment"
import { useEffect, useMemo, useState } from "react"
import MailHtmlContext from "../contexts/MailHtmlContext"
import { WeeklyLetterForm } from "../components/Form"
import getHtmlFromLayout from "../util/layout"
import letterLayoutString from "../assets/letter_layout.html?raw"
import recipeLayoutString from "../assets/recipe_layout.html?raw"
import { useAICompletions } from "../hooks/useAICompletion"
import { toast } from "react-toastify"

type Recipe = {
  name: string
  ingredients: string[]
  preparationSteps: string[]
}

const getRecipesHtml = (recipes: Recipe[]): string => {
  return recipes
    .map((item) => {
      return getHtmlFromLayout(recipeLayoutString, [
        {
          name: "RECIPE_NAME",
          value: item.name,
        },
        {
          name: "RECIPE_INGREDIENTS",
          value: item.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("\n"),
        },
        {
          name: "RECIPE_PREPARATION_STEPS",
          value: item.preparationSteps
            .map((step) => `<li>${step}</li>`)
            .join("\n"),
        },
      ])
    })
    .join("\n")
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
    {
      name: "ORDER_TIME",
      value: "20:00",
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

  const packageItems = values?.packageLines.split("\n") ?? []
  const offerItems = values?.offerLines.split("\n") ?? []
  const recipeItems = values?.recipeLines.split("\n") ?? []

  const recipesQueries = useAICompletions(
    recipeItems.map((item) => ({
      name: item,
      prompt: `Ingredienten en bereidingswijze voor '${item}' recept:`,
    }))
  )
  const isLoading = recipesQueries.some((item) => item.isLoading)
  const errors = recipesQueries
    .filter((item) => item.error)
    .map((item) => item.error)

  useEffect(() => {
    errors.map((error) => {
      toast(error as string)
    })
    console.log(errors)
  }, [errors])

  const recipes: Recipe[] = recipesQueries.map((item, index) => {
    const ingredients = item.data?.data.choices[0].text
    const name = recipeItems[index]

    return {
      name,
      ingredients: ingredients?.split(", ") ?? [],
      preparationSteps: [],
    }
  })

  const mailHtml = getLetterHtml(
    packageItems,
    offerItems,
    getRecipesHtml(recipes)
  )

  const value = useMemo(
    () => ({
      mailHtml,
      year,
      week,
      setValues,
      isLoading,
      errors,
    }),
    [isLoading, mailHtml, week, year, errors]
  )

  return (
    <MailHtmlContext.Provider value={value}>
      {children}
    </MailHtmlContext.Provider>
  )
}

export default MailHtmlProvider
