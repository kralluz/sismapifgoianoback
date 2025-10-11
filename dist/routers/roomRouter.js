"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomController_1 = require("../controllers/roomController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, 
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
            type: "number",
            example: 38.95
          },
          y: {
            type: "number",
            example: 63.62
          },
          description: {
            type: "string",
            example: "Sala para reuniões pequenas"
          },
          path: {
            type: "array",
            items: {
              type: "array",
              items: {
                type: "number"
              }
            },
            example: [[38.5, 63.6], [42.5, 58.7]]
          }
        },
        required: ["name", "x", "y", "description"]
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
roomController_1.createNewRoom);
router.get('/', 
// #swagger.tags = ['Rooms']
// #swagger.summary = 'Listar todas as salas'
// #swagger.description = 'Endpoint público para listar todas as salas do sistema'
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
            x: { type: "number", example: 38.95 },
            y: { type: "number", example: 63.62 },
            description: { type: "string", example: "Sala para reuniões pequenas" },
            path: { type: "array", items: { type: "array", items: { type: "number" } }, example: [[38.5, 63.6], [42.5, 58.7]] },
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
roomController_1.getAllRooms);
router.get('/:id', 
// #swagger.tags = ['Rooms']
// #swagger.summary = 'Buscar uma sala pelo ID'
// #swagger.description = 'Endpoint público para buscar uma sala pelo ID'
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
          x: { type: "number", example: 38.95 },
          y: { type: "number", example: 63.62 },
          description: { type: "string", example: "Sala para reuniões pequenas" },
          path: { type: "array", items: { type: "array", items: { type: "number" } }, example: [[38.5, 63.6], [42.5, 58.7]] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time", nullable: true }
        }
      }
    }
  }
} */
/* #swagger.responses[404] = { description: "Sala não encontrada" } */
/* #swagger.responses[400] = { description: "Erro ao buscar sala" } */
roomController_1.findRoomById);
router.put('/:id', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, 
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
            type: "number",
            example: 45.5
          },
          y: {
            type: "number",
            example: 70.3
          },
          description: {
            type: "string",
            example: "Sala atualizada para reuniões"
          },
          path: {
            type: "array",
            items: {
              type: "array",
              items: {
                type: "number"
              }
            },
            example: [[45.5, 70.3], [50.1, 75.7]]
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
          x: { type: "number", example: 45.5 },
          y: { type: "number", example: 70.3 },
          description: { type: "string", example: "Sala atualizada para reuniões" },
          path: { type: "array", items: { type: "array", items: { type: "number" } }, example: [[45.5, 70.3], [50.1, 75.7]] },
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
roomController_1.updateRoom);
router.delete('/:id', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, roomController_1.deleteRoom);
exports.default = router;
//# sourceMappingURL=roomRouter.js.map