import React from 'react'
import logo from '../assets/chest-scanalyze-logo.png'
import { useLoginPage } from '../pageLogic/LoginPageLogic'

export const LoginPage = () => {
  const {
    isSignUp,
    formData,
    errors,
    isLoading,
    isDemoLoading,
    authBusy,
    handleChange,
    handleSubmit,
    toggleModeAndReset,
    handleTryDemo,
  } = useLoginPage()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-6">
      {/* Title Section - Outside the box */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
          Chest Scanalyze AI
        </h1>
        <p className="text-blue-200 text-lg font-medium">
          Advanced Chest X-Ray Disease Detection
        </p>
      </div>
      
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/25 bg-[#00083a] p-10 shadow-2xl">
          {/* Logo Section */}
          <div className="text-center mb-10">
            <img 
              src={logo} 
              alt="Chest Scanalyze AI Logo" 
              className="w-24 h-24 mx-auto mb-6 object-contain drop-shadow-md" 
            />
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field - only for sign up */}
            {isSignUp && (
              <div className="space-y-3">
                <label htmlFor="email" className="block text-sm font-semibold text-blue-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 placeholder:text-blue-300 bg-blue-800/50 text-white ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-400 focus:ring-red-400/20' 
                      : 'border-blue-700 focus:border-blue-400 focus:ring-blue-400/20'
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>
            )}
            
            <div className="space-y-3">
              <label htmlFor="username" className="block text-sm font-semibold text-blue-200">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className={`w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 placeholder:text-blue-300 bg-blue-800/50 text-white ${
                  errors.username 
                    ? 'border-red-500 focus:border-red-400 focus:ring-red-400/20' 
                    : 'border-blue-700 focus:border-blue-400 focus:ring-blue-400/20'
                }`}
                required
              />
              {errors.username && (
                <p className="text-red-400 text-sm">{errors.username}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <label htmlFor="password" className="block text-sm font-semibold text-blue-200">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 placeholder:text-blue-300 bg-blue-800/50 text-white ${
                  errors.password 
                    ? 'border-red-500 focus:border-red-400 focus:ring-red-400/20' 
                    : 'border-blue-700 focus:border-blue-400 focus:ring-blue-400/20'
                }`}
                required
              />
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password}</p>
              )}
              {isSignUp && !errors.password && formData.password && (
                <div className="text-xs text-blue-300">
                  <p>Password requirements:</p>
                  <ul className="list-disc list-inside ml-2">
                    <li className={formData.password.length >= 6 ? 'text-green-400' : 'text-gray-400'}>At least 6 characters</li>
                  </ul>
                </div>
              )}
            </div>
            
            {/* Confirm Password field - only for sign up */}
            {isSignUp && (
              <div className="space-y-3">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-blue-200">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 placeholder:text-blue-300 bg-blue-800/50 text-white ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:border-red-400 focus:ring-red-400/20' 
                      : 'border-blue-700 focus:border-blue-400 focus:ring-blue-400/20'
                  }`}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={authBusy}
              className={`w-full text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 mt-6 ${
                authBusy 
                  ? 'bg-blue-600 cursor-not-allowed' 
                  : 'bg-blue-800 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                isSignUp ? 'Sign Up' : 'Log In'
              )}
            </button>
          </form>

          {!isSignUp && (
            <div className="mt-8">
              <div className="relative mb-5">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-slate-600/40" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#00083a] px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                    or
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleTryDemo}
                disabled={authBusy}
                className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                  authBusy
                    ? 'cursor-not-allowed text-[#7a6b45]/90'
                    : 'text-[#c9a227] hover:bg-[#c9a227]/12 hover:text-[#dbb84a]'
                }`}
              >
                {isDemoLoading ? (
                  <span className="inline-flex items-center justify-center gap-2 text-[#c9a227]">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#8a7a40]/60 border-t-[#dbb84a]" />
                    Opening Demo…
                  </span>
                ) : (
                  'Try Demo without signing in'
                )}
              </button>
            </div>
          )}
          
          {/* Toggle Link */}
          <div className="text-center mt-6">
            <p className="text-blue-200 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button 
                type="button"
                className="text-white font-semibold hover:text-blue-300 transition-colors duration-200 underline"
                onClick={toggleModeAndReset}
              >
                {isSignUp ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  )
}
