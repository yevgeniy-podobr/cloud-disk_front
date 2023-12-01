import React, { useState } from "react";
import './inputWithLabel.scss'
import openEyeIcon from '../../../assets/open-eye.png'
import hideEyeIcon from '../../../assets/hide-eye.png'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  textLabel: string
}

export const InputWithLabel = (pros: Props) => {
  const {type, id, value, onChange, textLabel } = pros
  const [isPassVisible, setIsPassVisible] = useState(false)

  return (
    <div className="input-container">
      <input className="input-container__input" required type={isPassVisible ? 'text' : type} id={id} value={value} onChange={onChange}/>
      <label className="input-container__label" htmlFor={id} >
        {textLabel}
      </label>
      {type === 'password' && (
        <img
          className="input-container__icon"
          src={!isPassVisible ? openEyeIcon : hideEyeIcon}
          alt="tile display icons" 
          onClick={() => setIsPassVisible(!isPassVisible)} 
        />
      )}
    </div>
  )
}