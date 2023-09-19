import React, { useEffect } from "react";
import './disk.scss';
import { useAppDispatch, useTypedSelector } from "../../../reducers";
import { getFiles } from "../../../services/fileApi";

export const Disk = React.memo(() => {
  const dispatch = useAppDispatch()
  const currentDir = useTypedSelector(state => state.file.currentDir)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir, dispatch])

  return  (
    <div className="disk">
      DISK
    </div>
  )
})