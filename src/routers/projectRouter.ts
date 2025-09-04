import { Router } from "express";
import * as c from "../controllers/projectController";

const router = Router();

router.post('/',
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
            title: {
              type: "string",
              example: "Novo Projeto"
            },
            type: {
              type: "string",
              example: "Banner"
            },
            startAt: {
              type: "string",
              format: "date",
              example: "2023-01-01"
            },
            endAt: {
              type: "string",
              format: "date",
              example: "2023-12-31"
            },
            roomId: {
              type: "integer",
              example: 1
            }
          },
          required: ["title", "type", "startAt", "endAt", "roomId"]
        }
      }
    }
  } */
  /* #swagger.responses[201] = {
    description: "Projeto criado com sucesso"
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
    description: "Projetos listados com sucesso"
  } */
  /* #swagger.responses[500] = {
    description: "Erro ao listar projetos"
  } */
  c.getAllProjects);

router.get('/:id',
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Buscar um projeto pelo ID'
  // #swagger.description = 'Endpoint para buscar um projeto pelo ID'
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
    description: "Projeto encontrado com sucesso"
  } */
  /* #swagger.responses[404] = {
    description: "Projeto não encontrado"
  } */
  /* #swagger.responses[500] = {
    description: "Erro ao buscar projeto"
  } */
  c.findProjectById);

router.put('/:id',
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Atualizar um projeto pelo ID'
  // #swagger.description = 'Endpoint para atualizar um projeto pelo ID'
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
            title: {
              type: "string",
              example: "Projeto Atualizado"
            },
            type: {
              type: "string",
              example: "Banner"
            },
            startAt: {
              type: "string",
              format: "date",
              example: "2023-01-01"
            },
            endAt: {
              type: "string",
              format: "date",
              example: "2023-12-31"
            },
            roomId: {
              type: "integer",
              example: 1
            }
          }
        }
      }
    }
  } */
  /* #swagger.responses[200] = {
    description: "Projeto atualizado com sucesso"
  } */
  /* #swagger.responses[404] = {
    description: "Projeto não encontrado"
  } */
  /* #swagger.responses[400] = {
    description: "Erro ao atualizar projeto"
  } */
  c.updateProject);

router.delete('/:id',
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Deletar um projeto pelo ID'
  // #swagger.description = 'Endpoint para deletar um projeto pelo ID'
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