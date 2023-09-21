import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components';
import { Registration, Login } from './components/molecules';
import { useAppDispatch, useTypedSelector } from './redux';
import { auth } from './services/userApi';
import { Disk } from './components/organism';

const App = React.memo(() => {
  const isAuth = useTypedSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch()

  useEffect(() => {
    localStorage.getItem("token") && dispatch(auth())
    // eslint-disable-next-line
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        <div className="app__wrapper container">
          {!isAuth 
            ? (
                <Routes>
                  <Route path='/registration' element={<Registration />}/>
                  <Route path='/login' element={<Login />}/>
                  <Route path="*" element={<Navigate replace to="/login" />} />
                </Routes>
            ) : (
              <Routes>
                <Route path='/' element={<Disk />}/>
                <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
            )
          }
        </div>
      </div>
    </BrowserRouter>

  );
})

export default App;
