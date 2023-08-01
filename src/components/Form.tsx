import { RiAiGenerate } from "react-icons/Ri"

const Form = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <form className="flex flex-col flex-auto">
        <label className="label">
          <span className="label-text">What is your name?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </form>
      <button className="btn btn-accent mt-10">
        <RiAiGenerate />
        Genereren
      </button>
    </div>
  )
}

export default Form
