/**
 * API config - base URL and auth helpers.
 * Set VITE_API_URL in .env for different environments.
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}
