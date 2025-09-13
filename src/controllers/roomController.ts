import { Request, Response } from 'express';
import * as roomService from '../services/roomService';
import { roomSchema } from '../schema/roomSchema';

/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Criar nova sala'
 * #swagger.security = [{ "bearerAuth": [] }]
 */
export const createNewRoom = async (req: Request, res: Response) => {
  const roomData = roomSchema.parse(req.body);

  try {
    const room = await roomService.createRoom(roomData);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar sala.' });
  }
};

/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Listar todas as salas'
 * #swagger.security = [{ "bearerAuth": [] }]
 */
export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await roomService.findAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar salas.' });
  }
};

export const findRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const room = await roomService.findRoomById(Number(id));
    if (!room) {
      return res.status(404).json({ error: 'Sala não encontrada.' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar sala.' });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await roomService.deleteRoomById(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar sala.' });
  }
};
