import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components';
import { Registration } from './components/molecules';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        <div className="app__wrapper">
          <Routes>
            <Route path='/registration' Component={Registration}/>
          </Routes>
        </div>

      </div>
    </BrowserRouter>

  );
}

export default App;
