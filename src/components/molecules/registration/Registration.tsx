import React, { useState } from "react";
import './registration.scss'
import { Input } from "../../atoms";
import { registration } from "../../../services/userApi";

export const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="registration">
      <p className="registration__header">Registration</p>

      <Input 
        type="test" 
        placeholder="Enter email..."
        value={email ?? ''}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input 
        type="password" 
        placeholder="Enter password..."
        value={password ?? ''}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="registration__btn" onClick={() => registration(email, password)}>
        Sign Up
      </button>
    </div>
  )
}

