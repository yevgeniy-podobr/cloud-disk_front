import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, Navigate, HashRouter } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components';
import { Authorization } from './components/molecules';
import { useAppDispatch, useTypedSelector } from './redux';
import { auth, login, registration } from './services/userApi';
import * as route from './services/route'
import { Disk } from './components/organism';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingContent } from './components/molecules/loadingContent';

const App = () => {
  const isAuth = useTypedSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch()
  const tokenFromStorage = localStorage.getItem("token")
  const [isLoading, setIsLoading] = useState(false)

  const authHandler = useCallback(() => {
    if (tokenFromStorage) {
      setIsLoading(true)
      dispatch(auth()).finally(() => setIsLoading(false))
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    authHandler()
  }, [authHandler])

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
                          title='Registration' 
                          action={registration} 
                          btnText='Sign Up'  
                        />
                      }/>
                      <Route path={route.login} element={
                        <Authorization 
                          title='Login' 
                          action={login} 
                          btnText='Sign In'
                        />
                      }/>
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
