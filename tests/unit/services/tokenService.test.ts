import jwt from 'jsonwebtoken';
import { describe, expect, it } from 'vitest';
import { JWT_SECRET } from '../../../src/services/jwtService';
import { generateToken } from '../../../src/services/tokenService';

describe('tokenService', () => {
  it('gera um JWT com os dados do usuário', () => {
    const token = generateToken(7, 'admin@example.com', 'admin');
    const payload = jwt.verify(token, JWT_SECRET);

    expect(payload).toMatchObject({
      id: 7,
      email: 'admin@example.com',
      role: 'admin',
    });
  });

  it('gera um token com expiração de quinze dias', () => {
    const token = generateToken(7, 'admin@example.com', 'admin');
    const payload = jwt.verify(token, JWT_SECRET);

    expect(payload).toMatchObject({
      iat: expect.any(Number),
      exp: expect.any(Number),
    });

    if (typeof payload === 'string' || !payload.iat || !payload.exp) {
      throw new Error('Payload JWT sem timestamps');
    }

    expect(payload.exp - payload.iat).toBe(15 * 24 * 60 * 60);
  });
});