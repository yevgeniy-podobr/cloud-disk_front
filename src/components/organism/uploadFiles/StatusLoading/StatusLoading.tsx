import React from 'react'
import './statusLoading.scss'

interface Props {
  percentLoaded: number
}

export const StatusLoading = (props: Props) => {
  return (
    <div className="status-loading">
      <div
        style={{ left: `${props.percentLoaded}%` }}
        className="status-loading__container"
        data-testid="status-loading__container"
      ></div>
      <p>{props.percentLoaded}%</p>
    </div>
  )
}
