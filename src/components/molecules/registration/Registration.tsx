import React from "react";
import './registration.scss'
import { Input } from "../../atoms";

export const Registration = () => {
  return (
    <div className="registration">
      <p className="registration__header">Registration</p>
      <Input type="test" placeholder=""/>
      <Input type="test" placeholder=""/>
      <Input type="test" placeholder=""/>
      <Input type="test" placeholder=""/>

      <button className="registration__btn">
        Sign Up
      </button>
    </div>
  )
}

