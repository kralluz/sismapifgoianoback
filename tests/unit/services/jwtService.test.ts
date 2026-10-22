import jwt from 'jsonwebtoken';
import { describe, expect, it } from 'vitest';
import { JWT_SECRET, verifyToken } from '../../../src/services/jwtService';

describe('jwtService', () => {
  it('verifica um token válido', () => {
    const token = jwt.sign(
      { id: 1, email: 'user@example.com', role: 'user' },
      JWT_SECRET,
    );

    expect(verifyToken(token)).toMatchObject({
      id: 1,
      email: 'user@example.com',
      role: 'user',
    });
  });

  it('rejeita um token expirado', () => {
    const token = jwt.sign(
      { id: 1, email: 'user@example.com', role: 'user' },
      JWT_SECRET,
      { expiresIn: -1 },
    );

    expect(verifyToken(token)).toBeNull();
  });

  it('rejeita um token inválido', () => {
    expect(verifyToken('token-invalido')).toBeNull();
  });
});