import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Sem JWT_SECRET usamos um segredo aleatório por processo: ninguém consegue
// forjar tokens, mas os logins expiram quando o servidor reinicia.
// O valor padrão antigo ficava no repositório público e não é mais aceito.
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET não definido: usando segredo aleatório (logins expiram a cada reinício).');
}
export const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
  } catch (error) {
    return null;
  }
};
