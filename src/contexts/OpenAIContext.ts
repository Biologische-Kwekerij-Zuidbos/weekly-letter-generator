import { Configuration, OpenAIApi } from "openaI"
import { createContext, useContext } from "react"

export type OpenAIContextType = {
  api: OpenAIApi
}

const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string
const configuration = new Configuration({
  apiKey,
})

export const api = new OpenAIApi(configuration)

const OpenAIContext = createContext<OpenAIContextType>({
  api,
})

export const useOpenAI = () => useContext(OpenAIContext)

export default OpenAIContext
