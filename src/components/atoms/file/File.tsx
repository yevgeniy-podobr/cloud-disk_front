import React from "react";
import './file.scss'
import folderIcon from '../../../assets/folder-icon.png'
import fileIcon from '../../../assets/file-icon.png'

interface IProps {
  name: string,
  date: string,
  size: number,
  type: string,
}

export const File = (props: IProps) => {
  const { name, date, size, type} = props
  return (
    <div className="file">
      <img 
        className="file__icon" 
        src={type === 'dir' ? folderIcon : fileIcon} 
        alt="dir icon" 
      />
      <div className="file__name">{name}</div>
      <div className="file__date">{date}</div>
      <div className="file__size">{size}</div>
    </div>
  )
}
