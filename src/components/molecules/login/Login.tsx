import React, { useState } from "react";
import './login.scss'
import { Input } from "../../atoms";
import { login } from "../../../services/userApi";
import {  useAppDispatch } from "../../../redux";

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  return (
    <div className="login">
      <p className="login__header">Login</p>

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
        className="login__btn button" 
        onClick={() => email && password && dispatch(login(email, password))}
        disabled={!email || !password}
      >
        Sign In
      </button>
    </div>
  )
}