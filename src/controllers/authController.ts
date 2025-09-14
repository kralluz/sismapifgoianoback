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
  const { email, senha } = req.body;
  
  // Verificar se não há usuários registrados
  const userCount = await getUserCount();
  
  // Se não há usuários, permitir login com credenciais especiais
  if (userCount === 0) {
    if ((email === 'admin' && senha === 'admin') || 
        (email === 'admin@mail.com' && senha === 'admin')) {
      
      // Criar usuário admin automaticamente
      try {
        const adminUser = await createUser('Administrador', 'admin@mail.com', 'admin', 'admin');
        
        const token = generateToken(adminUser.id, adminUser.email, adminUser.role);
        
        return res.json({ 
          id: adminUser.id, 
          nome: adminUser.nome, 
          email: adminUser.email, 
          role: adminUser.role,
          token,
          isFirstLogin: true // Indica que é o primeiro login
        });
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar usuário administrador.' });
      }
    } else {
      return res.status(401).json({ error: 'Sistema não inicializado. Use email "admin" ou "admin@mail.com" com senha "admin".' });
    }
  }
  
  // Login normal para usuários existentes
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