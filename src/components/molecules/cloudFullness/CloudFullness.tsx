import React from 'react'
import './cloudFullness.scss'

interface IProps extends React.HTMLAttributes<HTMLElement> {
  overallPercentage?: number
  title: string
}

export const CloudFullness = (props: IProps) => {
  const { className, title, overallPercentage } = props
  return (
    <div className={`cloud-fullness ${className ?? ''}`}>
      <div className="cloud-fullness__percent-block">
        <div className="cloud-fullness__percent-block-title">
          {title}
        </div>
        <div className="cloud-fullness__percent-block-percent">
          {overallPercentage ?? '--'}%
        </div>
      </div>

      <div className="cloud-fullness__line">
        <div
          className="cloud-fullness__line-filled"
          style={{ width: `${overallPercentage ?? 0}%` }}
        />
      </div>
    </div>
  )
}
