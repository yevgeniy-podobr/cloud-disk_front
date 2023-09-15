import React from "react";
import './input.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = (pros: Props) => {
  const {type, placeholder, value, onChange } = pros

  return (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}/>
  )
}
