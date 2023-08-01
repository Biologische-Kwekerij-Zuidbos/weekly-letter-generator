import { RiAiGenerate } from "react-icons/Ri"

const Form = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <form className="grid 2xl:grid-cols-2 xl:grid-cols-1 gap-y-5 gap-x-10">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Wat zit er in het pakket?</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder={`Wortelen\nKool\n...`}
            style={{ height: "10em" }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Wat zijn de aanbiedingen?</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder={`Wortel voor € 5,99/stuk\nKool voor € 3,99/stuk\n...`}
            style={{ height: "10em" }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Wat voor recepten moeten er in?</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder={`Worteltaart\nKoolsalade\n...`}
            style={{ height: "10em" }}
          />
        </div>
      </form>
      <button className="btn btn-accent mt-10">
        <RiAiGenerate />
        Genereren
      </button>
    </div>
  )
}

export default Form
