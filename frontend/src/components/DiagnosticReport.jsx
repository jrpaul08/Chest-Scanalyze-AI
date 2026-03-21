/**
 * Renders a structured diagnostic report from the backend.
 * Designed for readability and a medical-report feel for end users.
 */

export const DiagnosticReport = ({ report }) => {
  const {
    title,
    date,
    time,
    studyId,
    assessmentSummary,
    findings,
    potentialSymptoms,
    recommendations,
    disclaimer,
  } = report

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <header className="bg-slate-50 border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">
          {date} — {time}
          {studyId && (
            <span className="ml-2 text-slate-500">• Study ID: {studyId}</span>
          )}
        </p>
      </header>

      <div className="px-6 py-5 space-y-6">
        {/* Assessment Summary */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Assessment Summary
          </h3>
          <p className="text-slate-800 leading-relaxed">{assessmentSummary}</p>
        </section>

        {/* Findings */}
        {findings?.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
              Findings
            </h3>
            <div className="space-y-4">
              {findings.map((finding) => (
                <div
                  key={finding.label}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-800">
                      Condition: {finding.displayName}
                    </span>
                    <span className="text-sm font-medium text-slate-600">
                      Likelihood: {finding.likelihood} • Confidence: {finding.confidencePct}%
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{finding.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Potential Symptoms */}
        {potentialSymptoms && Object.keys(potentialSymptoms).length > 0 && (
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
              Potential Symptoms
            </h3>
            <div className="space-y-3">
              {Object.entries(potentialSymptoms).map(([condition, symptoms]) => (
                <div key={condition}>
                  <p className="font-medium text-slate-800">{condition}:</p>
                  <ul className="mt-1 ml-4 list-disc text-sm text-slate-600 space-y-1">
                    {symptoms.map((symptom) => (
                      <li key={symptom}>{symptom}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500 italic">
              Note: Symptoms vary by individual and may not always be present.
            </p>
          </section>
        )}

        {/* Recommendations */}
        {recommendations?.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
              Recommendations
            </h3>
            <ul className="space-y-1">
              {recommendations.map((rec) => (
                <li key={rec} className="flex gap-2 text-slate-700">
                  <span className="text-slate-400">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Disclaimer */}
        <section className="pt-4 border-t border-slate-200">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Disclaimer
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">{disclaimer}</p>
        </section>
      </div>
    </article>
  )
}
