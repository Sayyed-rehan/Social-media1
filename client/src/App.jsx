import React from 'react'
import {BrowserRouter, Routes, Route}from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Sigin from './Pages/Sigin/Sigin'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/sigin' element={<Sigin/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App