import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import MailHtmlProvider from "./providers/MailHtmlProvider.tsx"
import OpenAIProvider from "./providers/OpenAIProvider.tsx"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OpenAIProvider>
        <MailHtmlProvider>
          <App />
        </MailHtmlProvider>
      </OpenAIProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

postMessage({ payload: "removeLoading" }, "*")
