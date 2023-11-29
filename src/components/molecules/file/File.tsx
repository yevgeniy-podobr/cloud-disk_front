import React, { useCallback, useEffect, useRef, useState } from "react";
import './file.scss'
import folderIcon from '../../../assets/folder-icon.png'
import fileIcon from '../../../assets/file-icon.png'
import closeIcon from '../../../assets/close-icon.png'
import downloadIcon from '../../../assets/download-icon.png'
import { setFolderStack, setCurrentFolder, useAppDispatch, useTypedSelector, setFiles } from "../../../redux";
import { deleteFileApi, downloadFile, renameFile } from "../../../services/fileApi";
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
  const { name, date, size, type, id } = props
  const dispatch = useAppDispatch()
  const currentFolder = useTypedSelector(state => state.file.currentFolder)
  const folderStack = useTypedSelector(state => state.file.folderStack)
  const files = useTypedSelector(state => state.file.files)
  const folderDisplay = useTypedSelector(state => state.file.folderDisplay)
  const [newFileName, setNewFileName] = useState<string>(name)
  const [isChangeName, setIsChangeName] = useState(false)
  const newNameRef = useRef<HTMLInputElement>(null)
  
  const isDir = type === EFileType.dir;

  const openFolderHandler = () => {
    dispatch(setFolderStack([...folderStack, currentFolder]))
    dispatch(setCurrentFolder(id))
  }

  const filesWithoutCurrentFile = files.filter(file => file.name !== name)

  const deleteFileMutation = useMutation({
    mutationFn: (variables: string) => deleteFileApi(variables),
  })

  const downloadMutation = useMutation({
    mutationFn: (variables: {id: string, name: string}) => downloadFile(variables.id, variables.name),
    onError: err => {
      if (err instanceof Error) toast.error(err.message)
    }
  })

  const renameFileMutation = useMutation({
    mutationFn: (variables: {
      id: string,
      name: string
    }) => renameFile(variables.id, variables.name),
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

  const handleChangeName = useCallback((event: any) => {
    if (newNameRef.current && !newNameRef.current.contains(event.target)) {
      const isFileWithSameName = filesWithoutCurrentFile.some(file => file.name === newFileName)

      if (isFileWithSameName) {
        toast.error(`${type === EFileType.dir ? 'Folder' : 'File'} with this name exists`)
      } else {
        setIsChangeName(false);
        if (!newFileName) {
          setNewFileName(name)
        } else {
          renameFileMutation.mutate({ id, name: newFileName })
        }
      }

    }
  }, [newFileName, files, name, id, renameFileMutation])

  useEffect(() => {
    document.addEventListener('click', handleChangeName, true);
    return () => {
        document.removeEventListener('click', handleChangeName, true);
    };

  }, [handleChangeName]);

  if (folderDisplay === EFolderDisplayOptions.plates) {
    return (
      <div className="file__plate" >
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
          onClick={() => isDir && openFolderHandler()}
        />
        <div 
          className="file__plate-name"
          onClick={() => setIsChangeName(true)}  
        >
          {isChangeName 
            ? (
              <input
                className="file__plate-name-input"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                ref={newNameRef}
              />
            ) : newFileName
          }
          
        </div>
      </div>
    )
  }

  return (
    <div className="file">
      <img 
        className="file__icon" 
        src={isDir ? folderIcon : fileIcon} 
        alt="dir icon"
        onClick={() => isDir && openFolderHandler()}
      />
      
      <div 
        className="file__name"
        onClick={() => setIsChangeName(true)}  
      >
        {isChangeName 
          ? (
            <input
              className="file__name-input"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              ref={newNameRef}
            />
          ) : newFileName
        }
        
      </div>
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
