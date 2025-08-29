import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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

  const userCount = await prisma.usuario.count();

  if (userCount === 0) {
    const adminHash = await bcrypt.hash('admin', 10);
    await prisma.usuario.create({
      data: { nome: 'Admin', email: 'admin', senha: adminHash, role: 'admin' }
    });
  }

  if (adminEmail !== 'admin' || adminSenha !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem criar contas.' });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  try {
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: hashedPassword, role }
    });
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
  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado.' });

  const valid = await bcrypt.compare(senha, usuario.senha);
  if (!valid) return res.status(401).json({ error: 'Senha incorreta.' });

  res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role });
};