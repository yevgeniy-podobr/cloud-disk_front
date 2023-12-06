import React, { useState } from "react";
import './addFolderModal.scss';
import { Input } from "../../atoms/input";
import { useTypedSelector } from "../../../redux";
import { toast } from "react-toastify";

interface IProps {
  setAddFolderModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  createFolderHandler: (folderName: string) => void
}

export const AddFolderModal = (props: IProps) => {
  const { setAddFolderModalOpen, createFolderHandler } = props
  const [folderName, setFolderName] = useState('')
  const files = useTypedSelector(state => state.file.files)

  const handleCreateFolder = () => {
    const isFolderWithSameName = files?.some(file => file?.name === folderName)
    if (isFolderWithSameName) {
      toast.error('Folder with this name exists')
    } else {
      createFolderHandler(folderName)
      setAddFolderModalOpen(false)
      setFolderName('')
    }
  }

  return (
    <div className="add-folder-modal" onClick={() => setAddFolderModalOpen(false)}>
      <div className="add-folder-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="add-folder-modal__header">
          <div className="add-folder-modal__header-title">
            Create new folder
          </div>
          <button 
            className="add-folder-modal__header-btn-close"
            onClick={() => setAddFolderModalOpen(false)}  
          >
            X
          </button>
        </div>
        <Input 
          type="text" 
          placeholder="Enter the folder name..." 
          value={folderName} 
          onChange={(e) => setFolderName(e.target.value)}
        />
        <div className="add-folder-modal__btn-create-wrapper">
          <button 
            className="add-folder-modal__btn-create button"
            onClick={handleCreateFolder}
            disabled={!folderName}
          >
            Create
          </button>
        </div>

      </div>
      
    </div>
  )
}
