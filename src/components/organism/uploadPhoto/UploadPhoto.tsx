import React, { useState, useRef, useCallback, useMemo } from 'react'
// import { useMutation, useQueryClient } from 'react-query'
// import { QueryState } from 'react-query/types/core/query'
// import { toast } from 'react-toastify'
// import { PublicInfo } from '../../../../models'
// import { updatePublicFiles } from '../../../../services/workerApi'
// import { WorkerQueries } from '../../../../utils/constants'
// import { useTypedSelector, useStateWithDep } from '../../../../utils/hooks'
// import { UploadPhotoUI } from './UploadPhotoUI'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  basicPhoto?: string
  updateUploadedPhoto?: Function
  accept: string
  updatedPhoto: string | undefined
  withoutBtns?: true
  isModalVisible?: boolean
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>
  bckImage?: true
  onTrackingUploadFile?: () => void
}

export const UploadPhoto = React.memo((props: Props) => {
  // const {
  //   setIsModalVisible,
  //   updatedPhoto,
  //   bckImage,
  //   updateUploadedPhoto,
  //   onTrackingUploadFile,
  //   basicPhoto,
  // } = props
  // const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 25000000
  // const refPhoto = useRef<HTMLInputElement>(null)
  // const [photo, setPhoto] = useState<File | null>(null)
  // const [propsPhoto, setPropsPhoto] = useStateWithDep(updatedPhoto)
  // const user = useTypedSelector(s => s.auth.user)!
  // const queryClient = useQueryClient()
  // const formData = useMemo(() => {
  //   const data = new FormData()
  //   data.append('username', user.username)
  //   return data
  // }, [user.username])

  // const mutationPublicFiles = useMutation(
  //   (data: FormData) => updatePublicFiles(data),
  //   {
  //     onSuccess: updatedData => {
  //       const publicInfoQuery: QueryState<PublicInfo, undefined> | undefined =
  //         queryClient.getQueryState(WorkerQueries.publicInfo)

  //       queryClient.setQueryData(WorkerQueries.publicInfo, {
  //         ...publicInfoQuery?.data,
  //         profile_picture: updatedData.profile_picture,
  //         background_image: updatedData.background_image,
  //       })
  //     },
  //     onError: err => {
  //       if (err instanceof Error) toast.error(err.message)
  //     },
  //   }
  // )

  // const handleUploadPhoto = useCallback(
  //   (e: React.MouseEvent<HTMLElement>) => {
  //     e.preventDefault()
  //     if (refPhoto.current) {
  //       refPhoto.current.click()
  //     }
  //     setIsModalVisible && setIsModalVisible(false)
  //   },
  //   [setIsModalVisible]
  // )

  // const removeFile = useCallback(() => {
  //   setPhoto(null)
  //   updateUploadedPhoto && updateUploadedPhoto(null, null)
  //   setPropsPhoto(undefined)
  //   formData.set(bckImage ? 'background_image' : 'profile_picture', '')
  //   mutationPublicFiles.mutate(formData)
  //   setIsModalVisible && setIsModalVisible(false)
  // }, [
  //   bckImage,
  //   formData,
  //   mutationPublicFiles,
  //   setIsModalVisible,
  //   setPropsPhoto,
  //   updateUploadedPhoto,
  // ])

  // const handleDeletebtn = useCallback(
  //   (event: React.MouseEvent<HTMLElement>) => {
  //     event.preventDefault()
  //     onTrackingUploadFile && onTrackingUploadFile()
  //     removeFile()
  //   },
  //   [onTrackingUploadFile, removeFile]
  // )

  // const handleNewPhoto = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const newPhoto = event.target.files![0]
  //     if (newPhoto.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
  //       setPhoto(newPhoto)
  //       updateUploadedPhoto && updateUploadedPhoto(newPhoto)

  //       formData.append(
  //         bckImage ? 'background_image' : 'profile_picture',
  //         newPhoto
  //       )
  //       onTrackingUploadFile && onTrackingUploadFile()
  //       mutationPublicFiles.mutate(formData)
  //     } else {
  //       toast.error('Photo must be less than 25mb.')
  //     }
  //   },
  //   [
  //     bckImage,
  //     formData,
  //     mutationPublicFiles,
  //     onTrackingUploadFile,
  //     updateUploadedPhoto,
  //   ]
  // )

  // const closeModal = useCallback(
  //   () => setIsModalVisible && setIsModalVisible(false),
  //   [setIsModalVisible]
  // )

  // const backgroundImage = useMemo(
  //   () => `url(${photo ? URL.createObjectURL(photo) : propsPhoto || ''})`,
  //   [photo, propsPhoto]
  // )
  // const profilePhoto = useMemo(
  //   () => (photo ? URL.createObjectURL(photo) : propsPhoto || basicPhoto),
  //   [photo, propsPhoto, basicPhoto]
  // )

  return (
    // <UploadPhotoUI
    //   {...props}
    //   photo={photo}
    //   refPhoto={refPhoto}
    //   closeModal={closeModal}
    //   propsPhoto={propsPhoto}
    //   profilePhoto={profilePhoto}
    //   handleNewPhoto={handleNewPhoto}
    //   backgroundImage={backgroundImage}
    //   handleDeletebtn={handleDeletebtn}
    //   handleUploadPhoto={handleUploadPhoto}
    // />
    <div className="test">Test</div>
  )
})
