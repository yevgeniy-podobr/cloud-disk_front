import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components';
import { Registration, Login } from './components/molecules';
import { useAppDispatch, useTypedSelector } from './reducers';
import { auth } from './services/userApi';

function App() {
  const isAuth = useTypedSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        <div className="app__wrapper">
          {!isAuth && 
            <Routes>
              <Route path='/registration' Component={Registration}/>
              <Route path='/login' Component={Login}/>
            </Routes>
          }
        </div>

      </div>
    </BrowserRouter>

  );
}

export default App;