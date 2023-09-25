import React from 'react'
import { Loader } from '../../atoms'
import './loadingContent.scss'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isLoading: boolean
}

export const LoadingContent = (props: Props) => {
  if (props.isLoading) {
    return (
      <div className={`loading-content ${props.className ?? ''}`}>
        <Loader></Loader>
      </div>
    )
  }
  return <>{props.children}</>
}
