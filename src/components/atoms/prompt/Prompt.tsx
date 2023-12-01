import React, { useState } from 'react'
import './prompt.scss'

interface Props extends React.HTMLAttributes<HTMLElement> {
  text: string
}

export const Prompt = (props: Props) => {
  const [isWindowVisible, setIsWindowVisible] = useState<boolean>(false)
  return (
    <div
      onClick={() => setIsWindowVisible(prevStatus => !prevStatus)}
      className={`prompt ${props.className ?? ''}`}
    >
      <div
        className={`prompt__window ${
          isWindowVisible ? 'prompt__window_show' : ''
        }`}
      >
        {props.text}
      </div>
      <div className="prompt__hover-block">{props.children}</div>
    </div>
  )
}
