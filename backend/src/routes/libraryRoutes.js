import express from 'express';
import multer from 'multer';
import { getGallery, saveToLibrary, deleteFromGallery } from '../controllers/libraryController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 }, // 1 MB max
});

// GET /api/library - list user's gallery entries
router.get('/', authenticateToken, getGallery);

// POST /api/library - requires auth, accepts image file + report JSON
router.post('/', authenticateToken, upload.single('file'), saveToLibrary);

// DELETE /api/library/:id - remove gallery entry (must own it)
router.delete('/:id', authenticateToken, deleteFromGallery);

export default router;
