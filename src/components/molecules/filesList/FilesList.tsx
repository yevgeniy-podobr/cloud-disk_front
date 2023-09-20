import React from "react";
import './filesList.scss';
import { useTypedSelector } from "../../../reducers";
import { File } from "../../atoms";

export const FilesList = () => {
  const files = useTypedSelector(state => state.file.files)
  // const files = [
  //   {_id: 1, name: 'direc', type: 'dir', size: '5gb', date: '20.02.2020'},
  //   {_id: 2, name: 'direc2', type: 'dir2', size: '5gb', date: '21.02.2020'}
  // ]
  return (
    <div className="files-list">
      <div className="files-list__header">
        <div className="files-list__header-name">Name</div>
        <div className="files-list__header-date">Date</div>
        <div className="files-list__header-size">Size</div>
      </div>
      {files.map(file => {
          return (
            <File key={file._id} name={file.name} date={file.date.slice(0, 10)} size={file.size} type={file.type}/>
          )
        })}
    </div>
  )
}
