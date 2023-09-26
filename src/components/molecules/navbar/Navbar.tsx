import React from 'react'
import './navbar.scss'
import { NavLink } from 'react-router-dom'
import { setIsAuth, setUser, useAppDispatch, useTypedSelector } from '../../../redux'
import { setUploadFiles } from '../../../redux/uploadReducer'
import { ESSKeys } from '../../../utils/constants/sessionStorageKeys'

export const Navbar = () => {
  const isAuth = useTypedSelector(state => state.user.isAuth)
  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(setUser({}))
    dispatch(setIsAuth(false))
    localStorage.removeItem("token")
    sessionStorage.removeItem(ESSKeys.downloads)
    dispatch(setUploadFiles([]))
  } 

  return (
    <div className="navbar container">
      <div className="navbar__container">
        <div className="navbar__header">
          MERN CLOUD
        </div>
        {!isAuth ? (
          <>
            <div className="navbar__login">
              <NavLink to='/login'>Sing In</NavLink>
            </div>
            <div className="navbar__registration">
              <NavLink to='/registration'>Sing Up</NavLink>
            </div>
          </>
        ) : (
          <div className="navbar__sign-out" onClick={() => onLogout()}>
            Sing Out
          </div>
        )}

      </div>
    </div>
  )
}
