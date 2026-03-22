/**
 * Renders a structured diagnostic report from the backend.
 * Designed for readability and a medical-report feel for end users.
 */

const SECTION_HEADER =
  'text-sm font-semibold uppercase tracking-wide text-[#1e40af] mb-2'
const TABLE_HEADER = 'px-4 py-3 text-left text-xs font-semibold text-[#1e40af] uppercase tracking-wider'

export const DiagnosticReport = ({ report }) => {
  const {
    title,
    date,
    time,
    reportId,
    assessmentSummary,
    findings,
    potentialSymptoms,
    recommendations,
    disclaimer,
  } = report

  return (
    <article className="bg-white max-w-4xl w-full border border-slate-200/80 py-8">
      {/* Report header - document-style */}
      <header className="px-8 pb-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-[#1e40af] tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {date} — {time}
        </p>
        {reportId && (
          <p className="mt-1 text-sm text-slate-500">Report ID: {reportId}</p>
        )}
      </header>

      <div className="px-8 py-6 space-y-8">
        {/* Assessment Summary */}
        <section>
          <h3 className={SECTION_HEADER}>Assessment Summary</h3>
          <p className="text-slate-800 leading-relaxed text-[15px]">
            {assessmentSummary}
          </p>
        </section>

        {/* Findings */}
        {findings?.length > 0 && (
          <section>
            <h3 className={`${SECTION_HEADER} mb-3`}>Findings</h3>
            <div className="overflow-x-auto border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-[#1e40af]/10">
                  <tr>
                    <th className={TABLE_HEADER}>Condition</th>
                    <th className={TABLE_HEADER}>Likelihood</th>
                    <th className={TABLE_HEADER}>Confidence</th>
                    <th className={TABLE_HEADER}>Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {findings.map((finding) => (
                    <tr key={finding.label}>
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">
                        {finding.displayName}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {finding.likelihood}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {finding.confidencePct}%
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {finding.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Potential Symptoms */}
        {potentialSymptoms && Object.keys(potentialSymptoms).length > 0 && (
          <section>
            <h3 className={`${SECTION_HEADER} mb-3`}>Potential Symptoms</h3>
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
            <h3 className={SECTION_HEADER}>Recommendations</h3>
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
        <section className="pt-6 border-t border-slate-200">
          <h3 className={SECTION_HEADER}>Disclaimer</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{disclaimer}</p>
        </section>
      </div>
    </article>
  )
}
