import React, { useState } from "react";
import './resetPassword.scss'
import { InputWithLabel } from "../../atoms";
import { EAuthorizationTitle, EPageTitle } from "../../../utils/constants/userConstants";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../services/userApi";
import { toast } from "react-toastify";
import * as route from '../../../services/route'
import { Helmet } from "react-helmet";

export const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const  { id, token } = useParams()

  const resetPasswordMutation = useMutation({
    mutationFn: (variables: {password: string, id: string, token: string}) => resetPassword(variables.password, variables.id, variables.token),
  })

  const handleSubmit = () => {
    if (id && token) {
      resetPasswordMutation.mutate({
        password,
        id,
        token
      }, {
        onSuccess: (res) => {
          toast.success(res.message)
          navigate(route.login)
        }
      })
    } else {
      toast.error("Invalid link")
    }
  }

  return (
    <div className="reset-pass">
      <Helmet>
        <title>{EPageTitle.resetPassword}</title>
      </Helmet>
      <p className="reset-pass__header">{EAuthorizationTitle.resetPassword}</p>

      <InputWithLabel 
        textLabel={password ? "New password" : "Enter new password..."}
        type="password"
        id="password" 
        value={password ?? ''}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button 
        className="reset-pass__btn button" 
        onClick={handleSubmit}
        disabled={!password || resetPasswordMutation.isPending}
      >
        Submit
      </button>
    </div>
  )
}