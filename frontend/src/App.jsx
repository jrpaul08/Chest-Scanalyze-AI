import React from 'react'
import { Route, Routes } from "react-router-dom"
import { Homepage } from './pages/Homepage'
import { LoginPage } from './pages/LoginPage'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>



    </div>
  )
}
 