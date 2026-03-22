import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useUploadPage } from '../pageLogic/UploadPageLogic'
import { DiagnosticReport } from '../components/DiagnosticReport'

export const UploadPage = () => {
  const {
    file,
    previewUrl,
    isDragging,
    isLoading,
    error,
    result,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handlePredict,
  } = useUploadPage()

  return (
    <div className="min-h-screen bg-white">
      {/* Top banner */}
      <div className="bg-slate-900 text-white py-10">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">New Scan</h1>
          <p className="mt-2 text-blue-200">Upload a chest X-ray to get an AI-generated analysis.</p>
        </div>
      </div>

      {/* Upload area */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <label
            className={`block mt-2 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
            {previewUrl ? (
              <div className="space-y-3">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg object-contain"
                />
                <p className="text-sm text-slate-600">{file?.name}</p>
                <p className="text-xs text-slate-500">Click or drag a new image to replace</p>
              </div>
            ) : (
              <div className="text-slate-600">
                <p className="font-medium">Drag and drop or click to select</p>
                <p className="text-sm mt-1">Chest X-ray image (JPEG, PNG)</p>
              </div>
            )}
          </label>

          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}

          <button
            onClick={handlePredict}
            disabled={!file || isLoading}
            className={`mt-6 px-6 py-3 rounded-lg font-medium transition-colors ${
              !file || isLoading
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Analyzing...' : 'Generate Results'}
          </button>

          {result?.report && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <DiagnosticReport report={result.report} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
