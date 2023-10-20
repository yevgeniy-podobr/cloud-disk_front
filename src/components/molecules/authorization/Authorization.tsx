import React, { useState } from "react";
import './authorization.scss'
import { Input } from "../../atoms";
import {  AppDispatch, useAppDispatch } from "../../../redux";

interface Props {
  title: string
  btnText: string
  action: (email: string, password: string) => (dispatch: AppDispatch) => Promise<void>
}

export const Authorization = (props: Props) => {
  const {title, action, btnText} = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  return (
    <div className="authorization">
      <p className="authorization__header">{title}</p>

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
        className="authorization__btn button" 
        onClick={() => email && password && dispatch(action(email, password))}
        disabled={!email || !password}
      >
        {btnText}
      </button>
    </div>
  )
}