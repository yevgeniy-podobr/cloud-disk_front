import React, { useEffect } from "react";
import './disk.scss';
import { useAppDispatch, useTypedSelector } from "../../../reducers";
import { creatDir, getFiles } from "../../../services/fileApi";
import { FilesList } from "../../molecules";

export const Disk = React.memo(() => {
  const dispatch = useAppDispatch()
  const currentDir = useTypedSelector(state => state.file.currentDir)

  const createDirHandler = () => {
    dispatch(creatDir(currentDir, 'child_dir_074_05'))
  }

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir, dispatch])

  return  (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__btns-back">
          Back
        </button>
        <button className="disk__btns-create" onClick={() => createDirHandler()}>
          Create a folder
        </button>
      </div>
      <FilesList />

    </div>
  )
})