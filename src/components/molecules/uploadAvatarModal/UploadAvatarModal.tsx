import React from "react";
import './uploadAvatarModal.scss';

interface IProps {
  setIsUploadAvatarModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const UploadAvatarModal = (props: IProps) => {
  const { setIsUploadAvatarModalOpen } = props
  const avatar = ''
  return (
    <div className="upload-avatar-modal" onClick={() => setIsUploadAvatarModalOpen(false)}>
      <div className="upload-avatar-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="upload-avatar-modal__title">
            Change Avatar
        </div>
        <button 
          className="upload-avatar-modal__btn"
          onClick={() => {}}
        >
            Upload Avatar
          <input type="file"/>
        </button>
        {!avatar && (
          <button 
            className="upload-avatar-modal__btn"
            onClick={() => {}}
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