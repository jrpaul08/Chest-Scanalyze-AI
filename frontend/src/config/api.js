/**
 * API config - base URL and auth helpers.
 * Set VITE_API_URL in .env for different environments.
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000'

/** Defaults match the portfolio demo account; override via VITE_DEMO_USERNAME / VITE_DEMO_PASSWORD if needed. */
export const DEMO_USERNAME =
  import.meta.env.VITE_DEMO_USERNAME ?? 'demo_user'
export const DEMO_PASSWORD =
  import.meta.env.VITE_DEMO_PASSWORD ?? 'demo123'

export async function loginWithPassword(username, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  return response.json()
}

export function setAuthSession(token, user) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem('user')
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/** True when the logged-in user is the shared demo account (Try Demo / demo_user). */
export function isDemoUserSession() {
  const u = getStoredUser()
  return Boolean(u?.username && u.username === DEMO_USERNAME)
}
