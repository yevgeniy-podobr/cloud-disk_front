import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import './authorization.scss'
import { InputWithLabel } from "../../components/atoms";
import {  AppDispatch, useAppDispatch } from "../../redux";
import { LoadingContent } from "../../components/molecules/loadingContent";
import { Link } from "react-router-dom";
import * as route from '../../services/route'
import { EAuthorizationTitle } from "../../utils/constants/userConstants";

interface Props {
  title: string
  pageTitle: string
  btnText: string
  action: (email: string, password: string) => (dispatch: AppDispatch) => Promise<void>
}

export const Authorization = (props: Props) => {
  const {title, action, btnText, pageTitle} = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  return (
    isLoading 
      ? <LoadingContent isLoading={isLoading} /> 
      : (
        <div className="authorization">
          <Helmet>
            <title>{pageTitle}</title>
          </Helmet>
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

          {title === EAuthorizationTitle.login 
            && (
              <div className="authorization__forgot-pass">
                <Link className="authorization__forgot-pass-link" to={route.forgotPassword}>Forgot Password?</Link>
              </div>
) }
    
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