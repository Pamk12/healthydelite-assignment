import { Router } from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/noteController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// This line applies the authMiddleware to ALL routes in this file
router.use(authMiddleware);

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:noteId', deleteNote);

export default router;