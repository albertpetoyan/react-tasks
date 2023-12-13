import React, { ReactNode } from "react"
import Button from "@mui/material/Button"
import "./submit.button.style.css"

interface IButtonProps {
  title: string
  onClick?: () => void
}

const SubmitButton: React.FC<IButtonProps> = (props) => {
  const { title, onClick } = props
  return (
    <div className="button_block">
      <Button
        style={{ width: "100%" }}
        type="submit"
        onClick={onClick}
        variant="outlined"
      >
        {title}
      </Button>
    </div>
  )
}

export default SubmitButton
