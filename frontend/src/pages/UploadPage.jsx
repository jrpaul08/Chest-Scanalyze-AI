import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useUploadPage } from '../pageLogic/UploadPageLogic'

const DISEASE_LABELS = [
  'Atelectasis', 'Cardiomegaly', 'Consolidation', 'Edema', 'Effusion',
  'Emphysema', 'Fibrosis', 'Hernia', 'Infiltration', 'Mass', 'Nodule',
  'Pleural_Thickening', 'Pneumonia', 'Pneumothorax',
]

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
        <div className="max-w-3xl mx-auto px-6">
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
      <div className="max-w-3xl mx-auto px-6 py-10">
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
            {isLoading ? 'Analyzing...' : 'Predict'}
          </button>

          {result && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              {/* Summary verdict */}
              <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Result: {result.binary_predictions?.some(Boolean)
                    ? `${result.binary_predictions.filter(Boolean).length} condition(s) detected`
                    : 'No conditions detected'}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {result.binary_predictions?.some(Boolean)
                    ? 'The following conditions were found based on our predictions:'
                    : 'None of the 14 screened conditions were found based on our predictions.'}
                </p>
                {result.binary_predictions?.some(Boolean) && (
                  <ul className="mt-2 text-sm text-amber-700 font-medium">
                    {(result.binary_predictions || [])
                      .map((b, i) => (b ? DISEASE_LABELS[i] : null))
                      .filter(Boolean)
                      .map((label) => (
                        <li key={label}>• {label}</li>
                      ))}
                  </ul>
                )}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-4">Analysis Results</h3>
              <div className="space-y-2">
                {(result.probabilities || []).map((prob, i) => {
                  const label = DISEASE_LABELS[i] || `Class ${i}`
                  const isPositive = result.binary_predictions?.[i] === 1
                  const pct = (prob * 100).toFixed(1)
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                        isPositive ? 'bg-amber-50' : 'bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isPositive && (
                          <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />
                        )}
                        <span className="font-medium text-slate-800">{label}</span>
                      </div>
                      <span className={`text-sm font-medium ${isPositive ? 'text-amber-700' : 'text-slate-600'}`}>
                        {pct}%
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
