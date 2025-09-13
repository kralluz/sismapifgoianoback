import jwt from 'jsonwebtoken';

const JWT_SECRET = 'sismap-secret-key-2025';

export const generateToken = (userId: number, email: string, role: string) => {
  return jwt.sign(
    { id: userId, email, role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};