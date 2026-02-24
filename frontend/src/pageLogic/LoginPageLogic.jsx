import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useLoginPage() {
  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    return usernameRegex.test(username)
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const validateForm = () => {
    const newErrors = {}

    if (isSignUp) {
      if (!formData.email) newErrors.email = 'Email is required'
      else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address'

      if (!formData.username) newErrors.username = 'Username is required'
      else if (!validateUsername(formData.username)) newErrors.username = 'Username must be 3-20 characters, letters, numbers, and underscores only'

      if (!formData.password) newErrors.password = 'Password is required'
      else if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters'

      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    } else {
      if (!formData.username) newErrors.username = 'Username is required'
      if (!formData.password) newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)

    if (isSignUp) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        })
        const data = await response.json()
        if (data.success) {
          alert('Account created successfully! Please login.')
          setIsSignUp(false)
          setFormData({ username: '', password: '', email: '', confirmPassword: '' })
          setErrors({})
        } else {
          if (data.errors) setErrors(data.errors)
          else if (data.field) setErrors({ [data.field]: data.message })
          else alert(data.message || 'Registration failed')
        }
      } catch (error) {
        console.error('Registration error:', error)
        alert('Registration failed. Please try again.')
      }
    } else {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: formData.username, password: formData.password }),
        })
        const data = await response.json()
        if (data.success) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          navigate('/home')
        } else {
          alert(data.message || 'Login failed')
        }
      } catch (error) {
        console.error('Login error:', error)
        alert('Login failed. Please try again.')
      }
    }

    setIsLoading(false)
  }

  const toggleModeAndReset = () => {
    setIsSignUp(!isSignUp)
    setFormData({ username: '', password: '', email: '', confirmPassword: '' })
    setErrors({})
  }

  return {
    isSignUp,
    setIsSignUp,
    formData,
    setFormData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    toggleModeAndReset,
  }
}


