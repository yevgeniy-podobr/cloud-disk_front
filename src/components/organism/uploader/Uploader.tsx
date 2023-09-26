import React from "react";
import './uploader.scss'
import { UploaderFile } from "../../molecules";
import { useAppDispatch, useTypedSelector } from "../../../redux";
import { setIsVisible } from "../../../redux/uploadReducer";

export const Uploader = () => {
  const dispatch = useAppDispatch()
  const files = useTypedSelector(state => state.uploadFiles.files)
  
  return (
    <div className="uploader">
      <div className="uploader__header">
        <div className="uploader__header-title">
          Downloads
        </div>
        <button className="uploader__header-close" onClick={() => dispatch(setIsVisible(false))}>X</button>
      </div>
      {files.map(file => {
          return (
            <UploaderFile key={file.id} file={file}/>
          )
        })}
    </div>
  )
}
