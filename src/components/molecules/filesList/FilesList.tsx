import React from "react";
import './filesList.scss';
import { useTypedSelector } from "../../../redux";
import { File } from "../file";
import { EFolderDisplayOptions } from "../../../utils/constants/fileConstants";

export const FilesList = () => {
  const files = useTypedSelector(state => state.file.files)
  const currentFolder = useTypedSelector(state => state.file.currentFolder)
  const folderDisplay = useTypedSelector(state => state.file.folderDisplay)
  const preparedFiles = files.filter(file => file)
  return (
    folderDisplay === EFolderDisplayOptions.list ? (
      <div className="files-list">
        <div className="files-list__header">
          <div className="files-list__header-name">Name</div>
          <div className="files-list__header-date">Date</div>
          <div className="files-list__header-size">Size</div>
        </div>
        {!preparedFiles?.length ? (
          <div className="files-list__empty">
            {`The ${currentFolder ? 'folder' : 'cloud'} is empty.`}
            <br/>
            Please create a folder or upload a file...
          </div>
        ) : (
          preparedFiles.filter(file => file).map(file => {
            return (
              <File 
                key={file._id} 
                name={file.name} 
                date={file.date.slice(0, 10)} 
                size={file.size} 
                id={file._id}
                type={file.type}
              />
            )}
          )
        )}
      </div>
    ) : (
      !preparedFiles?.length ? (
        <div className="files-list__empty">
          {`The ${currentFolder ? 'folder' : 'cloud'} is empty.`}
          <br/>
          Please create a folder or upload a file...
        </div>
      ) : (
        <div className="files-plates">
          {preparedFiles.map(file => {
            return (
              <File 
                key={file._id} 
                name={file.name} 
                date={file.date.slice(0, 10)} 
                size={file.size} 
                id={file._id}
                type={file.type}
              />
            )}
          )
        }
        </div>
      )
    )
  )
}
