import { useQueries, useQuery } from "react-query"
import { useOpenAI } from "../contexts/OpenAIContext"

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
        model: "gpt-3.5-turbo",
        prompt: completionRequest.prompt,
      }),
  })
}

export const useAICompletions = (completionRequests: AICompletionRequest[]) => {
  const { api } = useOpenAI()

  return useQueries(
    completionRequests.map((completionRequest) => ({
      queryKey: `ai-completion-${completionRequest.name}`,
      queryFn: () =>
        api.createCompletion({
          model: "gpt-3.5-turbo",
          prompt: completionRequest.prompt,
        }),
    }))
  )
}

export default useAICompletion
