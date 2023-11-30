import React from "react";
import './uploaderFile.scss'
import { useAppDispatch, useTypedSelector } from "../../../redux";
import { setUploadFiles } from "../../../redux/uploadReducer";
import { ESSKeys } from "../../../utils/constants/sessionStorageKeys";
import { IUploadFile } from "../../../models";

interface IProps extends React.HTMLAttributes<HTMLElement>{
  file: IUploadFile
}

export const UploaderFile = (props: IProps) => {
  const {id, name, progress} = props.file
  const dispatch = useAppDispatch()
  const uploadFiles = useTypedSelector(state => state.uploadFiles.files)

  const onCloseUploadFile = () => {
    const preparedData = uploadFiles.filter(file => file.id !== id)
    dispatch(setUploadFiles(preparedData))
    sessionStorage.setItem(ESSKeys.downloads, JSON.stringify(preparedData))
  }

  return (
    <div className={`uploader-file ${props.className ?? ''}`}>
      <div className="uploader-file__header">
        <div className="uploader-file__header-title">
          {name}
        </div>
        <button className="uploader-file__header-close" onClick={onCloseUploadFile}>X</button>
      </div>
      <div className="uploader-file__progress-bar">
        <div className="uploader-file__progress-bar_upload-bar" style={{width: progress + '%'}}/>
        <div className="uploader-file__progress-bar_percent">{progress}%</div>
      </div>
    </div>
  )
}
