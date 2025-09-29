import { Router } from 'express';
import { createNewRoom, getAllRooms, deleteRoom, findRoomById, updateRoom } from '../controllers/roomController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, requireAdmin, createNewRoom);
router.get('/', authenticateToken, getAllRooms);
router.get('/:id', authenticateToken, findRoomById);
router.put('/:id', authenticateToken, requireAdmin, updateRoom);
router.delete('/:id', authenticateToken, requireAdmin, deleteRoom);

export default router;