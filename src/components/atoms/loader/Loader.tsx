import React from 'react'
import './loader.scss'

interface Props extends React.HTMLAttributes<HTMLElement> {}

export const Loader = (props: Props) => {
  return (
    <div
      className={`loader ${props.className ?? ''}`}
    ></div>
  )
}
