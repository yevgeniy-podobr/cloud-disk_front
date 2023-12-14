import React, { useEffect, useState } from "react";
import './disk.scss';
import { setCurrentFolder, setFiles, setFolderDisplay, setFolderStack, useAppDispatch, useTypedSelector } from "../../redux";
import { createFolder, getFiles, uploadFile } from "../../services/fileApi";
import { AddFolderModal, FilesList } from "../../components/molecules";
import { LoadingContent } from "../../components/molecules/loadingContent";
import { ElemObj, Multiselect, Uploader } from "../../components/molecules";
import iconsDisplayIcon from '../../assets/display-icons.png';
import listDisplayIcon from '../../assets/display-list.png';
import { EFolderDisplayOptions } from "../../utils/constants/fileConstants";
import { ESSKeys } from "../../utils/constants/sessionStorageKeys";
import { setIsVisible, setUploadFiles } from "../../redux/uploadReducer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { EPageTitle } from "../../utils/constants/userConstants";
import { FilesQueries } from "../../utils/constants/queries";

const sortingOptions: ElemObj[] = [
  {id: 1, element: 'type'},
  {id: 2, element: 'name'},
  {id: 3, element: 'date'}
]

const mainFolder = 'main_folder'

export const Disk = () => {
  const dispatch = useAppDispatch()
  const currentFolder = useTypedSelector(state => state.file.currentFolder)
  const folderStack = useTypedSelector(state => state.file.folderStack)
  const isAuth = useTypedSelector(state => state.user.isAuth)
  const isVisible = useTypedSelector(state => state.uploadFiles.isVisible)
  const files = useTypedSelector(state => state.file.files)
  const [isAddFolderModalOpen, setAddFolderModalOpen] = useState(false)
  const [dragEnter, setDragEnter] = useState(false)
  const [sortValue, setSortValue] = useState<ElemObj>(sortingOptions[0])
  const formData = new FormData()

  const {
    refetch: getListOfFilesRefresh,
    isPending,
  } = useQuery({
      queryKey: [FilesQueries.listOfFiles], 
      queryFn: () => getFiles(currentFolder, sortValue.element).then(res => dispatch(setFiles(res))),
      enabled: false,
    },
  )

  const createFolderMutation = useMutation({
    mutationFn: (variables: {currentFolder: string | null, folderName: string}) => createFolder(variables.currentFolder, variables.folderName),
  })
  
  const createFolderHandler = (folderName: string) => {
    createFolderMutation.mutate({ currentFolder, folderName }, {
      onSuccess: (res) => {
        dispatch(setFiles([...files, res?.data]))
      }
    })
  }

  const onClickBack = () => {
    const parentFolderId = folderStack[folderStack.length - 1]
    const preparedFolderStack = folderStack.slice(0, folderStack.length-1)

    dispatch(setCurrentFolder(parentFolderId))
    dispatch(setFolderStack(preparedFolderStack))
    sessionStorage.setItem(ESSKeys.currentFolder, parentFolderId ?? mainFolder)
    sessionStorage.setItem(ESSKeys.folderStack, JSON.stringify(preparedFolderStack))
  }

  const fileHandler = (newFile: File) => {
    formData.append('file', newFile)
    if (currentFolder) {
      formData.append('parent', currentFolder)
    }
    const fileForDownload = {id: Date.now(), name: newFile?.name, progress: 0}
    const downloads = sessionStorage.getItem(ESSKeys.downloads)
    dispatch(setIsVisible(true))

    if (!downloads) {
      dispatch(setUploadFiles([fileForDownload]))
      sessionStorage.setItem(ESSKeys.downloads, JSON.stringify([fileForDownload]))
    } else {
      const preparedData = [...(JSON.parse(downloads)), fileForDownload]

      dispatch(setUploadFiles(preparedData))
      sessionStorage.setItem(ESSKeys.downloads, JSON.stringify(preparedData))
    }

    dispatch(uploadFile(formData, fileForDownload.id)).then(res => dispatch(setFiles([...files, res?.data])))
  }

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileHandler(e.target.files![0])
  }

  const dragEnterHandler = (e: React.DragEvent) => {
    e.preventDefault()
    setDragEnter(true)
  }

  const dragLeaveHandler = (e: React.DragEvent) => {
    e.preventDefault()
    setDragEnter(false)
  }

  const dragOverHandler = (e: React.DragEvent) => {
    e.preventDefault()
    setDragEnter(true)
  }
  
  const dropHandler = (e: React.DragEvent) => {
    e.preventDefault()
    setDragEnter(false)
    fileHandler(e.dataTransfer.files[0])
  }

  useEffect(() => {
    if (isAuth) {
      sessionStorage.removeItem(ESSKeys.isFileNotFound)
      sessionStorage.getItem(ESSKeys.isFileDisplayedInTile) && dispatch(setFolderDisplay(EFolderDisplayOptions.tiles))
      getListOfFilesRefresh()
    }
  }, [currentFolder, isAuth, dispatch, getListOfFilesRefresh, sortValue.element])

  useEffect(() => {
    const currentFolderFromSS = sessionStorage.getItem(ESSKeys.currentFolder)
    const folderStackFromSS = sessionStorage.getItem(ESSKeys.folderStack)

    if (currentFolderFromSS && folderStackFromSS) {
      dispatch(setCurrentFolder(currentFolderFromSS === mainFolder ? null : currentFolderFromSS))
      dispatch(setFolderStack(JSON.parse(folderStackFromSS)))
    }
  }, [dispatch])

  return  (
    <>
    <Helmet>
        <title>{EPageTitle.disk}</title>
    </Helmet>
    {!dragEnter ? (
        <div className="disk" 
          onDragEnter={dragEnterHandler} 
          onDragLeave={dragLeaveHandler}
          onDragOver={dragOverHandler}
        >
          <div className="disk__header">
            <div className="disk__header-btns">
              <button 
                className="disk__header-btns_back" 
                onClick={() => currentFolder && onClickBack()}
                disabled={!currentFolder}  
              >
                Back
              </button>
              <button className="disk__header-btns_create" onClick={() => setAddFolderModalOpen(true)}>
                Create a folder
              </button>

              <div className="disk__header-btns_upload">    
                <label htmlFor="disk__header-btns_upload-input" className="disk__header-btns_upload-label">Upload file</label>
                <input 
                  type="file" 
                  id="disk__header-btns_upload-input" 
                  className="disk__header-btns_upload-input" 
                  onChange={(e) => fileUploadHandler(e)}  
                  name='file'
                />
              </div>
            </div>
            <div className="disk__header-right-side">
              <div className="disk__header-sorting_title">
                Sorted by:
              </div>
              
              <Multiselect
                className={`disk__header-sorting_select`}
                multiSelect={false}
                elements={sortingOptions}
                selectedElement={sortingOptions[0]}
                getSelectedElement={option => option && setSortValue(option)}
              />
              <div className="disk__header-display-folder">
                <img 
                  className="disk__header-display-folder_list"
                  src={listDisplayIcon}
                  alt="list display icon" 
                  onClick={() => {
                    dispatch(setFolderDisplay(EFolderDisplayOptions.list))
                    sessionStorage.removeItem(ESSKeys.isFileDisplayedInTile)
                  }}
                />
                <img 
                  className="disk__header-display-folder_tiles"
                  src={iconsDisplayIcon}
                  alt="tile display icons" 
                  onClick={() => {
                    dispatch(setFolderDisplay(EFolderDisplayOptions.tiles))
                    sessionStorage.setItem(ESSKeys.isFileDisplayedInTile, 'true')
                  }}  
                />
              </div>
            </div>

          </div>
          {isPending || createFolderMutation.isPending
            ? <LoadingContent isLoading={isPending || createFolderMutation.isPending} /> 
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
          className="disk__drop-area"
          onDragEnter={dragEnterHandler} 
          onDragLeave={dragLeaveHandler} 
          onDragOver={dragOverHandler}
          onDrop={dropHandler}
        >
          Add file...
        </div>
      )
    }
    </>

 
  )
}
