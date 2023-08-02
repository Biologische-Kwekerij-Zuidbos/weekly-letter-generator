import React, { useMemo } from "react"
import OpenAIContext, { api } from "../contexts/OpenAIContext"

type OpenAIProviderProps = {
  children: React.ReactNode
}

const OpenAIProvider = ({ children }: OpenAIProviderProps) => {
  const value = useMemo(() => ({ api }), [])

  return (
    <OpenAIContext.Provider value={value}>{children}</OpenAIContext.Provider>
  )
}

export default OpenAIProvider
