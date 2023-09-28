import React, { useState } from 'react'
import './navbar.scss'
import { NavLink } from 'react-router-dom'
import { setFiles, setIsAuth, setUser, useAppDispatch, useTypedSelector } from '../../../redux'
import { setUploadFiles } from '../../../redux/uploadReducer'
import { ESSKeys } from '../../../utils/constants/sessionStorageKeys'
import { getFiles, searchFile } from '../../../services/fileApi'

export const Navbar = () => {
  const isAuth = useTypedSelector(state => state.user.isAuth)
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const currentFolder =useTypedSelector(state => state.file.currentFolder)

  const onLogout = () => {
    dispatch(setUser({}))
    dispatch(setIsAuth(false))
    localStorage.removeItem("token")
    sessionStorage.removeItem(ESSKeys.downloads)
    dispatch(setUploadFiles([]))
  } 

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    if (e.target.value === '') {
      getFiles(currentFolder, 'type')
        .then(res => dispatch(setFiles(res)))
    } else {
      searchFile(e.target.value).then(res => dispatch(setFiles(res)))
    }
  }
  console.log(currentFolder)
  return (
    <div className="navbar container">
      <div className="navbar__container">
        <div className="navbar__header">
          <div className="navbar__header-title">
            MERN CLOUD
          </div>
          {isAuth && (
            <div className="navbar__header-search">
              <input 
                className='navbar__header-search_input'
                placeholder='Search files...' 
                value={searchValue ?? ''} 
                onChange={e => searchHandler(e)}
              />
            </div>
          )}
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
