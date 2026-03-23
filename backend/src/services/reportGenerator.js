/**
 * Generates user-facing diagnostic reports from model prediction outputs.
 * Converts raw probabilities into structured, readable reports.
 */

import {
  CONDITIONS_CONFIG,
  LIKELIHOOD_THRESHOLDS,
  REPORT_THRESHOLD,
  SUMMARY_MAX_NAMED,
} from '../config/conditionsConfig.js'
const RECOMMENDATION_SUFFIX =
  'Correlation with symptoms and clinical evaluation is recommended.'

/**
 * Get human-readable likelihood label from probability.
 * Three tiers: Likely (≥0.65), Possible (0.35–0.65), Low probability (<0.35).
 * Only called for findings above REPORT_THRESHOLD, so no need for lower bound.
 */
function getLikelihood(probability) {
  if (probability >= LIKELIHOOD_THRESHOLDS.likely) return 'Likely'
  if (probability >= LIKELIHOOD_THRESHOLDS.possible) return 'Possible'
  return 'Low probability'
}

/**
 * Format condition label for display (e.g., Pleural_Thickening → Pleural Thickening).
 */
function formatLabel(label) {
  const config = CONDITIONS_CONFIG[label]
  return config?.displayName ?? label.replace(/_/g, ' ')
}

/**
 * Generate natural-language assessment summary from top findings.
 * Returns both full text and structured parts for bold rendering.
 * Adapts when many findings: names top SUMMARY_MAX_NAMED, then "see table".
 */
function generateAssessmentSummary(findings) {
  if (findings.length === 0) {
    const text = 'No significant findings were detected above the screening threshold. ' + RECOMMENDATION_SUFFIX
    return { text, parts: [{ type: 'text', content: text }] }
  }

  const primary = findings[0]
  const primaryDisplay = formatLabel(primary.label).toLowerCase()

  if (findings.length === 1) {
    return {
      text: `The results suggest ${primaryDisplay}. ${RECOMMENDATION_SUFFIX}`,
      parts: [
        { type: 'text', content: 'The results suggest ' },
        { type: 'bold', content: primaryDisplay },
        { type: 'text', content: `. ${RECOMMENDATION_SUFFIX}` },
      ],
    }
  }

  const secondary = findings[1]
  const secondaryDisplay = formatLabel(secondary.label).toLowerCase()

  if (findings.length <= SUMMARY_MAX_NAMED) {
    return {
      text: `The results suggest ${primaryDisplay}, with additional signs that may indicate ${secondaryDisplay}. ${RECOMMENDATION_SUFFIX}`,
      parts: [
        { type: 'text', content: 'The results suggest ' },
        { type: 'bold', content: primaryDisplay },
        { type: 'text', content: ', with additional signs that may indicate ' },
        { type: 'bold', content: secondaryDisplay },
        { type: 'text', content: `. ${RECOMMENDATION_SUFFIX}` },
      ],
    }
  }

  // 3+ findings: name top two, direct to table; only disease names bold
  return {
    text: `The results suggest the most prominent findings to be ${primaryDisplay} and ${secondaryDisplay}. See findings table for full list. ${RECOMMENDATION_SUFFIX}`,
    parts: [
      { type: 'text', content: 'The results suggest the most prominent findings to be ' },
      { type: 'bold', content: primaryDisplay },
      { type: 'text', content: ' and ' },
      { type: 'bold', content: secondaryDisplay },
      { type: 'text', content: `. See findings table for full list. ${RECOMMENDATION_SUFFIX}` },
    ],
  }
}

/**
 * Generate structured diagnostic report from model predictions.
 *
 * @param {Object} predictions - Map of condition label → probability (0–1)
 * @param {Object} options - Optional overrides
 * @param {number} options.threshold - Minimum probability to include (default: REPORT_THRESHOLD)
 * @returns {Object} Structured report ready for display
 */
export function generateReport(predictions, options = {}) {
  const threshold = options.threshold ?? REPORT_THRESHOLD

  // Filter and sort: only conditions above threshold, sorted by confidence
  const entries = Object.entries(predictions || {})
    .filter(([, prob]) => typeof prob === 'number' && prob >= threshold)
    .sort(([, a], [, b]) => b - a)

  const findings = entries.map(([label, probability]) => {
    const config = CONDITIONS_CONFIG[label]
    return {
      label,
      displayName: formatLabel(label),
      probability,
      confidencePct: Math.round(probability * 100),
      likelihood: getLikelihood(probability),
      description: config?.description ?? 'Finding detected in lung tissue.',
    }
  })

  // Build potential symptoms (dedupe by condition)
  const potentialSymptoms = {}
  for (const { label } of findings) {
    const config = CONDITIONS_CONFIG[label]
    if (config?.symptoms?.length) {
      potentialSymptoms[formatLabel(label)] = config.symptoms
    }
  }

  const now = new Date()
  const { text: assessmentSummary, parts: assessmentSummaryParts } =
    generateAssessmentSummary(findings)

  return {
    title: 'Chest X-Ray Diagnostic Report',
    date: now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    time: now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }),
    assessmentSummary,
    assessmentSummaryParts,
    findings,
    potentialSymptoms,
    recommendations: [
      'Clinical evaluation is recommended to confirm these findings.',
      'Correlate with patient symptoms and medical history.',
    ],
    disclaimer:
      'This report is generated by an AI system for informational purposes only and does not constitute a medical diagnosis. It should not replace professional medical interpretation. Please consult a qualified healthcare provider for clinical decision-making.',
  }
}
