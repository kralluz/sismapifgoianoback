import { Router } from 'express';
import { createNewRoom, getAllRooms, deleteRoom, findRoomById, updateRoom } from '../controllers/roomController';
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
              type: "array",
              items: {
                type: "array",
                items: {
                  type: "integer"
                }
              },
              example: [[10, 10], [20, 15]]
            }
          },
          required: ["name", "x", "y", "description", "capacity", "type", "floor", "building", "amenities"]
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
  // #swagger.summary = 'Listar todas as salas'
  // #swagger.description = 'Endpoint para listar todas as salas do sistema'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.responses[200] = {
    description: "Salas listadas com sucesso",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              name: { type: "string", example: "Sala de Reuniões A" },
              x: { type: "integer", example: 10 },
              y: { type: "integer", example: 20 },
              description: { type: "string", example: "Sala para reuniões pequenas" },
              capacity: { type: "integer", example: 10 },
              type: { type: "string", example: "meeting" },
              floor: { type: "integer", example: 1 },
              building: { type: "string", example: "Prédio Principal" },
              amenities: { type: "array", items: { type: "string" }, example: ["projetor", "quadro branco"] },
              path: { type: "array", items: { type: "array", items: { type: "integer" } }, example: [[10, 10], [20, 15]] },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time", nullable: true }
            }
          }
        }
      }
    }
  } */
  /* #swagger.responses[400] = {
    description: "Erro ao buscar salas"
  } */
  getAllRooms);
router.get('/:id',
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Buscar uma sala pelo ID'
  // #swagger.description = 'Endpoint para buscar uma sala pelo ID'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da sala a ser buscada',
    required: true,
    schema: { type: 'integer', example: 1 }
  } */
  /* #swagger.responses[200] = {
    description: "Sala encontrada com sucesso",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Sala de Reuniões A" },
            x: { type: "integer", example: 10 },
            y: { type: "integer", example: 20 },
            description: { type: "string", example: "Sala para reuniões pequenas" },
            capacity: { type: "integer", example: 10 },
            type: { type: "string", example: "meeting" },
            floor: { type: "integer", example: 1 },
            building: { type: "string", example: "Prédio Principal" },
            amenities: { type: "array", items: { type: "string" }, example: ["projetor", "quadro branco"] },
            path: { type: "array", items: { type: "array", items: { type: "integer" } }, example: [[10, 10], [20, 15]] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time", nullable: true }
          }
        }
      }
    }
  } */
  /* #swagger.responses[404] = { description: "Sala não encontrada" } */
  /* #swagger.responses[400] = { description: "Erro ao buscar sala" } */
  findRoomById);
router.put('/:id', authenticateToken, requireAdmin,
  // #swagger.tags = ['Rooms']
  // #swagger.summary = 'Atualizar uma sala pelo ID'
  // #swagger.description = 'Endpoint para atualizar uma sala pelo ID'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da sala a ser atualizada',
    required: true,
    schema: {
      type: 'integer',
      example: 1
    }
  } */
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Sala Atualizada"
            },
            x: {
              type: "integer",
              example: 15
            },
            y: {
              type: "integer",
              example: 25
            },
            description: {
              type: "string",
              example: "Sala atualizada para reuniões"
            },
            capacity: {
              type: "integer",
              example: 15
            },
            type: {
              type: "string",
              example: "conference"
            },
            floor: {
              type: "integer",
              example: 2
            },
            building: {
              type: "string",
              example: "Prédio Administrativo"
            },
            amenities: {
              type: "array",
              items: {
                type: "string"
              },
              example: ["projetor", "som", "ar condicionado"]
            },
            path: {
              type: "array",
              items: {
                type: "array",
                items: {
                  type: "integer"
                }
              },
              example: [[15, 25], [25, 30]]
            }
          }
        }
      }
    }
  } */
  /* #swagger.responses[200] = {
    description: "Sala atualizada com sucesso",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Sala Atualizada" },
            x: { type: "integer", example: 15 },
            y: { type: "integer", example: 25 },
            description: { type: "string", example: "Sala atualizada para reuniões" },
            capacity: { type: "integer", example: 15 },
            type: { type: "string", example: "conference" },
            floor: { type: "integer", example: 2 },
            building: { type: "string", example: "Prédio Administrativo" },
            amenities: { type: "array", items: { type: "string" }, example: ["projetor", "som", "ar condicionado"] },
            path: { type: "array", items: { type: "array", items: { type: "integer" } }, example: [[15, 25], [25, 30]] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        }
      }
    }
  } */
  /* #swagger.responses[400] = {
    description: "Erro ao atualizar sala"
  } */
  /* #swagger.responses[401] = {
    description: "Não autorizado"
  } */
  /* #swagger.responses[403] = {
    description: "Acesso negado - apenas administradores"
  } */
  /* #swagger.responses[404] = {
    description: "Sala não encontrada"
  } */
  updateRoom);
router.delete('/:id', authenticateToken, requireAdmin, deleteRoom);

export default router;