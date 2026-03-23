import express from 'express';
import multer from 'multer';
import { saveToLibrary } from '../controllers/libraryController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 }, // 1 MB max
});

// POST /api/library - requires auth, accepts image file + report JSON
router.post('/', authenticateToken, upload.single('file'), saveToLibrary);

export default router;
