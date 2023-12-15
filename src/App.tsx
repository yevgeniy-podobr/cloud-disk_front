import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components';
import { ForgotPassword, LoadingContent, ResetPassword } from './components/molecules';
import { setIsAuth, setUser, useAppDispatch, useTypedSelector } from './redux';
import { auth, login, registration } from './services/userApi';
import * as route from './services/route'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EAuthorizationTitle, EPageTitle } from './utils/constants/userConstants';
import { Authorization, Disk } from './pages';
import { ESSFileKeys } from './utils/constants/sessionStorageKeys';

const App = () => {
  const isAuth = useTypedSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch()
  const tokenFromStorage = localStorage.getItem("token")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (tokenFromStorage && !isAuth) {
      setIsLoading(true)
      auth()
        .then((res) => {
          dispatch(setUser(res.user))
          dispatch(setIsAuth(true))
          sessionStorage.removeItem(ESSFileKeys.downloads)
        })
        .finally(() => setIsLoading(false))
    }
  }, [dispatch, tokenFromStorage, isAuth])

  return (
    <HashRouter>
      <div className="app">
        <ToastContainer
          limit={3}
          newestOnTop={true}
          autoClose={3000}
          theme="light"
        />
      {isLoading 
        ? <LoadingContent isLoading={isLoading} /> 
        : (
          <>
            <Navbar/>
            <div className="app__wrapper container">
              {(!isAuth && !tokenFromStorage )
                ? (
                    <Routes>
                      <Route path={route.registration} element={
                        <Authorization
                          title={EAuthorizationTitle.registration}
                          pageTitle={EPageTitle.registration}
                          action={registration} 
                          btnText='Sign Up'
                        />
                      }/>
                      <Route path={route.login} element={
                        <Authorization 
                          title={EAuthorizationTitle.login} 
                          pageTitle={EPageTitle.login}
                          action={login} 
                          btnText='Sign In'
                        />
                      }/>
                      <Route path={route.forgotPassword} element={<ForgotPassword/>}/>
                      <Route path={route.resetPassword} element={<ResetPassword/>}/>
                      <Route path="*" element={<Navigate replace to={route.login} />} />
                    </Routes>
                ) : (
                  <Routes>
                    <Route path={route.disk} element={<Disk />}/>
                    <Route path="*" element={<Navigate replace to={route.disk} />} />
                  </Routes>
                )
              }
            </div>
          </>
        )
      }
      </div>
    </HashRouter>
  );
}

export default App;
