import { Router } from 'express';
import { createNewRoom, getAllRooms, deleteRoom, findRoomById } from '../controllers/roomController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, requireAdmin,
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Criar uma nova sala'
  // #swagger.description = 'Endpoint para criar uma nova sala no sistema'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Sala de Reuniões A"
            },
            x: {
              type: "integer",
              example: 10
            },
            y: {
              type: "integer",
              example: 20
            },
            description: {
              type: "string",
              example: "Sala para reuniões pequenas"
            },
            capacity: {
              type: "integer",
              example: 10
            },
            type: {
              type: "string",
              example: "meeting"
            },
            floor: {
              type: "integer",
              example: 1
            },
            building: {
              type: "string",
              example: "Prédio Principal"
            },
            amenities: {
              type: "array",
              items: {
                type: "string"
              },
              example: ["projetor", "quadro branco"]
            },
            path: {
              type: "object",
              example: {"points": [{"x": 10, "y": 20}, {"x": 15, "y": 25}]}
            }
          },
          required: ["name", "x", "y", "description", "capacity", "type", "floor", "building", "amenities", "path"]
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

router.get('/', authenticateToken,
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Listar todas as salas'
  // #swagger.description = 'Endpoint para listar todas as salas do sistema'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.responses[200] = {
    description: "Salas listadas com sucesso"
  } */
  /* #swagger.responses[400] = {
    description: "Erro ao buscar salas"
  } */
  getAllRooms);

router.get('/:id', authenticateToken,
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Buscar uma sala pelo ID'
  // #swagger.description = 'Endpoint para buscar uma sala pelo ID'
  // #swagger.security = [{ "bearerAuth": [] }]
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

router.delete('/:id', authenticateToken, requireAdmin,
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Deletar uma sala pelo ID'
  // #swagger.description = 'Endpoint para deletar uma sala pelo ID'
  // #swagger.security = [{ "bearerAuth": [] }]
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