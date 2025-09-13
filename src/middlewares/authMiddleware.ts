import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/jwtService';

export const validateAdminCredentials = (adminEmail: string, adminSenha: string): boolean => {
  return adminEmail === 'admin' && adminSenha === 'admin';
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
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