import React from 'react'
import { Button } from '../../atoms/button'
// import { ConfirmationUpdateModal, ModalBox } from '../../../molecules'
import './uploadPhoto.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  accept: string
  bckImage?: true
  withoutBtns?: true
  photo: File | null
  className?: string
  propsPhoto?: string
  basicPhoto?: string
  updatedPhoto?: string
  profilePhoto?: string
  backgroundImage: string
  isModalVisible?: boolean
  closeModal: () => void | undefined
  refPhoto: React.RefObject<HTMLInputElement>
  handleUploadPhoto: (e: React.MouseEvent<HTMLElement>) => void
  handleDeletebtn: (event: React.MouseEvent<HTMLElement>) => void
  handleNewPhoto: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const UploadPhotoUI = (props: Props) => {
  const {
    photo,
    accept,
    bckImage,
    refPhoto,
    className,
    propsPhoto,
    withoutBtns,
    closeModal,
    updatedPhoto,
    isModalVisible,
    handleNewPhoto,
    handleDeletebtn,
    handleUploadPhoto,
    backgroundImage,
    profilePhoto,
  } = props

  return (
    <>
      <div
        className={`upload-photo ${className ?? ''}${
          bckImage ? ' upload-photo__background' : ''
        }`}
        style={
          bckImage && {
            backgroundImage: `${backgroundImage}`,
          }
        }
      >
        {!bckImage && (
          <img
            className="upload-photo__icon"
            src={profilePhoto}
            alt="profile_photo"
          />
        )}
        <input
          type="file"
          className={`upload-photo__inputphoto`}
          ref={refPhoto}
          onChange={handleNewPhoto}
          title=""
          value=""
          accept={accept}
          data-testid="upload-photo__inputphoto"
        />
        {withoutBtns ? (
          // isModalVisible && (
          //   <ModalBox onCloseModal={() => closeModal()}>
          //     <ConfirmationUpdateModal
          //       title={bckImage ? 'Change Background Photo' : 'Change Photo'}
          //       uploadText={'Upload Photo'}
          //       removeText={(photo || propsPhoto) && `Remove Current Photo`}
          //       uploadAction={handleUploadPhoto}
          //       remove={handleDeletebtn}
          //       closeAction={() => closeModal()}
          //     />
          //   </ModalBox>
          // )
          <div className="test">test</div>
        ) : (
          <>
            <Button
              type="button"
              onClick={handleUploadPhoto}
              className="upload-photo__button"
            >
              {photo || updatedPhoto ? 'Upload new Photo' : 'Upload A Photo'}
            </Button>
            {(photo || propsPhoto) && (
              <Button
                onClick={handleDeletebtn}
                className="upload-file__form-upload-submit upload-file__delete-button"
              >
                Delete
              </Button>
            )}
          </>
        )}
      </div>
    </>
  )
}
