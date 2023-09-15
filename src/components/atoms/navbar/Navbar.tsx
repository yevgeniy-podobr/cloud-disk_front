import React from 'react'
import './navbar.scss'

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__header">
          MERN CLOUD
        </div>
        <div className="navbar__login">
          Sing In
        </div>
        <div className="navbar__registration">
          Sign Up
        </div>
      </div>
    </div>
  )
}
