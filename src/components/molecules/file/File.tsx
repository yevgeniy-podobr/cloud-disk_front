import React from "react";
import './file.scss'
import folderIcon from '../../../assets/folder-icon.png'
import fileIcon from '../../../assets/file-icon.png'
import closeIcon from '../../../assets/close-icon.png'
import downloadIcon from '../../../assets/download-icon.png'
import { setFolderStack, setCurrentFolder, useAppDispatch, useTypedSelector, setFiles } from "../../../redux";
import { deleteFileApi, downloadFile } from "../../../services/fileApi";
import { sizeFormat } from "../../../utils/script/sizeFormat";
import { EFileType, EFolderDisplayOptions } from "../../../utils/constants/fileConstants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

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

  const isDir = type === EFileType.dir;

  const openFolderHandler = () => {
    dispatch(setFolderStack([...folderStack, currentFolder]))
    dispatch(setCurrentFolder(id))
  }

  const deleteFileMutation = useMutation({
    mutationFn: (variables: string) => deleteFileApi(variables),
  })

  const downloadMutation = useMutation({
    mutationFn: (variables: {id: string, name: string}) => downloadFile(variables.id, variables.name),
    onError: err => {
      if (err instanceof Error) toast.error(err.message)
    }
  })


  const onDownloadFile = (e: React.MouseEvent<HTMLButtonElement | HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    const prepareData = {
      id,
      name
    }
    downloadMutation.mutate(prepareData)
  }

  const onDeleteFile = (e: React.MouseEvent<HTMLButtonElement | HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    const fileToBeDeleted = files.find(file => file._id === id)
    if (!!fileToBeDeleted?.childs.length) {
      toast.error('Folder is not empty')
    } else {
      deleteFileMutation.mutate(id, {
        onSuccess: () => {
          dispatch(setFiles(files.filter(file => file?._id !== id)))
        },
      })
    }
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
          onClick={(e) => onDownloadFile(e)}
          disabled={downloadMutation.isPending}
        > 
          Download file
        </button>
      )} 
      <button 
        className="file__btn-delete" 
        onClick={(e) => onDeleteFile(e)}
        disabled={deleteFileMutation.isPending}
      > 
        Delete file
      </button>
    </div>
  )
}
