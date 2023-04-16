import React from 'react'
import {BrowserRouter, Routes, Route}from 'react-router-dom'
import Sigin from './Pages/Sigin/Sigin'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/sigin' element={<Sigin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App