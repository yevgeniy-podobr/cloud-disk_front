import React, { useState } from "react";
import './registration.scss'
import { Input } from "../../atoms";
import { login, registration } from "../../../services/userApi";
import { useAppDispatch } from "../../../redux";

export const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const registrationHandler = () => {
    registration(email, password).then((_) => 
      setTimeout(() => {
        dispatch(login(email, password))
      }, 4000)
    )
  }
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

      <button 
        className="registration__btn button" 
        onClick={() => registrationHandler()}
        disabled={!email || !password}
      >
        Sign Up
      </button>
    </div>
  )
}

