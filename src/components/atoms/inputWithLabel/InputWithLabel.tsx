import React from "react";
import './inputWithLabel.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  textLabel: string
}

export const InputWithLabel = (pros: Props) => {
  const {type, id, value, onChange, textLabel } = pros

  return (
    <div className="input-container">
      <input className="input-container__input" required type={type} id={id} value={value} onChange={onChange}/>
      <label className="input-container__label" htmlFor={id} >
        {textLabel}
      </label>
    </div>
  )
}