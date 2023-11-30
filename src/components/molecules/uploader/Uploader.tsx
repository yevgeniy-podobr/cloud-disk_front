import React from "react";
import './uploader.scss'
import { UploaderFile } from "../../atoms";
import { useAppDispatch, useTypedSelector } from "../../../redux";
import { setIsVisible, setUploadFiles } from "../../../redux/uploadReducer";
import { ESSKeys } from "../../../utils/constants/sessionStorageKeys";

export const Uploader = () => {
  const dispatch = useAppDispatch()
  const files = useTypedSelector(state => state.uploadFiles.files)

  const onClose = () => {
    dispatch(setIsVisible(false))
    dispatch(setUploadFiles([]))
    sessionStorage.removeItem(ESSKeys.downloads)
  }
  
  return (
    <div className="uploader">
      <div className="uploader__header">
        <div className="uploader__header-title">
          Downloads
        </div>
        <button className="uploader__header-close" onClick={onClose}>X</button>
      </div>
      {files.map(file => {
          return (
            <UploaderFile key={file.id} file={file}/>
          )
        })}
    </div>
  )
}
