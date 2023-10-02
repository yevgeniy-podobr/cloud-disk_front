import React, { useMemo, useState } from 'react'
import './navbar.scss'
import { NavLink } from 'react-router-dom'
import { setFiles, setIsAuth, setUser, useAppDispatch, useTypedSelector } from '../../../redux'
import { setUploadFiles } from '../../../redux/uploadReducer'
import { ESSKeys } from '../../../utils/constants/sessionStorageKeys'
import { getFiles, searchFile } from '../../../services/fileApi'
import _ from 'lodash'
import defaultLogo from '../../../assets/default-logo.png'
import { UploadAvatarModal } from '../uploadAvatarModal'
import { API_URL } from '../../../services/config'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const isAuth = useTypedSelector(state => state.user.isAuth)
  const currentFolder = useTypedSelector(state => state.file.currentFolder)
  const user = useTypedSelector(state => state.user.currentUser)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [isUploadAvatarModalOpen, setIsUploadAvatarModalOpen] = useState(false)

  const onLogout = () => {
    dispatch(setUser({}))
    dispatch(setIsAuth(false))
    localStorage.removeItem("token")
    sessionStorage.removeItem(ESSKeys.downloads)
    dispatch(setUploadFiles([]))
  } 

  const debounceFunc = useMemo(
    () => _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        getFiles(currentFolder, 'type')
          .then(res => dispatch(setFiles(res)))
      } else {
        searchFile(e.target.value).then(res => dispatch(setFiles(res)))
      }
    }, 500),
    [dispatch, currentFolder]
  )

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    debounceFunc(e)
  }

  return (
    <div className="navbar container">
      {isUploadAvatarModalOpen && (
        <UploadAvatarModal setIsUploadAvatarModalOpen={setIsUploadAvatarModalOpen}/>
      )}
      <div className="navbar__wrapper">
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
        
        <div className="navbar__authorization">
          {!isAuth ? (
            <>
              <div className="navbar__authorization-login">
                <NavLink to='/login'>Sing In</NavLink>
              </div>
              <div className="navbar__authorization-registration">
                <NavLink to='/registration'>Sing Up</NavLink>
              </div>
            </>
          ) : (
            <>
              <img 
                className='navbar__authorization-avatar' 
                src={user?.avatar ? `${API_URL}${user?.avatar}` : defaultLogo} 
                alt='avatar'
                onClick={() => setIsUploadAvatarModalOpen(true)}  
              />
              <div className="navbar__authorization-sign-out" onClick={() => onLogout()}>
                Sing Out
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}