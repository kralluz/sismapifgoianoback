import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import * as roomService from '../services/roomService';
import { roomSchema, roomUpdateSchema } from '../schema/roomSchema';

/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Criar nova sala'
 * #swagger.security = [{ "bearerAuth": [] }]
 * #swagger.requestBody = {
   required: true,
   content: {
     "application/json": {
       schema: {
         type: "object",
         properties: {
           name: { type: "string", example: "Sala de Reuniões A" },
           x: { type: "number", example: 38.95 },
           y: { type: "number", example: 63.62 },
           description: { type: "string", example: "Sala para reuniões pequenas" },
           path: { type: "array", items: { type: "array", items: { type: "number" } }, example: [[10.5, 10.3], [20.1, 15.7]] }
         },
         required: ["name", "x", "y", "description"]
       }
     }
   }
 }
 * #swagger.responses[201] = { description: "Sala criada com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao criar sala" }
 * #swagger.responses[401] = { description: "Não autorizado" }
 * #swagger.responses[403] = { description: "Acesso negado - apenas administradores" }
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
 * #swagger.responses[200] = { description: "Salas listadas com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao buscar salas" }
 * #swagger.responses[401] = { description: "Não autorizado" }
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
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Buscar uma sala pelo ID'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da sala a ser buscada',
    required: true,
    schema: { type: 'integer', example: 1 }
  } */
  /* #swagger.responses[200] = { description: "Sala encontrada com sucesso" } */
  /* #swagger.responses[404] = { description: "Sala não encontrada" } */
  /* #swagger.responses[400] = { description: "Erro ao buscar sala" } */
  /* #swagger.responses[401] = { description: "Não autorizado" } */
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
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Deletar uma sala pelo ID'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da sala a ser deletada',
    required: true,
    schema: { type: 'integer', example: 1 }
  } */
  /* #swagger.responses[204] = { description: "Sala deletada com sucesso" } */
  /* #swagger.responses[400] = { description: "Erro ao deletar sala" } */
  /* #swagger.responses[401] = { description: "Não autorizado" } */
  /* #swagger.responses[403] = { description: "Acesso negado - apenas administradores" } */
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
 * #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da sala a ser atualizada',
    required: true,
    schema: { type: 'integer', example: 1 }
  }
 * #swagger.requestBody = {
   required: true,
   content: {
     "application/json": {
       schema: {
         type: "object",
         properties: {
           name: { type: "string", example: "Sala Atualizada" },
           x: { type: "number", example: 15.5 },
           y: { type: "number", example: 25.3 },
           description: { type: "string", example: "Sala atualizada para reuniões" },
           path: { type: "array", items: { type: "array", items: { type: "number" } }, example: [[15.5, 25.3], [25.1, 30.7]] }
         }
       }
     }
   }
 }
 * #swagger.responses[200] = { description: "Sala atualizada com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao atualizar sala" }
 * #swagger.responses[401] = { description: "Não autorizado" }
 * #swagger.responses[403] = { description: "Acesso negado - apenas administradores" }
 * #swagger.responses[404] = { description: "Sala não encontrada" }
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
    if (parsed.path !== undefined) updateData.path = parsed.path as Prisma.InputJsonValue;    const updated = await roomService.updateRoomById(Number(id), updateData);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar sala.' });
  }
};
