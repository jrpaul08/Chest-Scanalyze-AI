import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { logout } from '../config/api'
import iconNewScan from '../assets/home/icon-new-scan.png'
import iconReportGallery from '../assets/home/icon-report-gallery.png'
import iconModelInsights from '../assets/home/icon-model-insights.png'
import iconHighAccuracy from '../assets/home/icon-high-accuracy.png'
import iconRapidAnalysis from '../assets/home/icon-rapid-analysis.png'
import iconDetailedReports from '../assets/home/icon-detailed-reports.png'

/** Uniform black line-art; disabled tiles use ICON_QUICK_DISABLED. */
const ICON_KEY = 'h-7 w-7 object-contain brightness-0'
const ICON_QUICK = 'h-8 w-8 object-contain brightness-0'
const ICON_QUICK_DISABLED = 'h-8 w-8 object-contain brightness-0 opacity-40'

export const HomePage = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top banner area matching brand colors */}
      <div className="bg-slate-900 text-white py-14 relative">
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 inline-flex items-center gap-2 text-blue-200 hover:text-white"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Log out
        </button>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Chest Scanalyze AI</h1>
          <p className="mt-3 text-blue-200 text-base md:text-lg font-medium">
            Empowering Radiologists Through Advanced Chest X-Ray Disease Detection AI Models
          </p>
        </div>
      </div>

      {/* What We Offer - informational section (not clickable) */}
      <div className="bg-slate-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">What We Offer</h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center p-1.5">
                <img src={iconHighAccuracy} alt="" className={ICON_KEY} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">High Accuracy</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Deep learning model trained on diverse chest X-ray datasets for reliable pulmonary condition detection.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center p-1.5">
                <img src={iconRapidAnalysis} alt="" className={ICON_KEY} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Rapid Analysis</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Results delivered in seconds for immediate clinical decision support.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center p-1.5">
                <img src={iconDetailedReports} alt="" className={ICON_KEY} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Detailed Reports</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Structured diagnostic-style reports with condition insights, confidence levels, and clinical context for detected condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features - clickable cards */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* New Scan */}
          <Link to="/upload" className="group block">
            <div className="h-full min-h-44 bg-white rounded-2xl border-2 border-slate-200 shadow-md hover:border-blue-400 hover:shadow-lg transition-all p-6 text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center p-2.5 group-hover:bg-blue-100">
                <img src={iconNewScan} alt="" className={ICON_QUICK} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">New Scan</h3>
              <p className="mt-1 text-sm text-slate-600">Upload a chest X-ray and generate a diagnostic report.</p>
            </div>
          </Link>

          {/* Report Gallery */}
          <Link to="/gallery" className="group block">
            <div className="h-full min-h-44 bg-white rounded-2xl border-2 border-slate-200 shadow-md hover:border-blue-400 hover:shadow-lg transition-all p-6 text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center p-2.5 group-hover:bg-blue-100">
                <img src={iconReportGallery} alt="" className={ICON_QUICK} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Report Gallery</h3>
              <p className="mt-1 text-sm text-slate-600">Review previous scans and their AI-generated reports.</p>
            </div>
          </Link>

          {/* Model Insights - disabled until page is ready */}
          <div className="group block opacity-60 cursor-not-allowed">
            <div className="h-full min-h-44 bg-white rounded-2xl border-2 border-slate-200 p-6 text-center pointer-events-none">
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center p-2.5">
                <img src={iconModelInsights} alt="" className={ICON_QUICK_DISABLED} />
              </div>
              <h3 className="text-lg font-semibold text-slate-500">Model Insights</h3>
              <p className="mt-1 text-sm text-slate-400">Coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
