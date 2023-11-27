import React, { useState } from "react";
import './forgotPassword.scss'
import { InputWithLabel } from "../../atoms";
import { authorizationTitle } from "../../../utils/constants/userConstants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../services/userApi";
import { useNavigate } from "react-router";
import * as route from '../../../services/route'


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
      <p className="forgot-pass__header">{authorizationTitle.forgotPassword}</p>

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