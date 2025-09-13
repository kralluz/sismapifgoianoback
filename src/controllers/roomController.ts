import { Request, Response } from 'express';

/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Listar todas as salas'
 * #swagger.security = [{ "bearerAuth": [] }]
 */
export const getRooms = async (req: Request, res: Response) => {
  res.json({ message: 'Lista de salas', user: (req as any).user });
};

/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Criar nova sala'
 * #swagger.security = [{ "bearerAuth": [] }]
 */
export const createRoom = async (req: Request, res: Response) => {
  res.json({ message: 'Sala criada', user: (req as any).user });
};