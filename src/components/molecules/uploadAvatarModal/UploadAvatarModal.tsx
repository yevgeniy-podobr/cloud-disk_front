import React, { useRef } from "react";
import './uploadAvatarModal.scss';
import { deleteAvatar, uploadAvatar } from "../../../services/userApi";
import { setUser, useAppDispatch, useTypedSelector } from "../../../redux";

interface IProps {
  setIsUploadAvatarModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const UploadAvatarModal = (props: IProps) => {
  const { setIsUploadAvatarModalOpen } = props
  const dispatch = useAppDispatch()
  const refPhoto = useRef<HTMLInputElement>(null)
  const user = useTypedSelector(state => state.user.currentUser)

  const handleUploadPhoto = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (refPhoto.current) {
      refPhoto.current.click()
    }
  }

  const handleNewPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoto = event.target.files![0]
    setIsUploadAvatarModalOpen(false)
    uploadAvatar(newPhoto).then(res => dispatch(setUser(res)))
  }

  const handleDeletebtn = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setIsUploadAvatarModalOpen(false)
    deleteAvatar().then((res) => dispatch(setUser(res)))
  }

  return (
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
}