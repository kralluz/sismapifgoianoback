import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import * as roomService from '../services/roomService';
import { roomSchema, roomUpdateSchema } from '../schema/roomSchema';

/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Criar nova sala'
 * #swagger.security = [{ "bearerAuth": [] }]
 */
export const createNewRoom = async (req: Request, res: Response) => {
  const roomData = roomSchema.omit({ projects: true }).parse(req.body);

  try {
    const toCreate = {
      ...roomData,
      path: roomData.path ?? [],
    };
    const room = await roomService.createRoom(toCreate);
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

/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Atualizar sala por ID'
 * #swagger.security = [{ "bearerAuth": [] }]
 */
export const updateRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Para update permitimos campos parciais
    const parsed = roomUpdateSchema.parse(req.body);
    const updateData: Prisma.RoomUpdateInput = {};
    if (parsed.name !== undefined) updateData.name = parsed.name;
    if (parsed.x !== undefined) updateData.x = parsed.x;
    if (parsed.y !== undefined) updateData.y = parsed.y;
    if (parsed.description !== undefined) updateData.description = parsed.description;
    if (parsed.capacity !== undefined) updateData.capacity = parsed.capacity;
    if (parsed.type !== undefined) updateData.type = parsed.type;
    if (parsed.floor !== undefined) updateData.floor = parsed.floor;
    if (parsed.building !== undefined) updateData.building = parsed.building;
    if (parsed.amenities !== undefined) updateData.amenities = { set: parsed.amenities };
    if (parsed.path !== undefined) updateData.path = parsed.path as Prisma.InputJsonValue;

    const updated = await roomService.updateRoomById(Number(id), updateData);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar sala.' });
  }
};
