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
           x: { type: "number", example: 38.95 },
           y: { type: "number", example: 63.62 },
           description: { type: "string", example: "Sala para reuniões pequenas" },
           path: { type: "array", items: { type: "array", items: { type: "number" } }, example: [[10.5, 10.3], [20.1, 15.7]] }
         },
         required: ["name", "x", "y", "description"]
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
           x: { type: "number", example: 15.5 },
           y: { type: "number", example: 25.3 },
           description: { type: "string", example: "Sala atualizada para reuniões" },
           path: { type: "array", items: { type: "array", items: { type: "number" } }, example: [[15.5, 25.3], [25.1, 30.7]] }
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