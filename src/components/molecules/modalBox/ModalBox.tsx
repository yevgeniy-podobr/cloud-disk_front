import React, { useEffect } from 'react'
import './modalBox.scss'

interface Props extends React.HTMLAttributes<HTMLElement> {
  onCloseModal?: () => void
  visibleCloseIcon?: true
  bgClickDisabled?: true
}

export const ModalBox = (props: Props): JSX.Element => {
  document.body.classList.add('no-scroll')
  const {
    className,
    children,
    onCloseModal,
    visibleCloseIcon,
    bgClickDisabled,
  } = { ...props }
  const clickEvent = (event: React.MouseEvent<HTMLElement>) => {
    if (
      event.target instanceof Element &&
      ((!bgClickDisabled && event.target.id === 'modal-box') ||
        event.target.id === 'modal-content__close')
    ) {
      if (onCloseModal) onCloseModal()
      document.body.classList.remove('no-scroll')
    }
  }

  useEffect(() => {
    return () => document.body.classList.remove('no-scroll')
  }, [])

  return (
    <div
      id="modal-box"
      data-testid="modal-box"
      className={`modal-box ${className ?? ''}`}
      onMouseDown={event => clickEvent(event)}
    >
      <div className="modal-content">
        {visibleCloseIcon && (
          <div
            id="modal-content__close"
            className="modal-content__close"
            data-testid="modal-content__close"
          ></div>
        )}
        {children ?? ''}
      </div>
    </div>
  )
}
