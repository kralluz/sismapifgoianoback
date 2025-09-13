import { Request, Response } from 'express';
import { createUser, findUserByEmail, validatePassword, getUserCount } from '../services/userService';
import { validateAdminCredentials } from '../middlewares/authMiddleware';
import { generateToken } from '../services/tokenService';

export const register = async (req: Request, res: Response) => {
  const { nome, email, senha, role, adminEmail, adminSenha } = req.body;

  // Verificar se é o primeiro usuário ou se são credenciais válidas de admin
  const userCount = await getUserCount();
  if (userCount > 0 && !validateAdminCredentials(adminEmail, adminSenha)) {
    return res.status(403).json({ error: 'Apenas administradores podem criar contas.' });
  }

  try {
    const usuario = await createUser(nome, email, senha, role);
    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role });
  } catch (error) {
    res.status(400).json({ error: 'Email já cadastrado ou dados inválidos.' });
  }
};

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