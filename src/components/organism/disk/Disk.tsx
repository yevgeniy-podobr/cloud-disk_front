import React, { useEffect, useState } from "react";
import './disk.scss';
import { setCurrentFolder, setFolderStack, useAppDispatch, useTypedSelector } from "../../../redux";
import { creatFolder, getFiles, uploadFile } from "../../../services/fileApi";
import { AddFolderModal, FilesList } from "../../molecules";

export const Disk = () => {
  const dispatch = useAppDispatch()
  const currentFolder = useTypedSelector(state => state.file.currentFolder)
  const folderStack = useTypedSelector(state => state.file.folderStack)
  const [isAddFolderModalOpen, setAddFolderModalOpen] = useState(false)
  const [dragEnter, setDrageEnter] = useState(false)

  const createFolderHandler = (folderName: string) => {
    dispatch(creatFolder(currentFolder, folderName))
  }

  const onClickBack = () => {
    const parentFolderId = folderStack[folderStack.length - 1]
    dispatch(setCurrentFolder(parentFolderId))
    dispatch(setFolderStack(folderStack.slice(0, folderStack.length-1)))
  }

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    ///TODO: add the ability to upload multiple files
  
    // const files = new Array(e.target.files)

    // files.forEach(file => dispatch(uploadFile(file, currentFolder)))

    dispatch(uploadFile(e.target.files![0], currentFolder))
  }

  const dragEnterHandler = (e: React.DragEvent) => {
    e.preventDefault()
    setDrageEnter(true)
  }

  const dragLeaveHendler = (e: React.DragEvent) => {
    e.preventDefault()
    setDrageEnter(false)
  }

  const dragOverHendler = (e: React.DragEvent) => {
    e.preventDefault()
    setDrageEnter(true)
  }
  
  const dropHandler = (e: React.DragEvent) => {
    e.preventDefault()
    setDrageEnter(false)
    dispatch(uploadFile(e.dataTransfer.files[0], currentFolder))
  }

  useEffect(() => {
    dispatch(getFiles(currentFolder))
  }, [currentFolder, dispatch])

  return  (
    !dragEnter ? (
      <div className="disk" 
        onDragEnter={dragEnterHandler} 
        onDragLeave={dragLeaveHendler}
        onDragOver={dragOverHendler}
      >
        <div className="disk__btns">
          <button className="disk__btns-back" onClick={() => onClickBack()}>
            Back
          </button>
          <button className="disk__btns-create" onClick={() => setAddFolderModalOpen(true)}>
            Create a folder
          </button>

          {/* //TODO need refactoring upload file and drug and drop */}
          <div className="disk__btns-upload">    
            <label htmlFor="disk__btns-upload-input" className="disk__btns-upload-label">Upload file</label>
            <input 
              type="file" 
              id="disk__btns-upload-input" 
              className="disk__btns-upload-input" 
              onChange={(e) => fileUploadHandler(e)}  
              // multiple={true}
            />
          </div>
        </div>
        <FilesList />
        {isAddFolderModalOpen && (
          <AddFolderModal 
            setAddFolderModalOpen={setAddFolderModalOpen}
            createFolderHandler={createFolderHandler}
          />
        )}
      </div>
    ) : (
      <div 
        className="drop-area"
        onDragEnter={dragEnterHandler} 
        onDragLeave={dragLeaveHendler} 
        onDragOver={dragOverHendler}
        onDrop={dropHandler}
      >
        Add file...
      </div>
    )
 
  )
}
