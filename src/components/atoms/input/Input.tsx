import React from "react";
import './input.scss'

interface Props {
  type: string,
  placeholder: string
}

export const Input = (pros: Props) => {
  return (
    <input type={pros.type} placeholder={pros.placeholder} />
  )
}
