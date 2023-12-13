import React, { HTMLInputTypeAttribute, ReactNode } from "react"
import Button from "@mui/material/Button"
import { TextField } from "@mui/material"

interface ITextInputProps {
  placeholder?: string
  type: HTMLInputTypeAttribute
  label: string
  error?: boolean
  helperText?: any
  register: any
}

const TextInput: React.FC<ITextInputProps> = (props) => {
  const { placeholder, type, label, error, helperText, register } = props

  return (
    <div>
      <TextField
        style={{ width: "100%" }}
        error={error}
        helperText={helperText && helperText}
        placeholder={placeholder}
        type={type}
        id="standard-error-helper-text"
        label={label}
        variant="standard"
        {...register()}
      />
    </div>
  )
}

export default TextInput
