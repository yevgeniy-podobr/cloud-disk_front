import React, { useEffect, useState } from "react";
import './disk.scss';
import { setCurrentFolder, setFiles, setFolderStack, useAppDispatch, useTypedSelector } from "../../../redux";
import { creatFolder, getFiles, uploadFile } from "../../../services/fileApi";
import { AddFolderModal, FilesList } from "../../molecules";
import { LoadingContent } from "../../molecules/loadingContent";
import { Uploader } from "../uploader";
import { ElemObj, Multiselect } from "../../atoms";

const sortingOptions: ElemObj[] = [
  {id: 1, element: 'By type'},
  {id: 2, element: 'By name'},
  {id: 3, element: 'By date'}
]

export const Disk = () => {
  const dispatch = useAppDispatch()
  const currentFolder = useTypedSelector(state => state.file.currentFolder)
  const folderStack = useTypedSelector(state => state.file.folderStack)
  const isAuth = useTypedSelector(state => state.user.isAuth)
  const isVisible = useTypedSelector(state => state.uploadFiles.isVisible)
  const files = useTypedSelector(state => state.file.files)
  const [isLoading, setIsLoading] = useState(false)
  const [isAddFolderModalOpen, setAddFolderModalOpen] = useState(false)
  const [dragEnter, setDrageEnter] = useState(false)
  const [sortValue, setSortValue] = useState<ElemObj>(sortingOptions[0])

  const createFolderHandler = (folderName: string) => {
    creatFolder(currentFolder, folderName)
      .then(res => dispatch(setFiles([...files, res?.data])))
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
      .then(res => dispatch(setFiles([...files, res?.data])))
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
      .then(res => dispatch(setFiles([...files, res?.data])))
  }

  useEffect(() => {
    if (isAuth) {
      setIsLoading(true)
      const preparedSortValue = sortValue.element.replace('By ', '')
      getFiles(currentFolder, preparedSortValue)
        .then(res => dispatch(setFiles(res)))
        .finally(() => setIsLoading(false))

    }
  }, [currentFolder, isAuth, dispatch, sortValue])

  return  (
    !dragEnter ? (
      <div className="disk" 
        onDragEnter={dragEnterHandler} 
        onDragLeave={dragLeaveHendler}
        onDragOver={dragOverHendler}
      >
        <div className="disk__btns">
          <button 
            className="disk__btns-back" 
            onClick={() => currentFolder && onClickBack()}
            disabled={!currentFolder}  
          >
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
          <Multiselect
            className={`disk__btns-select`}
            multiSelect={false}
            elements={sortingOptions}
            selectedElement={sortingOptions[0]}
            getSelectedElement={option => option && setSortValue(option)}
          />
        </div>
        {isLoading 
          ? <LoadingContent isLoading={isLoading} /> 
          : <FilesList />
        }
        
        {isAddFolderModalOpen && (
          <AddFolderModal 
            setAddFolderModalOpen={setAddFolderModalOpen}
            createFolderHandler={createFolderHandler}
          />
        )}
       {isVisible && <Uploader />} 
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
