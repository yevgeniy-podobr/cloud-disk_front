import React, { useEffect } from 'react'
import { Loader } from '../../atoms'
import './popupWithLoader.scss'

interface Props extends React.HTMLAttributes<HTMLElement> {}

export const PopupWithLoader = (props: Props) => {
  const { className } = props
  useEffect(() => {
    document.querySelector('body')?.classList.add('hide-scroll')
    return () => {
      document.body.classList.remove('hide-scroll')
    }
  }, [])
  return (
    <div className={`popup-loader ${className ?? ''}`}>
      <div className="popup-loader__wrapper">
        <Loader></Loader>
        <p className="popup-loader__text">{props.children}</p>
      </div>
    </div>
  )
}
