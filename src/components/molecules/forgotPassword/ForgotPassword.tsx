import React, { useState } from "react";
import './forgotPassword.scss'
import { InputWithLabel } from "../../atoms";
import { EAuthorizationTitle, EPageTitle } from "../../../utils/constants/userConstants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../services/userApi";
import { useNavigate } from "react-router";
import * as route from '../../../services/route'
import { Helmet } from "react-helmet";


export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const forgotPasswordMutation = useMutation({
    mutationFn: (variables: string) => forgotPassword(variables),
  })

  const handleSubmit = () => {
    forgotPasswordMutation.mutate(email, {
      onSuccess: (res) => {
        toast.success(res.message)
        navigate(route.login)
      }
    })
  }

  return (
    <div className="forgot-pass">
      <Helmet>
        <title>{EPageTitle.forgotPassword}</title>
      </Helmet>
      <p className="forgot-pass__header">{EAuthorizationTitle.forgotPassword}</p>

      <InputWithLabel 
        textLabel={email ? "Email" : "Enter email..."}
        type="text"
        id="email" 
        value={email ?? ''}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button 
        className="forgot-pass__btn button" 
        onClick={handleSubmit}
        disabled={!email || forgotPasswordMutation.isPending}
      >
        Submit
      </button>
    </div>
  )
}