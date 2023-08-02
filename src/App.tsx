import CopyButton from "./components/CopyButton"
import Form from "./components/Form"
import { useMailHtml } from "./contexts/MailHtmlContext"

function App() {
  const { mailHtml, year, week } = useMailHtml()

  return (
    <div
      className="flex flex-row p-5 gap-5"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="flex-1 flex flex-col">
        <div>
          <h1 className="text-5xl font-bold">Nieuwsbrief generator</h1>
          <p className="text-2xl font-bold text-slate-500">
            {year} week {week}
          </p>
          <div className="mt-10" />
        </div>
        <div className="flex-1">
          <Form />
        </div>
      </div>
      <div className="flex-1 mockup-code mt-3 pb-0">
        <div
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "0.5rem",
          }}
        >
          <CopyButton text={mailHtml} />
        </div>
        <pre className="p-6">{mailHtml}</pre>
      </div>
    </div>
  )
}

export default App
