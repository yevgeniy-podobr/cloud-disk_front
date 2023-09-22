import React from "react";
import './file.scss'
import folderIcon from '../../../assets/folder-icon.png'
import fileIcon from '../../../assets/file-icon.png'
import { setFolderStack, setCurrentFolder, useAppDispatch, useTypedSelector } from "../../../redux";
import { downloadFile } from "../../../services/fileApi";

interface IProps {
  name: string,
  date: string,
  size: number,
  type: string,
  id: string
}

export const File = (props: IProps) => {
  const { name, date, size, type, id} = props
  const dispatch = useAppDispatch()
  const currentFolder = useTypedSelector(state => state.file.currentFolder)
  const folderStack = useTypedSelector(state => state.file.folderStack)

  const openFolderHandler = () => {
    dispatch(setFolderStack([...folderStack, currentFolder]))
    dispatch(setCurrentFolder(id))
  }

  const onDownloadFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    downloadFile(id, name)
  }

  return (
    <div className="file" onClick={() => type === 'dir' && openFolderHandler()}>
      <img 
        className="file__icon" 
        src={type === 'dir' ? folderIcon : fileIcon} 
        alt="dir icon" 
      />
      <div className="file__name">{name}</div>
      <div className="file__date">{date}</div>
      <div className="file__size">{size}</div>
      {type !== 'dir' && <button className="file__btn-download" onClick={(e) => onDownloadFile(e)}> Download file</button>} 
      <button className="file__btn-delete"> Delete file</button>
    </div>
  )
}
