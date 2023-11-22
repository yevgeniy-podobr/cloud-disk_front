import React, { useState } from "react";
import './authorization.scss'
import { InputWithLabel } from "../../atoms";
import {  AppDispatch, useAppDispatch } from "../../../redux";
import { LoadingContent } from "../loadingContent";

interface Props {
  title: string
  btnText: string
  action: (email: string, password: string) => (dispatch: AppDispatch) => Promise<void>
}

export const Authorization = (props: Props) => {
  const {title, action, btnText} = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  return (
    isLoading 
      ? <LoadingContent isLoading={isLoading} /> 
      : (
        <div className="authorization">
          <p className="authorization__header">{title}</p>
    
          <InputWithLabel 
            textLabel={email ? "Email" : "Enter email..."}
            type="text"
            id="email" 
            value={email ?? ''}
            onChange={(e) => setEmail(e.target.value)}
          />
    
          <InputWithLabel 
            textLabel={password ? "Password" : "Enter password..."}
            type="password"
            id="password" 
            value={password ?? ''}
            onChange={(e) => setPassword(e.target.value)}
          />
    
          <button 
            className="authorization__btn button" 
            onClick={() => {
              setIsLoading(true)
              dispatch(action(email, password)).finally(() => setIsLoading(false))
            }}
            disabled={!email || !password || isLoading}
          >
            {btnText}
          </button>
        </div>
      )
  )
}