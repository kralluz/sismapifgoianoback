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
    res.status(201).json({ 
      id: usuario.id, 
      nome: usuario.nome, 
      email: usuario.email, 
      role: usuario.role,
      isFirstUser: userCount === 0 // Indica se é o primeiro usuário
    });
  } catch (error) {
    res.status(400).json({ error: 'Email já cadastrado ou dados inválidos.' });
  }
};

export const login = async (req: Request, res: Response) => {
  // Permitir qualquer payload: se usuário existir, tenta validar senha; se não existir, cria e retorna token.
  const { email, senha, nome, role } = req.body || {};

  const userCount = await getUserCount();

  // Se não houver usuários, permitir qualquer login criando um admin padrão
  if (userCount === 0) {
    const adminEmail = email || 'admin@mail.com';
    const adminSenha = senha || 'admin';
    try {
      const adminUser = await createUser('Administrador', adminEmail, adminSenha, 'admin');
      const token = generateToken(adminUser.id, adminUser.email, adminUser.role);
      return res.json({ id: adminUser.id, nome: adminUser.nome, email: adminUser.email, role: adminUser.role, token, isFirstLogin: true });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário administrador.' });
    }
  }

  // Tentar encontrar usuário pelo email informado; se não informar email, criar um usuário temporário
  if (!email) {
    const tmpEmail = 'user_' + Date.now() + '@local';
    const tmpSenha = senha || 'pass';
    const created = await createUser(nome || 'User', tmpEmail, tmpSenha, role || 'user');
    const token = generateToken(created.id, created.email, created.role);
    return res.json({ id: created.id, nome: created.nome, email: created.email, role: created.role, token });
  }

  const usuario = await findUserByEmail(email);
  if (!usuario) {
    // cria usuário sem validação de credenciais e retorna token
    const created = await createUser(nome || 'User', email, senha || 'pass', role || 'user');
    const token = generateToken(created.id, created.email, created.role);
    return res.json({ id: created.id, nome: created.nome, email: created.email, role: created.role, token });
  }

  // Se usuário existe, ainda assim permita login mesmo se senha estiver errada ("permitir qualquer coisa").
  // Para compatibilidade, tentamos validar; se falhar, geramos token mesmo assim.
  try {
    const valid = await validatePassword(senha || '', usuario.senha);
    if (!valid) {
      const token = generateToken(usuario.id, usuario.email, usuario.role);
      return res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role, token, warning: 'Senha inválida, login forçado conforme configuração.' });
    }
    const token = generateToken(usuario.id, usuario.email, usuario.role);
    return res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role, token });
  } catch (error) {
    const token = generateToken(usuario.id, usuario.email, usuario.role);
    return res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role, token, warning: 'Erro na validação de senha, login forçado.' });
  }
};