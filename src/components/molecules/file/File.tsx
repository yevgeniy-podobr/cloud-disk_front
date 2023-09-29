import React from "react";
import './file.scss'
import folderIcon from '../../../assets/folder-icon.png'
import fileIcon from '../../../assets/file-icon.png'
import { setFolderStack, setCurrentFolder, useAppDispatch, useTypedSelector, setFiles } from "../../../redux";
import { deleteFileApi, downloadFile } from "../../../services/fileApi";
import { sizeFormat } from "../../../utils/script/sizeFormat";
import { EFolderDisplayOptions } from "../../../utils/constants/fileConstants";

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
  const files = useTypedSelector(state => state.file.files)
  const folderDisplay = useTypedSelector(state => state.file.folderDisplay)

  const openFolderHandler = () => {
    dispatch(setFolderStack([...folderStack, currentFolder]))
    dispatch(setCurrentFolder(id))
  }

  const onDownloadFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    downloadFile(id, name)
  }

  const onDeleteFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    deleteFileApi(id)
      .then(_ => dispatch(setFiles(files.filter(file => file._id !== id))))
  }

  if (folderDisplay === EFolderDisplayOptions.plates) {
    return (
      <div className="file__plate" onClick={() => type === 'dir' && openFolderHandler()}>
        <img 
          className="file__plate-icon" 
          src={type === 'dir' ? folderIcon : fileIcon} 
          alt="dir icon" 
        />
        <div className="file__plate-name">{name}</div>
        <div className="file__plate-btns">
          {type !== 'dir' && <button className="file__plate-btns-btn" onClick={(e) => onDownloadFile(e)}> Download </button>} 
          <button className="file__plate-btns-btn" onClick={(e) => onDeleteFile(e)}> Delete file</button>
        </div>

      </div>
    )
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
      <div className="file__size">{sizeFormat(size)}</div>
      {type !== 'dir' && <button className="file__btn-download" onClick={(e) => onDownloadFile(e)}> Download file</button>} 
      <button className="file__btn-delete" onClick={(e) => onDeleteFile(e)}> Delete file</button>
    </div>
  )
}
