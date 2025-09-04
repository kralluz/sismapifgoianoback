import { Router } from "express";
import { createNewRoom,getAllRooms, deleteRoom, findRoomById } from "../controllers/roomController";

const router = Router();

router.post('/',
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Criar uma nova sala'
  // #swagger.description = 'Endpoint para criar uma sala no sistema'
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Lab Informática I"
            },
            x: {
              type: "number",
              example: 68
            },
            y: {
              type: "number",
              example: 28
            },
            description: {
              type: "string",
              example: "Laboratório de Programação"
            },
            capacity: {
              type: "integer",
              example: 20
            },
            type: {
              type: "string",
              example: "lab"
            },
            floor: {
              type: "integer",
              example: 1
            },
            building: {
              type: "string",
              example: "B"
            },
            amenities: {
              type: "array",
              items: { type: "string" },
              example: ["Projetor", "Lousa", "Ar-Condicionado"]
            },
            path: {
              type: "array",
              items: {
                type: "array",
                items: { type: "number" }
              },
              example: [[10,10],[20,15],[40,20],[60,25],[68,28]]
            }
          },
          required: ["name", "x", "y", "capacity", "type", "floor", "building"]
        }
      }
    }
  } */
  /* #swagger.responses[201] = {
    description: "Sala criada com sucesso"
  } */
  /* #swagger.responses[400] = {
    description: "Erro ao criar sala"
  } */
  createNewRoom);

router.get('/',
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Listagem de todas as salas'
  // #swagger.description = 'Endpoint para listar todas as salas do sistema'
  /* #swagger.responses[200] = {
    description: "Salas listadas com sucesso"
  } */
  /* #swagger.responses[400] = {
    description: "Erro ao listar salas"
  } */
  getAllRooms);

router.get('/:id',
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Buscar uma sala pelo ID'
  // #swagger.description = 'Endpoint para buscar uma sala pelo ID'
  /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da sala a ser buscada',
    required: true,
    schema: {
      type: 'integer',
      example: 1
    }
  } */
  /* #swagger.responses[200] = {
    description: "Sala encontrada com sucesso"
  } */
  /* #swagger.responses[404] = {
    description: "Sala não encontrada"
  } */
  /* #swagger.responses[400] = {
    description: "Erro ao buscar sala"
  } */
  findRoomById);

router.delete('/:id',
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Deletar uma sala pelo ID'
  // #swagger.description = 'Endpoint para deletar uma sala pelo ID'
  /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da sala a ser deletada',
    required: true,
    schema: {
      type: 'integer',
      example: 1
    }
  } */
  /* #swagger.responses[204] = {
    description: "Sala deletada com sucesso"
  } */
  /* #swagger.responses[400] = {
    description: "Erro ao deletar sala"
  } */
  deleteRoom);

export default router;