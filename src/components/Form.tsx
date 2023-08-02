import classNames from "classnames"
import { useForm } from "react-hook-form"
import { RiAiGenerate } from "react-icons/Ri"
import { useMailHtml } from "../contexts/MailHtmlContext"

export type WeeklyLetterForm = {
  packageLines: string
  offerLines: string
  recipeLines: string
}

const Form = () => {
  const { setValues } = useMailHtml()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<WeeklyLetterForm>()

  const onSubmit = (data: WeeklyLetterForm) => setValues(data)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col justify-between"
    >
      <button className="btn btn-accent mb-10 w-full" type="submit">
        <RiAiGenerate />
        Genereren
      </button>
      <div className="grid 2xl:grid-cols-2 xl:grid-cols-1 gap-y-5 gap-x-10">
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Wat zit er in het pakket?
              <span className="text-red-500 ms-1">*</span>
            </span>
          </label>
          <textarea
            className={classNames({
              "textarea textarea-bordered": true,
              "input-error": errors.packageLines !== undefined,
            })}
            placeholder={`Wortelen\nKool\n...`}
            style={{ height: "10em" }}
            {...register("packageLines", { required: true })}
          />
          {errors.packageLines && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                {errors.packageLines.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Wat zijn de aanbiedingen?
              <span className="text-red-500 ms-1">*</span>
            </span>
          </label>
          <textarea
            className={classNames({
              "textarea textarea-bordered": true,
              "input-error": errors.offerLines !== undefined,
            })}
            placeholder={`Wortel voor € 5,99/stuk\nKool voor € 3,99/stuk\n...`}
            style={{ height: "10em" }}
            {...register("offerLines", { required: true })}
          />
          {errors.offerLines && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                {errors.offerLines.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Wat voor recepten moeten er in?</span>
          </label>
          <textarea
            className={classNames({
              "textarea textarea-bordered": true,
              "input-error": errors.recipeLines !== undefined,
            })}
            placeholder={`Worteltaart\nKoolsalade\n...`}
            style={{ height: "10em" }}
            {...register("recipeLines", { required: false })}
          />
          {errors.recipeLines && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                {errors.recipeLines.message}
              </span>
            </label>
          )}
        </div>
      </div>
    </form>
  )
}

export default Form
