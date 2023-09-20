import React, { useEffect, useState } from "react";
import './disk.scss';
import { useAppDispatch, useTypedSelector } from "../../../reducers";
import { creatFolder, getFiles } from "../../../services/fileApi";
import { AddFolderModal, FilesList } from "../../molecules";

export const Disk = () => {
  const dispatch = useAppDispatch()
  const currentFolder = useTypedSelector(state => state.file.currentFolder)
  const [isAddFolderModalOpen, setAddFolderModalOpen] = useState(false)

  const createFolderHandler = (folderName: string) => {
    dispatch(creatFolder(currentFolder, folderName))
  }

  useEffect(() => {
    dispatch(getFiles(currentFolder))
  }, [currentFolder, dispatch])

  return  (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__btns-back">
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
