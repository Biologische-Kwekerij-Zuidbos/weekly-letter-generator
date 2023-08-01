import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import MailHtmlProvider from "./providers/MailHtmlProvider.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MailHtmlProvider>
      <App />
    </MailHtmlProvider>
  </React.StrictMode>
)

postMessage({ payload: "removeLoading" }, "*")
