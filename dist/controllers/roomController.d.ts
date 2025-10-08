import { Request, Response } from 'express';
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
            x: { type: "integer", example: 10 },
            y: { type: "integer", example: 20 },
            description: { type: "string", example: "Sala para reuniões pequenas" },
            capacity: { type: "integer", example: 10 },
            type: { type: "string", example: "meeting" },
            floor: { type: "integer", example: 1 },
            building: { type: "string", example: "Prédio Principal" },
            amenities: { type: "array", items: { type: "string" }, example: ["projetor", "quadro branco"] },
            path: { type: "array", items: { type: "array", items: { type: "integer" } }, example: [[10, 10], [20, 15]] }
          },
          required: ["name", "x", "y", "description", "capacity", "type", "floor", "building", "amenities", "path"]
        }
      }
    }
  }
 * #swagger.responses[201] = { description: "Sala criada com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao criar sala" }
 * #swagger.responses[401] = { description: "Não autorizado" }
 * #swagger.responses[403] = { description: "Acesso negado - apenas administradores" }
 */
export declare const createNewRoom: (req: Request, res: Response) => Promise<void>;
/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Listar todas as salas'
 * #swagger.security = [{ "bearerAuth": [] }]
 * #swagger.responses[200] = { description: "Salas listadas com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao buscar salas" }
 * #swagger.responses[401] = { description: "Não autorizado" }
 */
export declare const getAllRooms: (req: Request, res: Response) => Promise<void>;
export declare const findRoomById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteRoom: (req: Request, res: Response) => Promise<void>;
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
            x: { type: "integer", example: 15 },
            y: { type: "integer", example: 25 },
            description: { type: "string", example: "Sala atualizada para reuniões" },
            capacity: { type: "integer", example: 15 },
            type: { type: "string", example: "conference" },
            floor: { type: "integer", example: 2 },
            building: { type: "string", example: "Prédio Administrativo" },
            amenities: { type: "array", items: { type: "string" }, example: ["projetor", "som", "ar condicionado"] },
            path: { type: "array", items: { type: "array", items: { type: "integer" } }, example: [[15, 25], [25, 30]] }
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
export declare const updateRoom: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=roomController.d.ts.map