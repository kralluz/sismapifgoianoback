import { Request, Response } from 'express';
import * as roomService from '../services/roomService';
import { roomSchema } from '../schema/roomSchema';


/**
*  #swagger.tags = ['Rooms']
*  #swagger.summary = 'Criar uma nova sala'
*  #swagger.description = 'Endpoint para criar uma sala no sistema'
*  #swagger.parameters['body'] = {
*    in: 'body',
*    description: 'Dados da sala',
*    required: true,
*    schema: {
*      name: "Lab Informática I",
*      x: 68,
*      y: 28,
*      description: "Laboratório de Programação",
*      capacity: 20,
*      type: "lab",
*      floor: 1,
*      building: "B",
*      amenities: ["Projetor", "Lousa", "Ar-Condicionado"],
*      path: [[10,10],[20,15],[40,20],[60,25],[68,28]]
*    }
*  }
*  #swagger.responses[201] = { description: "Sala criada com sucesso" }
*  #swagger.responses[400] = { description: "Erro ao criar sala" }
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
 * #swagger.summary = 'Listagem de todas as salas'
 * #swagger.description = 'Endpoint para listar todas as salas do sistema'
 * #swagger.responses[200] = { description: "Salas listadas com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao listar salas" }
 */
export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await roomService.findAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar salas.' });
  }
};


/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Buscar uma sala pelo Id'
 * #swagger.description = 'Endpoint para buscar uma sala pelo Id'
 * #swagger.parameters['id'] = {
 *   in: 'path',
 *   description: 'ID da sala a ser buscada',
 *   required: true,
 *   type: 'integer'
 * }
 * #swagger.responses[204] = { description: "Sala encontrada com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao buscar sala" }
 */
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


/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Deletar uma sala pelo Id'
 * #swagger.description = 'Endpoint para deletar uma sala pelo Id'
 * #swagger.parameters['id'] = {
 *   in: 'path',
 *   description: 'ID da sala a ser deletada',
 *   required: true,
 *   type: 'integer'
 * }
 * #swagger.responses[204] = { description: "Sala deletada com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao deletar sala" }
 */
export const deleteRoom = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await roomService.deleteRoomById(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar sala.' });
  }
};
