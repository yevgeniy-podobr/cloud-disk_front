import React, { useMemo, useState } from 'react'
import './navbar.scss'
import { setCurrentFolder, setFiles, setFolderStack, setIsAuth, setUser, useAppDispatch, useTypedSelector } from '../../../redux'
import { setUploadFiles } from '../../../redux/uploadReducer'
import { ESSFileKeys } from '../../../utils/constants/sessionStorageKeys'
import { getFiles, getSearchFiles } from '../../../services/fileApi'
import _ from 'lodash'
import defaultLogo from '../../../assets/default-logo.png'
import { UploadAvatarModal } from '../../molecules'
import { API_URL } from '../../../services/config'
import { Input } from '../../atoms'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FilesQueries } from '../../../utils/constants/queries'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const isAuth = useTypedSelector(state => state.user.isAuth)
  const currentFolder = useTypedSelector(state => state.file.currentFolder)
  const user = useTypedSelector(state => state.user.currentUser)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [isUploadAvatarModalOpen, setIsUploadAvatarModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const {
    refetch: getFilesRefresh,
  } = useQuery({
      queryKey: [FilesQueries.listOfFiles], 
      queryFn: () => getFiles(currentFolder, 'type').then(res => {
        sessionStorage.removeItem(ESSFileKeys.isFileNotFound)
        dispatch(setFiles(res))}),
      enabled: false,
    },
  )

  const {
    refetch: getFilesFromSearchRefresh,
  } = useQuery({
      queryKey: [FilesQueries.listOfFilesFromSearch], 
      queryFn: () => getSearchFiles(searchValue ?? '').then(res => {
        if (!res.length) {
          sessionStorage.setItem(ESSFileKeys.isFileNotFound, 'true')
        } else {
          sessionStorage.removeItem(ESSFileKeys.isFileNotFound)
        }
        dispatch(setFiles(res))
      }),
      enabled: false,
    },
  )

  const onLogout = () => {
    dispatch(setUser({}))
    dispatch(setIsAuth(false)) 
    localStorage.removeItem("token")
    sessionStorage.clear()
    dispatch(setUploadFiles([]))
    queryClient.clear()
    dispatch(setCurrentFolder(null))
    dispatch(setFolderStack([]))
    setSearchValue(null)
  } 

  const debounceFunc = useMemo(
    () => _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        getFilesRefresh()
      } else {
        getFilesFromSearchRefresh()
      }
    }, 500),
    [getFilesFromSearchRefresh, getFilesRefresh]
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
            CLOUD STORAGE 2023
          </div>
          {isAuth && (
            <div className="navbar__header-search">
              <Input 
                type="text" 
                className='navbar__header-search_input'
                placeholder="Search files..."
                value={searchValue ?? ''}
                onChange={e => searchHandler(e)}
              />
            </div>
          )}
        </div>
        
        {isAuth && 
          <div className="navbar__authorization">
            <img 
              className='navbar__authorization-avatar' 
              src={user?.avatar ? `${API_URL}api/files/avatar/${user?.avatar}` : defaultLogo} 
              alt='avatar'
              onClick={() => setIsUploadAvatarModalOpen(true)}  
            />
            <p className="navbar__authorization-sign-out" onClick={onLogout}>
              Sing Out
            </p>
          </div>
        }
      </div>
    </div>
  )
}
