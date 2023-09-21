import React, { useEffect, useState } from "react";
import './disk.scss';
import { setCurrentFolder, setFolderStack, useAppDispatch, useTypedSelector } from "../../../redux";
import { creatFolder, getFiles } from "../../../services/fileApi";
import { AddFolderModal, FilesList } from "../../molecules";

export const Disk = () => {
  const dispatch = useAppDispatch()
  const currentFolder = useTypedSelector(state => state.file.currentFolder)
  const folderStack = useTypedSelector(state => state.file.folderStack)
  const [isAddFolderModalOpen, setAddFolderModalOpen] = useState(false)

  const createFolderHandler = (folderName: string) => {
    dispatch(creatFolder(currentFolder, folderName))
  }

  const onClickBack = () => {
    const parentFolderId = folderStack[folderStack.length - 1]
    dispatch(setCurrentFolder(parentFolderId))
    dispatch(setFolderStack(folderStack.slice(0, folderStack.length-1)))
  }

  useEffect(() => {
    dispatch(getFiles(currentFolder))
  }, [currentFolder, dispatch])

  return  (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__btns-back" onClick={() => onClickBack()}>
          Back
        </button>
        <button className="disk__btns-create" onClick={() => setAddFolderModalOpen(true)}>
          Create a folder
        </button>
      </div>
      <FilesList />
      {isAddFolderModalOpen && (
        <AddFolderModal 
          setAddFolderModalOpen={setAddFolderModalOpen}
          createFolderHandler={createFolderHandler}
        />
      )}
    </div>
  )
}
