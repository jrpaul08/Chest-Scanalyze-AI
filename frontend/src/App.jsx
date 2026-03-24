import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { UploadPage } from './pages/UploadPage'
import { GalleryPage } from './pages/GalleryPage'
import { ProtectedRoute } from './components/ProtectedRoute'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
        <Route path="/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
        <Route path="/library" element={<Navigate to="/gallery" replace />} />
      </Routes>
    </div>
  )
}
