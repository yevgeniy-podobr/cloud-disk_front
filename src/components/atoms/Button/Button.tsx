import React from 'react'
import './button.scss'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: ButtonProps) => {
  return <button {...props} className={`button ${props.className}`} />
}
