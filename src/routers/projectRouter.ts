import { Router } from "express";
import * as c from "../controllers/projectController";
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, requireAdmin,
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
  // #swagger.description = 'Endpoint para listar todos os projetos do sistema'
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
  // #swagger.description = 'Endpoint para buscar um projeto pelo ID'
  // #swagger.security = [{ "bearerAuth": [] }]
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

router.put('/:id', authenticateToken, requireAdmin,
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

router.delete('/:id', authenticateToken, requireAdmin,
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

export default router;