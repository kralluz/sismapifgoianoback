import { Router } from "express";
import { createNewRoom,getAllRooms, deleteRoom, findRoomById } from "../controllers/roomController";

const router = Router();

router.post('/room', createNewRoom);
router.get('/room', getAllRooms);
router.get('/room/:id', findRoomById);
router.delete('/room/:id', deleteRoom);

export default router;