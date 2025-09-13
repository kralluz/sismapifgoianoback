import { Request, Response } from 'express';
import { createDefaultAdmin, createUser, findUserByEmail, validatePassword } from '../services/userService';
import { validateAdminCredentials } from '../middlewares/authMiddleware';
import { generateToken } from '../services/tokenService';

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
export const register = async (req: Request, res: Response) => {
  const { nome, email, senha, role, adminEmail, adminSenha } = req.body;

  await createDefaultAdmin();

  if (!validateAdminCredentials(adminEmail, adminSenha)) {
    return res.status(403).json({ error: 'Apenas administradores podem criar contas.' });
  }

  try {
    const usuario = await createUser(nome, email, senha, role);
    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role });
  } catch (error) {
    res.status(400).json({ error: 'Email já cadastrado ou dados inválidos.' });
  }
};

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
export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  
  const usuario = await findUserByEmail(email);

  if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado.' });

  const valid = await validatePassword(senha, usuario.senha);
  if (!valid) return res.status(401).json({ error: 'Senha incorreta.' });

  const token = generateToken(usuario.id, usuario.email, usuario.role);

  res.json({ 
    id: usuario.id, 
    nome: usuario.nome, 
    email: usuario.email, 
    role: usuario.role,
    token 
  });
};