import { Request, Response } from 'express';
import { z } from 'zod';
import { createUser, findUserByEmail, validatePassword, getUserCount } from '../services/userService';
import { generateToken } from '../services/tokenService';
import { verifyToken } from '../services/jwtService';

const registerSchema = z.object({
  nome: z.string().trim().min(2),
  email: z.string().trim().toLowerCase().email(),
  senha: z.string().min(6),
  role: z.enum(['admin', 'user']).default('user'),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  senha: z.string().min(1),
});

const isAdminRequest = (req: Request) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const decoded = token ? verifyToken(token) : null;
  return decoded?.role === 'admin';
};

// O primeiro usuário do sistema vira admin; depois disso só um admin
// autenticado (Bearer token) pode criar contas.
export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Dados inválidos.', issues: parsed.error.issues });
  }

  const userCount = await getUserCount();
  if (userCount > 0 && !isAdminRequest(req)) {
    return res.status(403).json({ error: 'Apenas administradores podem criar contas.' });
  }

  const { nome, email, senha } = parsed.data;
  const role = userCount === 0 ? 'admin' : parsed.data.role;
  try {
    const usuario = await createUser(nome, email, senha, role);
    res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      isFirstUser: userCount === 0,
    });
  } catch (error) {
    res.status(400).json({ error: 'Email já cadastrado ou dados inválidos.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Informe email e senha.' });
  }
  const { email, senha } = parsed.data;

  try {
    // Sistema recém-instalado: o primeiro login cria o administrador
    if ((await getUserCount()) === 0) {
      if (senha.length < 6) {
        return res.status(400).json({ error: 'A senha do primeiro administrador precisa ter ao menos 6 caracteres.' });
      }
      const admin = await createUser('Administrador', email, senha, 'admin');
      const token = generateToken(admin.id, admin.email, admin.role);
      return res.json({ id: admin.id, nome: admin.nome, email: admin.email, role: admin.role, token, isFirstLogin: true });
    }

    const usuario = await findUserByEmail(email);
    // Mesma resposta para email inexistente e senha errada
    if (!usuario || !(await validatePassword(senha, usuario.senha))) {
      return res.status(401).json({ error: 'Email ou senha inválidos.' });
    }
    const token = generateToken(usuario.id, usuario.email, usuario.role);
    return res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role, token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};
