import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpTrayIcon, BookOpenIcon, LightBulbIcon } from '@heroicons/react/24/solid'

export const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Top banner area matching brand colors */}
      <div className="bg-slate-900 text-white py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Chest Scanalyze AI</h1>
          <p className="mt-3 text-blue-200 text-base md:text-lg font-medium">
            Empowering Radiologists Through Advanced Chest X-Ray Disease Detection AI Models
          </p>
        </div>
      </div>

      {/* Feature cards with balanced spacing */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-12 mt-4">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* New Scan */}
          <Link to="/upload" className="group">
            <div className="h-full min-h-44 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-100">
                <ArrowUpTrayIcon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">New Scan</h3>
              <p className="mt-1 text-sm text-slate-600">Upload a chest X-ray and generate a diagnostic report.</p>
            </div>
          </Link>

          {/* Report Library */}
          <Link to="/library" className="group">
            <div className="h-full min-h-44 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-100">
                <BookOpenIcon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Report Library</h3>
              <p className="mt-1 text-sm text-slate-600">Review previous scans and their AI-generated reports.</p>
            </div>
          </Link>

          {/* Model Insights */}
          <Link to="/about-model" className="group">
            <div className="h-full min-h-44 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center group-hover:bg-violet-100">
                <LightBulbIcon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Model Insights</h3>
              <p className="mt-1 text-sm text-slate-600">Learn how we train, validate, and improve our AI models.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}


