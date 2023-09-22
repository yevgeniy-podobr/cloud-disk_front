import React, { useState } from 'react'
import './uploadFiles.scss'
import { Button } from '../../atoms/Button'
import { TypeRenderMemo } from './TypeRender'
// import { useStateWithDep } from '../../../../utils/hooks'
// import { ModalBox, ConfirmationUpdateModal } from '../../../molecules'
import { StatusLoading } from './StatusLoading'
import { toast } from 'react-toastify'

interface Props extends React.HTMLAttributes<HTMLElement> {
  accept: string
  updatedFile: string | undefined
  description: string
  buttonName: string
  uploadButtonText: string
  typeData: any
  modalTitleTxt: string
  modalUploadTxt: string
  modalRemoveTxt: string
  formDataName: string
  updateAction: (formData: FormData, config?: Config) => Promise<any>
  onTrackingUploadFile?: () => void
}

export interface Config {
  onUploadProgress: (progressEvent: any) => void
}

export const UploadFiles = (props: Props) => {
  const {
    accept,
    updatedFile,
    description,
    buttonName,
    uploadButtonText,
    typeData,
    modalTitleTxt,
    modalUploadTxt,
    modalRemoveTxt,
    formDataName,
    updateAction,
    onTrackingUploadFile,
    className,
  } = props

  const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 25000000
  const fileInputField = React.useRef<HTMLInputElement>(null)
  // const [file, setFile] = useStateWithDep<File | null | string>(
  //   updatedFile ?? null
  // )

  const [file, setFile] = useState<File | null | string>(
    updatedFile ?? null
  )
  const [classDragEnter, setClassDragEnter] = useState(false)
  const [isModalOpen, setIsmodalOpen] = useState(false)
  const [statusLoading, setStatusLoading] = useState(100)
  const formData = new FormData()

  const handleUploadBtn = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if (fileInputField.current) {
      fileInputField.current.click()
    }
  }

  const handleDeletebtn = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    onTrackingUploadFile && onTrackingUploadFile()
    removeFile()
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTrackingUploadFile && onTrackingUploadFile()
    let updatedFile = event.target.files![0]
    handleFile(updatedFile)
  }
  //TODO:Describe this function with tests or put it in a separate file
  const config: Config = {
    onUploadProgress: (progressEvent: any) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      setStatusLoading(percentCompleted)
    },
  }

  const handleFile = (updatedFile: File) => {
    if (updatedFile.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
      const isValidType = Object.values(typeData).some(
        (type: any) => type === updatedFile.type
      )
      if (isValidType) {
        setStatusLoading(0)
        setFile(updatedFile)
        setIsmodalOpen(false)

        formData.append(formDataName, updatedFile)
        updateAction(formData, config).catch(err => err)
      } else {
        toast.error('Sorry this format is not supported')
      }
    } else {
      toast.error('Files must be less than 25mb.')
    }
  }

  const removeFile = () => {
    setFile(null)
    setClassDragEnter(false)
    setIsmodalOpen(false)

    formData.append(formDataName, '')
    updateAction(formData).catch(err => err)
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setClassDragEnter(true)
  }

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setClassDragEnter(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setClassDragEnter(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <section
      className={`upload-file ${className ?? ''}`}
      data-testid="upload-file"
    >
      {/* {isModalOpen && (
        <ModalBox
          className="upload-file__modal-box"
          onCloseModal={() => setIsmodalOpen(false)}
        >
          <ConfirmationUpdateModal
            title={`${file ? 'Change ' : 'Add '}${modalTitleTxt}`}
            uploadText={`${file ? 'Reload' : 'Upload'} ${modalUploadTxt}`}
            removeText={file && `Remove ${modalRemoveTxt}`}
            uploadAction={e => handleUploadBtn(e)}
            remove={e => file && handleDeletebtn(e)}
            closeAction={() => setIsmodalOpen(false)}
          />
        </ModalBox>
      )} */}
      <div className="upload-file__form-upload">
        {!file ? (
          <>
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDragEnter={onDragEnter}
              onDrop={onDrop}
              className={`upload-file__form-upload-wrapper ${
                classDragEnter && 'upload-file__form-upload_ondrag'
              }`}
              data-testid="upload-file__form-upload-wrapper"
            >
              {description && (
                <label className="upload-file__form-upload-prompt">
                  {description}
                </label>
              )}
              <Button
                className="upload-file__form-upload-submit profile_white-btn profile_orange-btn "
                onClick={() => setIsmodalOpen(true)}
              >
                {buttonName}
              </Button>
            </div>
          </>
        ) : statusLoading < 100 && file ? (
          <StatusLoading percentLoaded={statusLoading} />
        ) : (
          <div className="upload-file__button-block">
            <div className="upload-file__loaded-file">
              <TypeRenderMemo updatedResume={updatedFile} file={file} />
            </div>
            <Button
              onClick={() => setIsmodalOpen(true)}
              className="button upload-file__upload-button profile_white-btn profile_orange-btn"
            >
              {uploadButtonText}
            </Button>
            <div
              onClick={handleDeletebtn}
              className="upload-file__delete-button"
              data-testid="upload-file__delete-button"
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
        title=""
        value=""
        accept={accept}
        data-testid="upload-file__form-upload-input"
      />
    </section>
  )
}
