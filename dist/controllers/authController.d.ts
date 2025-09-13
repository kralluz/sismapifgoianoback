import { Request, Response } from 'express';
/**
 * #swagger.tags = ['Auth']
 * #swagger.summary = 'Registrar novo usuário'
 * #swagger.description = 'Endpoint para registrar um novo usuário no sistema'
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Dados do usuário e credenciais de admin',
 *   required: true,
 *   schema: {
 *     nome: 'João Silva',
 *     email: 'joao@email.com',
 *     senha: '123456',
 *     role: 'user',
 *     adminEmail: 'admin',
 *     adminSenha: 'admin'
 *   }
 * }
 */
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * #swagger.tags = ['Auth']
 * #swagger.summary = 'Login do usuário'
 * #swagger.description = 'Endpoint para autenticar usuário no sistema'
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Credenciais do usuário',
 *   required: true,
 *   schema: {
 *     email: 'joao@email.com',
 *     senha: '123456'
 *   }
 * }
 */
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authController.d.ts.map