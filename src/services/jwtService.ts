import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sismap-secret-key-2025';

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
  } catch (error) {
    return null;
  }
};