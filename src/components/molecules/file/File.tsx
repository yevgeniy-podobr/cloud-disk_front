import React, { useState } from "react";
import './file.scss'
import folderIcon from '../../../assets/folder-icon.png'
import fileIcon from '../../../assets/file-icon.png'
import closeIcon from '../../../assets/close-icon.png'
import downloadIcon from '../../../assets/download-icon.png'
import { setFolderStack, setCurrentFolder, useAppDispatch, useTypedSelector, setFiles } from "../../../redux";
import { deleteFileApi, downloadFile } from "../../../services/fileApi";
import { sizeFormat } from "../../../utils/script/sizeFormat";
import { EFileType, EFolderDisplayOptions } from "../../../utils/constants/fileConstants";

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
  const [isLoading, setIsLoading] = useState(false)

  const isDir = type === EFileType.dir;

  const openFolderHandler = () => {
    dispatch(setFolderStack([...folderStack, currentFolder]))
    dispatch(setCurrentFolder(id))
  }

  const onDownloadFile = (e: React.MouseEvent<HTMLButtonElement | HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    downloadFile(id, name).finally(() => setIsLoading(false))
  }

  const onDeleteFile = (e: React.MouseEvent<HTMLButtonElement | HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    deleteFileApi(id)
      .then(status => {
        if (status) dispatch(setFiles(files.filter(file => file?._id !== id)))
      }).finally(() => setIsLoading(false))
  }

  if (folderDisplay === EFolderDisplayOptions.plates) {
    return (
      <div className="file__plate" onClick={() => isDir && openFolderHandler()}>
        <div className={`file__plate-actions ${isDir ? 'file__plate-actions-dir' : ''}`}>
          {!isDir && (
            <img 
              className="file__plate-actions-icon" 
              src={downloadIcon} 
              alt="download icon"
              onClick={(e) => onDownloadFile(e)}
            />
          )}

          <img 
            className="file__plate-actions-icon" 
            src={closeIcon} 
            alt="close icon" 
            onClick={(e) => onDeleteFile(e)}
          />
        </div>
        <img 
          className="file__plate-icon" 
          src={isDir ? folderIcon : fileIcon} 
          alt="dir icon" 
        />
        <div className="file__plate-name">{name}</div>
      </div>
    )
  }
  
  return (
    <div className="file" onClick={() => isDir && openFolderHandler()}>
      <img 
        className="file__icon" 
        src={isDir ? folderIcon : fileIcon} 
        alt="dir icon" 
      />
      <div className="file__name">{name}</div>
      <div className="file__date">{date}</div>
      <div className="file__size">{!isDir ? sizeFormat(size) : '---'}</div>
      {!isDir && (
        <button 
          className="file__btn-download" 
          onClick={(e) => {
            setIsLoading(true)
            onDownloadFile(e)
          }}
          disabled={isLoading}
        > 
          Download file
        </button>
      )} 
      <button 
        className="file__btn-delete" 
        onClick={(e) => {
          setIsLoading(true)
          onDeleteFile(e)
        }}
        disabled={isLoading}
      > 
        Delete file
      </button>
    </div>
  )
}
