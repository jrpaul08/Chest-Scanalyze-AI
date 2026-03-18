import { Navigate } from 'react-router-dom'

/**
 * Wraps routes that require authentication.
 * If no token in localStorage, redirects to /login.
 */
export function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
