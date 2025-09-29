import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/jwtService';

export const validateAdminCredentials = (adminEmail: string, adminSenha: string): boolean => {
  return (adminEmail === 'admin' || adminEmail === 'admin@mail.com') && adminSenha === 'admin';
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }

  // Development mode: accept dev token
  if (token === 'dev-token-for-testing' && process.env.NODE_ENV !== 'production') {
    (req as any).user = { id: 1, email: 'dev@test.com', role: 'admin' };
    return next();
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }

  (req as any).user = decoded;
  next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user?.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
  }
  next();
};