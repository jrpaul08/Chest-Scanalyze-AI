import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import { DiagnosticReport } from '../components/DiagnosticReport'
import { generateReportPdf } from '../utils/reportToPdf'

const API_URL = 'http://localhost:3000'

export const GalleryPage = () => {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedEntry, setSelectedEntry] = useState(null)

  useEffect(() => {
    const fetchGallery = async () => {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/library`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || 'Failed to load gallery')
        return
      }
      setEntries(data.entries || [])
    }
    fetchGallery().finally(() => setIsLoading(false))
  }, [])

  const formatDate = (entry) => {
    if (entry?.report?.date) return entry.report.date
    if (!entry?.createdAt) return ''
    try {
      return new Date(entry.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return ''
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Report Gallery</h1>
          <p className="mt-2 text-blue-200">Your saved chest X-ray reports.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {isLoading ? (
          <div className="text-center py-16 text-slate-500">Loading...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">{error}</div>
        ) : entries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-slate-600">No reports yet.</p>
            <p className="mt-2 text-sm text-slate-500">Generate a report and save it to your gallery.</p>
            <Link
              to="/upload"
              className="inline-block mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              New Scan
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <button
                key={entry._id}
                onClick={() => setSelectedEntry(entry)}
                className="text-left bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all overflow-hidden group"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  {entry.imageData ? (
                    <img
                      src={entry.imageData}
                      alt="Chest X-ray"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs font-medium text-[#1e40af] uppercase tracking-wide">
                    {entry.report?.reportId || '—'}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatDate(entry)}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                    {entry.report?.assessmentSummary || 'No summary'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal - full report view */}
      {selectedEntry && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEntry(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center rounded-t-xl z-10">
              <h2 className="text-lg font-semibold text-slate-800">Report Details</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    if (!selectedEntry?.report) return
                    const blob = await generateReportPdf(
                      selectedEntry.report,
                      selectedEntry.imageData
                    )
                    const url = URL.createObjectURL(blob)
                    window.open(url, '_blank')
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {selectedEntry.imageData && (
                <div className="rounded-lg overflow-hidden border border-slate-200">
                  <img
                    src={selectedEntry.imageData}
                    alt="Chest X-ray"
                    className="w-full max-h-80 object-contain bg-slate-50"
                  />
                </div>
              )}
              {selectedEntry.report && (
                <DiagnosticReport report={selectedEntry.report} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
