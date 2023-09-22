import React, { forwardRef, useImperativeHandle, useState } from 'react'
// import { UploadResumeUI } from './UploadResumeUI'
// import { Config, TypeResume } from '../../General'
// import { useMutation } from 'react-query'
// import { IUploadResumeOfInvitedWorker } from '../../../../models/AdminWorkes'
import { toast } from 'react-toastify'
// import { EFormDataKeys } from '../../../../utils/constants'

interface Props extends React.HTMLAttributes<HTMLElement> {
  accept: string
  updatedFile: string | undefined
  description: string
  isHandleClick?: true
  classDragEnter: boolean
  setIsResumeModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setIsInviteOpen: React.Dispatch<React.SetStateAction<boolean>>
  // setNewWorker: React.Dispatch<
  //   React.SetStateAction<IUploadResumeOfInvitedWorker | null>
  // >
  setUploadedResume: React.Dispatch<React.SetStateAction<File | null>>
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  setClassDragEnter: React.Dispatch<React.SetStateAction<boolean>>
  // uploadAction: (formData: FormData, config?: Config) => Promise<any>
  isResumeModalOpen?: boolean
}

export type TUploadResume = {
  handleFile: (updatedFile: File) => void
}

export const UploadResume = forwardRef<TUploadResume, Props>(
  (props: Props, ref) => {
    // const {
    //   isHandleClick,
    //   classDragEnter,
    //   setIsResumeModalOpen,
    //   setIsInviteOpen,
    //   setNewWorker,
    //   setUploadedResume,
    //   file,
    //   setFile,
    //   setClassDragEnter,
    //   uploadAction,
    // } = props

    // const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 25000000
    // const fileInputField = React.useRef<HTMLInputElement>(null)
    // const [statusLoading, setStatusLoading] = useState(100)
    // const formData = new FormData()

    // const config: Config = {
    //   onUploadProgress: (progressEvent: any) => {
    //     const percentCompleted = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total
    //     )
    //     setStatusLoading(percentCompleted)
    //   },
    // }

    // const uploadActionMutation = useMutation(
    //   (data: FormData) =>
    //     config ? uploadAction(data, config) : uploadAction(data),
    //   {
    //     onSuccess(data: IUploadResumeOfInvitedWorker) {
    //       if (data.parsed) {
    //         setNewWorker(data)
    //         setIsInviteOpen(true)
    //         setIsResumeModalOpen && setIsResumeModalOpen(false)
    //       }
    //       if (!data.parsed) toast.error('Failed to parse resume')

    //       setFile(null)
    //     },

    //     onError(err) {
    //       if (err instanceof Error) {
    //         toast.error(err.message)
    //         setFile(null)
    //       }
    //     },
    //   }
    // )

    // const handleFile = (updatedFile: File) => {
    //   if (updatedFile) {
    //     if (updatedFile.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
    //       const isValidType = Object.values(TypeResume).some(
    //         (type: any) => type === updatedFile.type
    //       )
    //       if (isValidType) {
    //         setStatusLoading(0)
    //         setUploadedResume(updatedFile)
    //         setFile(updatedFile)

    //         formData.append(EFormDataKeys.resume, updatedFile)
    //         uploadActionMutation.mutate(formData)
    //       } else {
    //         toast.error('Sorry this format is not supported')
    //       }
    //     } else {
    //       toast.error('Files must be less than 25mb.')
    //     }
    //   }
    // }

    // const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   let updatedFile = event.target.files![0]
    //   handleFile(updatedFile)
    // }

    // const handleDeletebtn = (event: React.MouseEvent<HTMLElement>) => {
    //   event.preventDefault()
    //   setFile(null)
    //   setClassDragEnter(false)

    //   formData.append(EFormDataKeys.resume, '')
    //   uploadActionMutation.mutate(formData)
    // }

    // const handleUploadOnClick = (event: React.MouseEvent<HTMLElement>) => {
    //   event.preventDefault()
    //   if (isHandleClick && fileInputField.current) {
    //     fileInputField.current.click()
    //   }
    // }

    // useImperativeHandle(ref, () => ({
    //   handleFile(updatedFile: File) {
    //     handleFile(updatedFile)
    //   },
    // }))

    return (
      // <UploadResumeUI
      //   {...props}
      //   file={file}
      //   classDragEnter={classDragEnter}
      //   statusLoading={statusLoading}
      //   handleDeletebtn={handleDeletebtn}
      //   fileInputField={fileInputField}
      //   handleUpload={handleUpload}
      //   handleUploadOnClick={handleUploadOnClick}
      // />
      <div className="test">test</div>
    )
  }
)
