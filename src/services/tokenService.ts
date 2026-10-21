import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './jwtService';

export const generateToken = (userId: number, email: string, role: string) => {
  return jwt.sign(
    { id: userId, email, role },
    JWT_SECRET,
    { expiresIn: '15d' }
  );
};
