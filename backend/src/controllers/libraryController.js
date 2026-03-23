/**
 * Library controller - save and retrieve report gallery entries.
 * Requires authentication.
 */

import ReportGallery from '../models/ReportGallery.js';

export const getGallery = async (req, res) => {
  try {
    const entries = await ReportGallery.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .lean();

    const list = entries.map(({ image, mimetype, ...rest }) => ({
      ...rest,
      imageData: image
        ? `data:${mimetype || 'image/jpeg'};base64,${image.toString('base64')}`
        : null,
    }));

    res.json({ success: true, entries: list });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load gallery',
    });
  }
};

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

    const userId = req.userId;
    const userShort = userId.toString().slice(-6).toUpperCase();

    let saved = false;
    let attempt = 0;
    const maxAttempts = 5;
    let entry;

    while (!saved && attempt < maxAttempts) {
      attempt++;
      const count = await ReportGallery.countDocuments({ userId });
      const seq = String(count + 1).padStart(4, '0');
      const reportId = `CX-${userShort}-${seq}`;

      report.reportId = reportId;

      entry = new ReportGallery({
        reportId,
        userId,
        image: req.file.buffer,
        originalFilename: req.file.originalname || 'image.jpg',
        mimetype: req.file.mimetype || 'image/jpeg',
        report,
      });

      try {
        await entry.save();
        saved = true;
      } catch (err) {
        if (err.code === 11000 && attempt < maxAttempts) {
          continue;
        }
        throw err;
      }
    }

    res.status(201).json({
      success: true,
      message: 'Report saved to library',
      id: entry._id,
      reportId: entry.reportId,
    });
  } catch (error) {
    console.error('Save to library error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save report',
    });
  }
};

export const deleteFromGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await ReportGallery.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Report not found or you do not have permission to delete it',
      });
    }

    await ReportGallery.deleteOne({ _id: id, userId: req.userId });

    res.json({
      success: true,
      message: 'Report deleted',
    });
  } catch (error) {
    console.error('Delete from gallery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete report',
    });
  }
};
