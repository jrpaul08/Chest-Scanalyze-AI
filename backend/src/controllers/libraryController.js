/**
 * Library controller - save and retrieve report gallery entries.
 * Requires authentication.
 */

import ReportGallery from '../models/ReportGallery.js';

export const saveToLibrary = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
      });
    }

    let report;
    try {
      report = typeof req.body.report === 'string'
        ? JSON.parse(req.body.report)
        : req.body.report;
    } catch {
      return res.status(400).json({
        success: false,
        message: 'Invalid report data',
      });
    }

    if (!report || !report.title) {
      return res.status(400).json({
        success: false,
        message: 'Report data is required',
      });
    }

    const entry = new ReportGallery({
      userId: req.userId,
      image: req.file.buffer,
      originalFilename: req.file.originalname || 'image.jpg',
      report,
    });

    await entry.save();

    res.status(201).json({
      success: true,
      message: 'Report saved to library',
      id: entry._id,
    });
  } catch (error) {
    console.error('Save to library error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save report',
    });
  }
};
