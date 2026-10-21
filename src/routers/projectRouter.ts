import { Router } from "express";
import * as c from "../controllers/projectController";
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

/* Corpo aceito em POST/PUT:
   number (int, único), title (string), localId (id do catálogo /api/locais),
   complemento (string opcional, ex.: "Em frente à sala") */

router.post('/',
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Criar um novo projeto (admin)'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            number: { type: "integer", example: 12, description: "Número do trabalho na feira (único)" },
            title: { type: "string", example: "Aquaponia: Integração entre Aquicultura e Hidroponia" },
            localId: { type: "string", example: "d-sala-01", description: "Id de um local de GET /api/locais" },
            complemento: { type: "string", example: "Em frente à sala", nullable: true }
          },
          required: ["number", "title", "localId"]
        }
      }
    }
  } */
  /* #swagger.responses[201] = { description: "Projeto criado (inclui o objeto local)" } */
  /* #swagger.responses[400] = { description: "Dados inválidos ou local inexistente" } */
  /* #swagger.responses[409] = { description: "Número de projeto já usado" } */
  authenticateToken, requireAdmin, c.createProject);

router.get('/',
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Listar projetos (público), ordenados pelo número'
  c.getAllProjects);

router.get('/:id',
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Buscar um projeto pelo ID (público)'
  c.findProjectById);

router.put('/:id',
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Atualizar um projeto (admin)'
  // #swagger.security = [{ "bearerAuth": [] }]
  authenticateToken, requireAdmin, c.updateProject);

router.delete('/:id',
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Excluir um projeto (admin)'
  // #swagger.security = [{ "bearerAuth": [] }]
  authenticateToken, requireAdmin, c.deleteProject);

export default router;
