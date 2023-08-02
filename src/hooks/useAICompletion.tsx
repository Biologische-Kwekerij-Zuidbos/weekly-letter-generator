import { useQueries, useQuery } from "react-query"
import { useOpenAI } from "../contexts/OpenAIContext"

const MODEL_NAME = "gpt-3.5-turbo-0301"

type AICompletionRequest = {
  name: string
  prompt: string
}

const useAICompletion = (completionRequest: AICompletionRequest) => {
  const { api } = useOpenAI()

  return useQuery({
    queryKey: `ai-completion-${completionRequest.name}`,
    queryFn: () =>
      api.createCompletion({
        model: MODEL_NAME,
        prompt: completionRequest.prompt,
      }),
    retry: false,
  })
}

export const useAICompletions = (completionRequests: AICompletionRequest[]) => {
  const { api } = useOpenAI()

  return useQueries(
    completionRequests.map((completionRequest) => ({
      queryKey: `ai-completion-${completionRequest.name}`,
      queryFn: () =>
        api.createCompletion({
          model: MODEL_NAME,
          prompt: completionRequest.prompt,
        }),
      retry: false,
    }))
  )
}

export default useAICompletion
