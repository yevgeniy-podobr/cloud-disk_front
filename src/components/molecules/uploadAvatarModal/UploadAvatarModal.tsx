import React, { useRef } from "react";
import './uploadAvatarModal.scss';
import { deleteAvatar, uploadAvatar } from "../../../services/userApi";
import { setUser, useAppDispatch, useTypedSelector } from "../../../redux";
import { PopupWithLoader } from "../../../components/molecules";
import { useMutation } from "@tanstack/react-query";
import { ESSUserKeys } from "../../../utils/constants/sessionStorageKeys";

interface IProps {
  setIsUploadAvatarModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const UploadAvatarModal = (props: IProps) => {
  const { setIsUploadAvatarModalOpen } = props
  const dispatch = useAppDispatch()
  const refPhoto = useRef<HTMLInputElement>(null)
  const user = useTypedSelector(state => state.user.currentUser)
  const formData = new FormData()

  const deleteAvatarMutation = useMutation({
    mutationFn: (variables: string) => deleteAvatar(variables),
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: (variables: FormData) => uploadAvatar(variables),
  })

  const handleUploadPhoto = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (refPhoto.current) {
      refPhoto.current.click()
    }
  }

  const handleNewPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoto = event.target.files![0]
    formData.append('avatar', newPhoto)

    uploadAvatarMutation.mutate(formData, {
      onSuccess: (res) => {
        if (res) {
          const prepareData = {
            ...user,
            avatar: res.avatar,
            usedSpace: res.usedSpace
          }
          dispatch(setUser(prepareData))
          sessionStorage.setItem(ESSUserKeys.userData, JSON.stringify(prepareData))
        }
      },
      onSettled: () => {
        setIsUploadAvatarModalOpen(false)
      },
    })
  }

  const handleDeletebtn = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    user?.id && deleteAvatarMutation.mutate(user?.id, {
      onSuccess: (res) => {
        if (res) {
          const prepareData = {
            ...user,
            avatar: res.avatar,
            usedSpace: res.usedSpace
          }
          dispatch(setUser(prepareData))
          sessionStorage.setItem(ESSUserKeys.userData, JSON.stringify(prepareData))
        }
      },
      onSettled: () => {
        setIsUploadAvatarModalOpen(false)
      },
    })
  }

  return (
    uploadAvatarMutation.isPending || deleteAvatarMutation.isPending
      ? <PopupWithLoader> 
          {`${uploadAvatarMutation.isPending ? 'Updating' : 'Deleting'} Avatar...`} 
        </PopupWithLoader> 
      : (
        <div className="upload-avatar-modal" onClick={() => setIsUploadAvatarModalOpen(false)}>
          <div className="upload-avatar-modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="upload-avatar-modal__title">
                Change Avatar
            </div>
            <input
              type="file"
              className={`upload-avatar-modal__input`}
              ref={refPhoto}
              onChange={handleNewPhoto}
              title=""
              value=""
              accept={"image/*"}
              name="avatar"
            />
            <button 
              className="upload-avatar-modal__btn"
              onClick={handleUploadPhoto}
            >
                Upload Avatar
            </button>
            {user?.avatar && (
              <button 
                className="upload-avatar-modal__btn"
                onClick={handleDeletebtn}
              >
                Remove Current Avatar
              </button>
            )}  
              <button 
                className="upload-avatar-modal__btn"
                onClick={() => setIsUploadAvatarModalOpen(false)}
              >
                Cancel
              </button>
          </div>
        </div>
      )

  )
}