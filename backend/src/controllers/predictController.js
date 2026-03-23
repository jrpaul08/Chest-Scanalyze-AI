/**
 * Predict controller - proxies image upload to the model service.
 * Generates user-facing diagnostic report from raw predictions.
 * Requires authentication.
 */

import { generateReport } from '../services/reportGenerator.js';

const MODEL_SERVICE_URL = process.env.MODEL_SERVICE_URL || 'http://localhost:8000';

function getReportThreshold() {
  const val = process.env.REPORT_THRESHOLD?.trim();
  const parsed = parseFloat(val);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export const predict = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
      });
    }

    const formData = new FormData();
    formData.append(
      'file',
      new Blob([req.file.buffer], { type: req.file.mimetype }),
      req.file.originalname || 'image.jpg'
    );

    const response = await fetch(`${MODEL_SERVICE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.detail || 'Model service error',
      });
    }

    const report = generateReport(data.predictions, {
      threshold: getReportThreshold(),
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log('[Predict] Raw predictions:', data.predictions);
      console.log('[Predict] Report findings:', report.findings?.map((f) => `${f.displayName} (${f.confidencePct}%)`));
    }

    res.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error('Predict proxy error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get prediction. Is the model service running?',
    });
  }
};
