import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { logout } from '../config/api'
import { DEMO_SAMPLES } from '../config/demoSamples'
import { useUploadPage } from '../pageLogic/UploadPageLogic'
import { DiagnosticReport } from '../components/DiagnosticReport'

export const UploadPage = () => {
  const navigate = useNavigate()
  const [sampleModalOpen, setSampleModalOpen] = useState(false)

  const {
    file,
    previewUrl,
    isDragging,
    isLoading,
    isSaving,
    saveSuccess,
    error,
    result,
    isDemoUser,
    selectingSampleId,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleSelectSample,
    handlePredict,
    handleSaveToLibrary,
  } = useUploadPage()

  const selectedSampleId = DEMO_SAMPLES.find((s) => s.filename === file?.name)?.id

  useEffect(() => {
    if (!sampleModalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setSampleModalOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sampleModalOpen])

  const handleModalSamplePick = async (sample) => {
    await handleSelectSample(sample)
    setSampleModalOpen(false)
  }

  const demoSampleGrid = (
    <div className="grid max-w-2xl grid-cols-3 gap-3 sm:gap-4">
      {DEMO_SAMPLES.map((s) => {
        const busy = selectingSampleId === s.id || isLoading
        const selected = selectedSampleId === s.id
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => handleSelectSample(s)}
            disabled={busy}
            aria-label={`Use demo sample ${s.id}`}
            className={`group relative overflow-hidden rounded-xl text-left shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-2 ring-offset-2 ring-offset-white ${
              selected
                ? 'ring-[#c9a227] shadow-md'
                : 'ring-transparent hover:ring-[#c9a227]/50'
            }`}
          >
            <img
              src={s.src}
              alt=""
              className="aspect-square w-full object-cover bg-slate-100"
            />
            {selectingSampleId === s.id && (
              <span className="absolute inset-0 flex items-center justify-center bg-slate-900/40">
                <span className="h-7 w-7 animate-spin rounded-full border-2 border-white border-t-transparent sm:h-8 sm:w-8" />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Top banner */}
      <div className="bg-slate-900 text-white py-10">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-start">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            onClick={() => { logout(); navigate('/login') }}
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Log out
          </button>
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">New Scan</h1>
          <p className="mt-2 text-blue-200">
            {isDemoUser
              ? 'Try a sample image below, or upload your own chest X-ray for analysis.'
              : 'Upload a chest X-ray to get an AI-generated analysis.'}
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {isDemoUser && (
            <div className="mb-10 rounded-2xl border-2 border-[#c9a227]/35 bg-gradient-to-b from-amber-50/80 to-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900">
                Try a sample X-ray
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Choose an image to see the full analysis and explore the app.
              </p>
              <div className="mt-6">{demoSampleGrid}</div>
            </div>
          )}

          {!isDemoUser && (
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Upload your chest X-ray
            </h2>
          )}
          {isDemoUser && (
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Or upload your own image
            </h2>
          )}

          <label
            className={`block mt-2 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${
              isDemoUser
                ? 'p-8'
                : 'min-h-[13rem] py-10 px-6 sm:px-8 md:min-h-[15rem] md:py-12 flex flex-col justify-center'
            } ${
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
                  className={`mx-auto rounded-lg object-contain ${
                    isDemoUser ? 'max-h-48' : 'max-h-52 md:max-h-56'
                  }`}
                />
                <p className="text-sm text-slate-600">{file?.name}</p>
                <p className="text-xs text-slate-500">Click or drag a new image to replace</p>
              </div>
            ) : (
              <div
                className={`text-slate-600 ${
                  !isDemoUser ? 'space-y-2' : ''
                }`}
              >
                <p
                  className={
                    isDemoUser
                      ? 'font-medium'
                      : 'text-base font-semibold text-slate-800 sm:text-[17px]'
                  }
                >
                  Drag and drop or click to select
                </p>
                <p
                  className={
                    isDemoUser
                      ? 'text-sm mt-1'
                      : 'text-sm text-slate-600 mt-1.5'
                  }
                >
                  Chest X-ray image (JPEG, PNG)
                </p>
              </div>
            )}
          </label>

          {!isDemoUser && (
            <div className="mt-6 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setSampleModalOpen(true)}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300/90 bg-slate-200/90 px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-300/90"
              >
                Try X-ray Sample
              </button>
              <p className="max-w-sm text-center text-[11px] italic leading-snug text-slate-500">
                Use a provided sample to explore how the analysis works.
              </p>
            </div>
          )}

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
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleSaveToLibrary}
                  disabled={isSaving || saveSuccess}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                    isSaving || saveSuccess
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-700 text-white hover:bg-slate-800'
                  }`}
                >
                  {isSaving ? 'Saving...' : saveSuccess ? 'Saved to Gallery' : 'Save to Gallery'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {sampleModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sample-modal-title"
        >
          <div
            className="absolute inset-0 bg-slate-900/50"
            aria-hidden="true"
            onClick={() => setSampleModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:max-w-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id="sample-modal-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  Choose a sample X-ray
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Pick an image to preview the analysis workflow.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSampleModalOpen(false)}
                className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {DEMO_SAMPLES.map((s) => {
                const busy = selectingSampleId === s.id || isLoading
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleModalSamplePick(s)}
                    disabled={busy}
                    aria-label={`Select sample ${s.id}`}
                    className="relative overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:border-blue-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <img
                      src={s.src}
                      alt=""
                      className="aspect-square w-full object-cover bg-slate-100"
                    />
                    {selectingSampleId === s.id && (
                      <span className="absolute inset-0 flex items-center justify-center bg-slate-900/40">
                        <span className="h-7 w-7 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
