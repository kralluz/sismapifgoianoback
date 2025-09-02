import { Router } from "express";
import { createNewRoom,getAllRooms, deleteRoom, findRoomById } from "../controllers/roomController";

const router = Router();

router.post('/', createNewRoom);
router.get('/', getAllRooms);
router.get('/:id', findRoomById);
router.delete('/:id', deleteRoom);

export default router;