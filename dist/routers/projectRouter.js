"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const c = __importStar(require("../controllers/projectController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, 
// #swagger.tags = ['Projects']
// #swagger.summary = 'Criar um novo projeto'
// #swagger.description = 'Endpoint para criar um projeto no sistema'
/* #swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          number: {
            type: "integer",
            example: 1,
            description: "Número identificador do projeto"
          },
          title: {
            type: "string",
            example: "Novo Projeto",
            description: "Título do projeto (mínimo 2, máximo 100 caracteres)"
          },
          roomId: {
            type: "integer",
            example: 1,
            description: "ID da sala associada ao projeto"
          }
        },
        required: ["number", "title", "roomId"]
      }
    }
  }
} */
/* #swagger.responses[201] = {
  description: "Projeto criado com sucesso",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          number: { type: "integer", example: 1 },
          title: { type: "string", example: "Novo Projeto" },
          roomId: { type: "integer", example: 1 },
          room: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              name: { type: "string", example: "Sala de Reuniões A" },
              x: { type: "integer", example: 10 },
              y: { type: "integer", example: 20 },
              description: { type: "string", example: "Sala para reuniões pequenas" },
              capacity: { type: "integer", example: 10 },
              type: { type: "string", example: "meeting" },
              building: { type: "string", example: "Prédio Principal" },
              path: { type: "object", example: [[20, 15], [25, 20]] },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time", nullable: true }
            }
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time", nullable: true }
        }
      }
    }
  }
} */
/* #swagger.responses[400] = {
  description: "Erro ao criar projeto"
} */
c.createProject);
router.get('/', 
// #swagger.tags = ['Projects']
// #swagger.summary = 'Listagem de todos os projetos'
// #swagger.description = 'Endpoint público para listar todos os projetos do sistema'
/* #swagger.responses[200] = {
  description: "Projetos listados com sucesso",
  content: {
    "application/json": {
      schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            number: { type: "integer", example: 1 },
            title: { type: "string", example: "Apresentação de Projeto" },
            roomId: { type: "integer", example: 1 },
            room: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                name: { type: "string", example: "Sala de Reuniões A" },
                x: { type: "integer", example: 10 },
                y: { type: "integer", example: 20 },
                description: { type: "string", example: "Sala para reuniões pequenas" },
                capacity: { type: "integer", example: 10 },
                type: { type: "string", example: "meeting" },
                building: { type: "string", example: "Prédio Principal" },
                path: { type: "object", example: [[20, 15], [25, 20]] },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time", nullable: true }
              }
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time", nullable: true }
          }
        }
      }
    }
  }
} */
/* #swagger.responses[500] = {
  description: "Erro ao listar projetos"
} */
c.getAllProjects);
router.get('/:id', 
// #swagger.tags = ['Projects']
// #swagger.summary = 'Buscar um projeto pelo ID'
// #swagger.description = 'Endpoint público para buscar um projeto pelo ID'
/* #swagger.parameters['id'] = {
  in: 'path',
  description: 'ID do projeto a ser buscado',
  required: true,
  schema: {
    type: 'integer',
    example: 1
  }
} */
/* #swagger.responses[200] = {
  description: "Projeto encontrado com sucesso",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          number: { type: "integer", example: 1 },
          title: { type: "string", example: "Apresentação de Projeto" },
          roomId: { type: "integer", example: 1 },
          room: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              name: { type: "string", example: "Sala de Reuniões A" },
              x: { type: "integer", example: 10 },
              y: { type: "integer", example: 20 },
              description: { type: "string", example: "Sala para reuniões pequenas" },
              capacity: { type: "integer", example: 10 },
              type: { type: "string", example: "meeting" },
              building: { type: "string", example: "Prédio Principal" },
              path: { type: "object", example: [[20, 15], [25, 20]] },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time", nullable: true }
            }
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time", nullable: true }
        }
      }
    }
  }
} */
/* #swagger.responses[404] = {
  description: "Projeto não encontrado"
} */
/* #swagger.responses[500] = {
  description: "Erro ao buscar projeto"
} */
c.findProjectById);
router.put('/:id', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, 
// #swagger.tags = ['Projects']
// #swagger.summary = 'Atualizar um projeto pelo ID'
// #swagger.description = 'Endpoint para atualizar um projeto pelo ID'
// #swagger.security = [{ "bearerAuth": [] }]
/* #swagger.parameters['id'] = {
  in: 'path',
  description: 'ID do projeto a ser atualizado',
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
          number: {
            type: "integer",
            example: 2,
            description: "Número identificador do projeto"
          },
          title: {
            type: "string",
            example: "Projeto Atualizado",
            description: "Título do projeto (mínimo 2, máximo 100 caracteres)"
          },
          roomId: {
            type: "integer",
            example: 1,
            description: "ID da sala associada ao projeto"
          }
        }
      }
    }
  }
} */
/* #swagger.responses[200] = {
  description: "Projeto atualizado com sucesso",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          number: { type: "integer", example: 2 },
          title: { type: "string", example: "Projeto Atualizado" },
          roomId: { type: "integer", example: 1 },
          room: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              name: { type: "string", example: "Sala de Reuniões A" },
              x: { type: "integer", example: 10 },
              y: { type: "integer", example: 20 },
              description: { type: "string", example: "Sala para reuniões pequenas" },
              capacity: { type: "integer", example: 10 },
              type: { type: "string", example: "meeting" },
              building: { type: "string", example: "Prédio Principal" },
              path: { type: "object", example: [[20, 15], [25, 20]] },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time", nullable: true }
            }
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      }
    }
  }
} */
/* #swagger.responses[404] = {
  description: "Projeto não encontrado"
} */
/* #swagger.responses[400] = {
  description: "Erro ao atualizar projeto"
} */
c.updateProject);
router.delete('/:id', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, 
// #swagger.tags = ['Projects']
// #swagger.summary = 'Deletar um projeto pelo ID'
// #swagger.description = 'Endpoint para deletar um projeto pelo ID'
// #swagger.security = [{ "bearerAuth": [] }]
/* #swagger.parameters['id'] = {
  in: 'path',
  description: 'ID do projeto a ser deletado',
  required: true,
  schema: {
    type: 'integer',
    example: 1
  }
} */
/* #swagger.responses[204] = {
  description: "Projeto deletado com sucesso"
} */
/* #swagger.responses[400] = {
  description: "Erro ao deletar projeto"
} */
c.deleteProject);
exports.default = router;
//# sourceMappingURL=projectRouter.js.map