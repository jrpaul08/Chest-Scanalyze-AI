import express from 'express';
import multer from 'multer';
import { predict } from '../controllers/predictController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Store file in memory (buffer) for forwarding to model service
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
});

// POST /api/predict - requires auth, accepts image file
router.post('/', authenticateToken, upload.single('file'), predict);

export default router;
