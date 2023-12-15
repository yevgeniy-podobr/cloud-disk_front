import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components';
import { ForgotPassword, ResetPassword } from './components/molecules';
import { setIsAuth, setUser, useAppDispatch, useTypedSelector } from './redux';
import { login, registration } from './services/userApi';
import * as route from './services/route'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EAuthorizationTitle, EPageTitle } from './utils/constants/userConstants';
import { Authorization, Disk } from './pages';
import { ESSUserKeys } from './utils/constants/sessionStorageKeys';

const App = () => {
  const isAuth = useTypedSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch()
  const tokenFromStorage = localStorage.getItem("token")
  const userDataFromStorage = sessionStorage.getItem(ESSUserKeys.userData)

  useEffect(() => {
    if (tokenFromStorage && !isAuth && userDataFromStorage) {
      dispatch(setUser(JSON.parse(userDataFromStorage)))
      dispatch(setIsAuth(true))
    }
    if ((tokenFromStorage && !userDataFromStorage) || (!tokenFromStorage && userDataFromStorage)) {
      localStorage.clear()
      sessionStorage.clear()
    }
  }, [dispatch, tokenFromStorage, isAuth, userDataFromStorage])

  return (
    <div className="app">
      <ToastContainer
        limit={3}
        newestOnTop={true}
        autoClose={3000}
        theme="light"
      />
      
      <Navbar/>
      <div className="app__wrapper container">
        {(!isAuth && (!tokenFromStorage || !userDataFromStorage))
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
    </div>
  );
}

export default App;
