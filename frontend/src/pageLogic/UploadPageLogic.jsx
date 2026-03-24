import { useState, useEffect } from 'react'
import { API_BASE_URL, getAuthHeaders, isDemoUserSession } from '../config/api'

export function useUploadPage() {
  const [file, setFile] = useState(null)
  const [selectingSampleId, setSelectingSampleId] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  // Create preview URL when file changes; revoke on cleanup
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreviewUrl(null)
  }, [file])

  const setFileAndClear = (selected) => {
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected)
      setError(null)
      setResult(null)
    } else if (selected) {
      setError('Please select an image file (JPEG, PNG, etc.)')
    }
  }

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0]
    setFileAndClear(selected)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    setFileAndClear(dropped)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleSelectSample = async (sample) => {
    setSelectingSampleId(sample.id)
    setError(null)
    setResult(null)
    setSaveSuccess(false)
    try {
      const res = await fetch(sample.src)
      if (!res.ok) throw new Error('Could not load sample image')
      const blob = await res.blob()
      const type =
        blob.type && blob.type.startsWith('image/') ? blob.type : 'image/png'
      const f = new File([blob], sample.filename, { type })
      setFile(f)
    } catch (err) {
      setError(err.message || 'Failed to load sample')
    } finally {
      setSelectingSampleId(null)
    }
  }

  const handlePredict = async () => {
    if (!file) {
      setError('Please select an image first')
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Prediction failed')
      }

      setResult(data)
      setSaveSuccess(false)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveToLibrary = async () => {
    if (!file || !result?.report) return

    setIsSaving(true)
    setError(null)
    setSaveSuccess(false)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('report', JSON.stringify(result.report))

      const response = await fetch(`${API_BASE_URL}/api/library`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save')
      }

      if (data.reportId && result?.report) {
        setResult((prev) => ({
          ...prev,
          report: { ...prev.report, reportId: data.reportId },
        }))
      }
      setSaveSuccess(true)
    } catch (err) {
      setError(err.message || 'Failed to save to library')
    } finally {
      setIsSaving(false)
    }
  }

  const reset = () => {
    setFile(null)
    setError(null)
    setResult(null)
    setSaveSuccess(false)
  }

  return {
    file,
    previewUrl,
    isDragging,
    isLoading,
    isSaving,
    saveSuccess,
    error,
    result,
    isDemoUser: isDemoUserSession(),
    selectingSampleId,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleSelectSample,
    handlePredict,
    handleSaveToLibrary,
    reset,
  }
}
