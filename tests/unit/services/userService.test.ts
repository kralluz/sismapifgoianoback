import { beforeEach, describe, expect, it, vi } from 'vitest';
import bcrypt from 'bcrypt';

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    usuario: {
      count: vi.fn(),
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

vi.mock('@prisma/client', () => ({
  PrismaClient: class {
    usuario = prismaMock.usuario;
  },
}));

import {
  createUser,
  findUserByEmail,
  getUserCount,
  validatePassword,
} from '../../../src/services/userService';

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retorna a quantidade de usuários', async () => {
    prismaMock.usuario.count.mockResolvedValue(2);

    await expect(getUserCount()).resolves.toBe(2);
  });

  it('cria usuário armazenando a senha com hash', async () => {
    prismaMock.usuario.create.mockResolvedValue({
      id: 1,
      nome: 'Maria',
      email: 'maria@example.com',
      senha: 'hash',
      role: 'user',
    });

    const user = await createUser(
      'Maria',
      'maria@example.com',
      'senha-segura',
      'user',
    );

    expect(user).toMatchObject({ id: 1, email: 'maria@example.com' });
    expect(prismaMock.usuario.create).toHaveBeenCalledWith({
      data: {
        nome: 'Maria',
        email: 'maria@example.com',
        senha: expect.any(String),
        role: 'user',
      },
    });
    expect(
      await bcrypt.compare(
        'senha-segura',
        prismaMock.usuario.create.mock.calls[0][0].data.senha,
      ),
    ).toBe(true);
  });

  it('busca usuário pelo e-mail', async () => {
    const user = { id: 1, email: 'maria@example.com' };
    prismaMock.usuario.findUnique.mockResolvedValue(user);

    await expect(findUserByEmail(user.email)).resolves.toEqual(user);
    expect(prismaMock.usuario.findUnique).toHaveBeenCalledWith({
      where: { email: user.email },
    });
  });

  it('retorna verdadeiro para senha correta', async () => {
    const hash = await bcrypt.hash('senha-segura', 4);

    await expect(validatePassword('senha-segura', hash)).resolves.toBe(true);
  });

  it('retorna falso para senha incorreta', async () => {
    const hash = await bcrypt.hash('senha-segura', 4);

    await expect(validatePassword('senha-incorreta', hash)).resolves.toBe(false);
  });
});