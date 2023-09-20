import React from "react";
import './popup.scss';
import { Input } from "../input";

export const Popup = () => {
  return (
    <div className="popup">
      <div className="popup__content">
        <div className="popup_header">
          <div className="popup__header-title">
            Create new folder
          </div>
          <button className="popup__header-btn-close">
            X
          </button>
        </div>
        <Input type="text" placeholder="Enter the folder name..."/>
      </div>
    </div>
  )
}
