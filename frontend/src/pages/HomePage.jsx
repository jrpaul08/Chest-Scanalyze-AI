import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpTrayIcon,
  BookOpenIcon,
  LightBulbIcon,
  StarIcon,
  BoltIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/solid'

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

      {/* Key Features - informational section (not clickable) */}
      <div className="bg-slate-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Key Features</h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <StarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">High Accuracy</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Deep learning model trained on diverse chest X-ray datasets for reliable pulmonary condition detection.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <BoltIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Rapid Analysis</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Results delivered in seconds for immediate clinical decision support.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <DocumentChartBarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Detailed Reports</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Comprehensive analysis with probability scores for 14 pulmonary conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - clickable cards */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* New Scan */}
          <Link to="/upload" className="group block">
            <div className="h-full min-h-44 bg-white rounded-2xl border-2 border-slate-200 shadow-md hover:border-blue-400 hover:shadow-lg transition-all p-6 text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-100">
                <ArrowUpTrayIcon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">New Scan</h3>
              <p className="mt-1 text-sm text-slate-600">Upload a chest X-ray and generate a diagnostic report.</p>
            </div>
          </Link>

          {/* Report Library */}
          <Link to="/library" className="group block">
            <div className="h-full min-h-44 bg-white rounded-2xl border-2 border-slate-200 shadow-md hover:border-emerald-400 hover:shadow-lg transition-all p-6 text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-100">
                <BookOpenIcon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Report Library</h3>
              <p className="mt-1 text-sm text-slate-600">Review previous scans and their AI-generated reports.</p>
            </div>
          </Link>

          {/* Model Insights */}
          <Link to="/about-model" className="group block">
            <div className="h-full min-h-44 bg-white rounded-2xl border-2 border-slate-200 shadow-md hover:border-violet-400 hover:shadow-lg transition-all p-6 text-center">
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


