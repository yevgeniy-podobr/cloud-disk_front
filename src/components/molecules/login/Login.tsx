import React, { useState } from "react";
import './login.scss'
import { Input } from "../../atoms";
import { login } from "../../../services/userApi";
import { setUser, useAppDispatch, useTypedSelector } from "../../../reducers";
// import { registration } from "../../../services/userApi";

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

      <button className="login__btn" onClick={() => dispatch(login(email, password))}>
        Sign In
      </button>
    </div>
  )
}