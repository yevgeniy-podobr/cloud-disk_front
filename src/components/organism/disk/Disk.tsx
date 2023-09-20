import React, { useEffect } from "react";
import './disk.scss';
import { useAppDispatch, useTypedSelector } from "../../../reducers";
import { creatFolder, getFiles } from "../../../services/fileApi";
import { FilesList } from "../../molecules";

export const Disk = React.memo(() => {
  const dispatch = useAppDispatch()
  const currentFolder = useTypedSelector(state => state.file.currentFolder)

  const createFolderHandler = () => {
    dispatch(creatFolder(currentFolder, 'child_dir_074_05'))
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
        <button className="disk__btns-create" onClick={() => createFolderHandler()}>
          Create a folder
        </button>
      </div>
      <FilesList />

    </div>
  )
})