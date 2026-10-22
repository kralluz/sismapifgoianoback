import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { generateToken } from '../../src/services/tokenService';

const { userServiceMock } = vi.hoisted(() => ({
  userServiceMock: {
    getUserCount: vi.fn(),
    createUser: vi.fn(),
    findUserByEmail: vi.fn(),
    validatePassword: vi.fn(),
  },
}));

vi.mock('../../src/services/userService', () => userServiceMock);

import app from '../../src/app';

const authorization = (token: string) => `Bearer ${token}`;

describe('autenticação', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('cria o primeiro administrador', async () => {
    userServiceMock.getUserCount.mockResolvedValue(0);
    userServiceMock.createUser.mockResolvedValue({
      id: 1,
      nome: 'Administrador',
      email: 'admin@example.com',
      role: 'admin',
      senha: 'hash',
    });

    const response = await request(app).post('/auth/register').send({
      nome: 'Administrador',
      email: 'admin@example.com',
      senha: 'senha-segura',
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: 1,
      email: 'admin@example.com',
      role: 'admin',
      isFirstUser: true,
    });
    expect(response.body.senha).toBeUndefined();
  });

  it('permite registro posterior quando há administrador autenticado', async () => {
    userServiceMock.getUserCount.mockResolvedValue(1);
    userServiceMock.createUser.mockResolvedValue({
      id: 3,
      nome: 'Novo usuário',
      email: 'novo@example.com',
      role: 'user',
      senha: 'hash',
    });

    const response = await request(app)
      .post('/auth/register')
      .set('Authorization', authorization(generateToken(1, 'admin@example.com', 'admin')))
      .send({
        nome: 'Novo usuário',
        email: 'novo@example.com',
        senha: 'senha-segura',
        role: 'user',
      });

    expect(response.status).toBe(201);
    expect(userServiceMock.createUser).toHaveBeenCalledWith(
      'Novo usuário',
      'novo@example.com',
      'senha-segura',
      'user',
    );
  });

  it('impede usuário não autenticado de registrar papel de administrador', async () => {
    userServiceMock.getUserCount.mockResolvedValue(1);

    const response = await request(app).post('/auth/register').send({
      nome: 'Usuário privilegiado',
      email: 'privilegiado@example.com',
      senha: 'senha-segura',
      role: 'admin',
    });

    expect(response.status).toBe(403);
    expect(userServiceMock.createUser).not.toHaveBeenCalled();
  });

  it('rejeita e-mail inválido no registro', async () => {
    const response = await request(app).post('/auth/register').send({
      nome: 'Maria Silva',
      email: 'email-invalido',
      senha: 'senha-segura',
    });

    expect(response.status).toBe(400);
    expect(userServiceMock.getUserCount).not.toHaveBeenCalled();
  });

  it('rejeita senha ausente no registro', async () => {
    const response = await request(app).post('/auth/register').send({
      nome: 'Maria Silva',
      email: 'maria@example.com',
    });

    expect(response.status).toBe(400);
    expect(userServiceMock.getUserCount).not.toHaveBeenCalled();
  });

  it('rejeita e-mail duplicado', async () => {
    userServiceMock.getUserCount.mockResolvedValue(0);
    userServiceMock.createUser.mockRejectedValue(new Error('duplicate email'));

    const response = await request(app).post('/auth/register').send({
      nome: 'Maria Silva',
      email: 'maria@example.com',
      senha: 'senha-segura',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Email já cadastrado ou dados inválidos.',
    });
  });

  it('autentica com credenciais válidas', async () => {
    userServiceMock.getUserCount.mockResolvedValue(1);
    userServiceMock.findUserByEmail.mockResolvedValue({
      id: 2,
      nome: 'Maria Silva',
      email: 'maria@example.com',
      senha: 'hash',
      role: 'user',
    });
    userServiceMock.validatePassword.mockResolvedValue(true);

    const response = await request(app).post('/auth/login').send({
      email: 'maria@example.com',
      senha: 'senha-segura',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 2,
      email: 'maria@example.com',
      role: 'user',
      token: expect.any(String),
    });
  });

  it('rejeita senha inválida', async () => {
    userServiceMock.getUserCount.mockResolvedValue(1);
    userServiceMock.findUserByEmail.mockResolvedValue({
      id: 2,
      nome: 'Maria Silva',
      email: 'maria@example.com',
      senha: 'hash',
      role: 'user',
    });
    userServiceMock.validatePassword.mockResolvedValue(false);

    const response = await request(app).post('/auth/login').send({
      email: 'maria@example.com',
      senha: 'senha-incorreta',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: 'Email ou senha inválidos.',
    });
  });

  it('rejeita e-mail inexistente', async () => {
    userServiceMock.getUserCount.mockResolvedValue(1);
    userServiceMock.findUserByEmail.mockResolvedValue(null);

    const response = await request(app).post('/auth/login').send({
      email: 'ausente@example.com',
      senha: 'senha-segura',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: 'Email ou senha inválidos.',
    });
  });

  it('rejeita payload de login inválido', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'email-invalido',
    });

    expect(response.status).toBe(400);
    expect(userServiceMock.getUserCount).not.toHaveBeenCalled();
  });
});
