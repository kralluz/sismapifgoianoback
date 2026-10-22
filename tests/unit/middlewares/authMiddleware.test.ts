import type { NextFunction, Request, Response } from 'express';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { generateToken } from '../../../src/services/tokenService';
import {
  authenticateToken,
  requireAdmin,
} from '../../../src/middlewares/authMiddleware';

const createResponseMock = () => {
  const response = {
    status: vi.fn(),
    json: vi.fn(),
  };

  response.status.mockReturnValue(response);
  return response;
};

const createRequestMock = (authorization?: string): Request =>
  ({
    headers: authorization ? { authorization } : {},
  }) as Request;

describe('authMiddleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('permite administrador autenticado', () => {
    const req = createRequestMock(
      `Bearer ${generateToken(1, 'admin@example.com', 'admin')}`,
    );
    const res = createResponseMock();
    const next = vi.fn<NextFunction>();

    authenticateToken(req, res as unknown as Response, next);

    expect(next).toHaveBeenCalledOnce();
    expect(req.user).toMatchObject({
      id: 1,
      email: 'admin@example.com',
      role: 'admin',
    });
  });

  it('rejeita requisição sem token', () => {
    const req = createRequestMock();
    const res = createResponseMock();
    const next = vi.fn<NextFunction>();

    authenticateToken(req, res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Token de acesso requerido',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('rejeita token inválido', () => {
    const req = createRequestMock('Bearer token-invalido');
    const res = createResponseMock();
    const next = vi.fn<NextFunction>();

    authenticateToken(req, res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Token inválido ou expirado',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('permite administrador no requireAdmin', () => {
    const req = {
      user: { id: 1, email: 'admin@example.com', role: 'admin' },
    } as Request;
    const next = vi.fn<NextFunction>();

    requireAdmin(req, createResponseMock() as unknown as Response, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it('rejeita usuário comum no requireAdmin', () => {
    const req = {
      user: { id: 2, email: 'user@example.com', role: 'user' },
    } as Request;
    const res = createResponseMock();
    const next = vi.fn<NextFunction>();

    requireAdmin(req, res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Acesso negado. Apenas administradores.',
    });
    expect(next).not.toHaveBeenCalled();
  });
});