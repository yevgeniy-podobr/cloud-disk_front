import React, { RefObject } from 'react'
import upload_file_icon from '../../../../assets/icons/other/upload-file.svg'
import './uploadResume.scss'

interface Props extends React.HTMLAttributes<HTMLElement> {
  file: File | null | string
  classDragEnter: boolean
  statusLoading: number
  handleDeletebtn: (event: React.MouseEvent<HTMLElement>) => void
  fileInputField: RefObject<HTMLInputElement>
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleUploadOnClick: (event: React.MouseEvent<HTMLElement>) => void
  description: string
  accept: string
}

export const UploadResumeUI = (props: Props) => {
  const {
    file,
    classDragEnter,
    statusLoading,
    handleDeletebtn,
    fileInputField,
    handleUpload,
    handleUploadOnClick,
    description,
    accept,
  } = props

  return (
    <div
      className={`upload-resume ${props.className ?? ''}`}
      data-testid="upload-resume"
    >
      <div className="upload-resume__form-upload">
        {!file ? (
          <div
            className={`upload-resume__form-upload-wrapper ${
              classDragEnter && 'upload-resume__form-upload_ondrag'
            }`}
            onClick={e => handleUploadOnClick(e)}
            data-testid="upload-resume__form-upload-wrapper"
          >
            {description && (
              <label className="upload-resume__form-upload-prompt">
                {description}
              </label>
            )}
          </div>
        ) : (
          <div className="upload-resume__form-upload-file-wrapper">
            <div className="upload-resume__form-upload-file">
              <div className="upload-resume__form-upload-file-icon-wrapper">
                <img
                  className="upload-resume__form-upload-file-icon"
                  src={upload_file_icon}
                  alt="search"
                />
              </div>
              <div className="upload-resume__form-upload-file-status">
                <div className="upload-resume__form-upload-file-status-loading">
                  <p className="upload-resume__form-upload-file-status-title">
                    {file && typeof file !== 'string' && file.name}
                  </p>
                  <p className="upload-resume__form-upload-file-status-size">
                    {file &&
                      typeof file !== 'string' &&
                      (file.size / 1000000).toFixed(2)}{' '}
                    MB
                  </p>
                  <div className="upload-resume__form-upload-file-status-line">
                    <div
                      className="upload-resume__form-upload-file-status-line-filled"
                      style={{ width: `${statusLoading ?? 0}%` }}
                    ></div>
                  </div>
                </div>
                <p className="upload-resume__form-upload-file-status-description">{`${statusLoading}%`}</p>
              </div>
            </div>
            <div
              onClick={handleDeletebtn}
              className="upload-resume__delete-button"
              data-testid="upload-resume__delete-button"
            ></div>
          </div>
        )}
      </div>
      <input
        type="file"
        className={`upload-file__form-upload-input ${
          file && 'upload-file__hide-input'
        }`}
        ref={fileInputField}
        onChange={handleUpload}
        accept={accept}
        onClick={e => (e.currentTarget.value = '')}
        data-testid="upload-file__form-upload-input"
      />
    </div>
  )
}
