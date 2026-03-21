/**
 * Predict controller - proxies image upload to the model service.
 * Requires authentication.
 */

const MODEL_SERVICE_URL = process.env.MODEL_SERVICE_URL || 'http://localhost:8000';

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

    res.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Predict proxy error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get prediction. Is the model service running?',
    });
  }
};
