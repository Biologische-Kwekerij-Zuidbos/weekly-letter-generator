import { Configuration, OpenAIApi } from "openaI"
import { createContext, useContext } from "react"

export type OpenAIContextType = {
  api: OpenAIApi
}

const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY as string
console.log(apiKey)
const configuration = new Configuration({
  apiKey,
})

export const api = new OpenAIApi(configuration)

const OpenAIContext = createContext<OpenAIContextType>({
  api,
})

export const useOpenAI = () => useContext(OpenAIContext)

export default OpenAIContext
