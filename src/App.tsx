import moment from "moment"
import CopyButton from "./components/CopyButton"

function App() {
  const year = new Date().getFullYear()
  const week = moment().format("w")

  const generatedHtmlCode = `
  <html>
    <head>
      <title>Newsletter</title>
    </head>
    <body>
      <h1>Newsletter</h1>
      <p>Week ${week} of ${year}</p>
    </body>
  </html>
  `

  return (
    <div className="flex flex-row p-5 gap-5">
      <div className="flex-1">
        <h1 className="text-5xl font-bold">Nieuwsbrief generator</h1>
        <p className="text-2xl font-bold text-slate-500">
          {year} week {week}
        </p>
      </div>
      <div className="flex-1 mockup-code mt-3 pb-0">
        <div
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "0.5rem",
          }}
        >
          <CopyButton text={generatedHtmlCode} />
        </div>
        <pre className="pl-1">{generatedHtmlCode}</pre>
      </div>
    </div>
  )
}

export default App
