import { Router } from 'express';
import { createNewRoom, getAllRooms, deleteRoom, findRoomById } from '../controllers/roomController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, requireAdmin, createNewRoom);
router.get('/', authenticateToken, getAllRooms);
router.get('/:id', authenticateToken, findRoomById);
router.delete('/:id', authenticateToken, requireAdmin, deleteRoom);

export default router;