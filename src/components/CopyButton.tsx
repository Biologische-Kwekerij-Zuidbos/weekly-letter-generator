import { LuCopy } from "react-icons/lu"

type CopyButtonProps = {
  text: string
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <button onClick={onCopy} className="btn btn-block btn-neutral">
      <LuCopy />
      Kopiëren
    </button>
  )
}

export default CopyButton
