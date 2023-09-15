import React from 'react'
import './navbar.scss'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__header">
          MERN CLOUD
        </div>
        <div className="navbar__login">
          <NavLink to='/login'>Sing In</NavLink>
        </div>
        <div className="navbar__registration">
          <NavLink to='/registration'>Sing Up</NavLink>
        </div>
      </div>
    </div>
  )
}
