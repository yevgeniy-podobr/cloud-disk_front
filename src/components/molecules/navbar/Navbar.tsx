import React from 'react'
import './navbar.scss'
import { NavLink } from 'react-router-dom'
import { setIsAuth, setUser, useAppDispatch, useTypedSelector } from '../../../reducers'

export const Navbar = () => {
  const isAuth = useTypedSelector(state => state.user.isAuth)
  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(setUser({}))
    dispatch(setIsAuth(false))
    localStorage.removeItem("token")
  } 

  return (
    <div className="navbar">
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
          <div className="navbar__login" onClick={() => onLogout()}>
            Sing Out
          </div>
        )}

      </div>
    </div>
  )
}
