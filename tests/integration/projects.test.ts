import { Prisma } from '@prisma/client';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import { generateToken } from '../../src/services/tokenService';
import { JWT_SECRET } from '../../src/services/jwtService';

const { projectServiceMock } = vi.hoisted(() => ({
  projectServiceMock: {
    createNewProject: vi.fn(),
    findAllProjects: vi.fn(),
    getProjectById: vi.fn(),
    updateProject: vi.fn(),
    deleteProject: vi.fn(),
  },
}));

vi.mock('../../src/services/projectService', () => projectServiceMock);

import app from '../../src/app';

const adminToken = () => generateToken(1, 'admin@example.com', 'admin');
const userToken = () => generateToken(2, 'user@example.com', 'user');
const authorization = (token: string) => `Bearer ${token}`;
const projectPayload = {
  number: 12,
  title: 'Projeto de teste',
  localId: 'a-dap',
};

describe('projetos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('cria um projeto autorizado', async () => {
    projectServiceMock.createNewProject.mockResolvedValue({
      id: 1,
      ...projectPayload,
      complemento: null,
      local: { id: 'a-dap', nome: 'DAP', bloco: 'A', tipo: 'administrativo' },
    });

    const response = await request(app)
      .post('/api/project')
      .set('Authorization', authorization(adminToken()))
      .send(projectPayload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: 1,
      number: 12,
      localId: 'a-dap',
    });
    expect(projectServiceMock.createNewProject).toHaveBeenCalledWith({
      number: 12,
      title: 'Projeto de teste',
      localId: 'a-dap',
      complemento: null,
    });
  });

  it('rejeita criação sem token', async () => {
    const response = await request(app).post('/api/project').send(projectPayload);

    expect(response.status).toBe(401);
    expect(projectServiceMock.createNewProject).not.toHaveBeenCalled();
  });

  it('rejeita criação por usuário sem permissão', async () => {
    const response = await request(app)
      .post('/api/project')
      .set('Authorization', authorization(userToken()))
      .send(projectPayload);

    expect(response.status).toBe(403);
    expect(projectServiceMock.createNewProject).not.toHaveBeenCalled();
  });

  it('rejeita token malformado', async () => {
    const response = await request(app)
      .post('/api/project')
      .set('Authorization', 'Bearer token-malformado')
      .send(projectPayload);

    expect(response.status).toBe(403);
    expect(projectServiceMock.createNewProject).not.toHaveBeenCalled();
  });

  it('rejeita token expirado', async () => {
    const expiredToken = jwt.sign(
      { id: 1, email: 'admin@example.com', role: 'admin' },
      JWT_SECRET,
      { expiresIn: -1 },
    );

    const response = await request(app)
      .post('/api/project')
      .set('Authorization', authorization(expiredToken))
      .send(projectPayload);

    expect(response.status).toBe(403);
    expect(projectServiceMock.createNewProject).not.toHaveBeenCalled();
  });

  it('rejeita local inexistente', async () => {
    const response = await request(app)
      .post('/api/project')
      .set('Authorization', authorization(adminToken()))
      .send({ ...projectPayload, localId: 'local-inexistente' });

    expect(response.status).toBe(400);
    expect(projectServiceMock.createNewProject).not.toHaveBeenCalled();
  });

  it('rejeita número inválido', async () => {
    const response = await request(app)
      .post('/api/project')
      .set('Authorization', authorization(adminToken()))
      .send({ ...projectPayload, number: 0 });

    expect(response.status).toBe(400);
    expect(projectServiceMock.createNewProject).not.toHaveBeenCalled();
  });

  it('rejeita título inválido', async () => {
    const response = await request(app)
      .post('/api/project')
      .set('Authorization', authorization(adminToken()))
      .send({ ...projectPayload, title: 'A' });

    expect(response.status).toBe(400);
    expect(projectServiceMock.createNewProject).not.toHaveBeenCalled();
  });

  it('retorna conflito para número duplicado', async () => {
    projectServiceMock.createNewProject.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: 'test',
      }),
    );

    const response = await request(app)
      .post('/api/project')
      .set('Authorization', authorization(adminToken()))
      .send(projectPayload);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      error: 'Já existe um projeto com esse número.',
    });
  });

  it('retorna erro quando a criação falha no banco', async () => {
    projectServiceMock.createNewProject.mockRejectedValue(new Error('database unavailable'));

    const response = await request(app)
      .post('/api/project')
      .set('Authorization', authorization(adminToken()))
      .send(projectPayload);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erro ao criar projeto.' });
  });

  it('lista projetos', async () => {
    projectServiceMock.findAllProjects.mockResolvedValue([]);

    const response = await request(app).get('/api/project');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('retorna erro quando a listagem falha no banco', async () => {
    projectServiceMock.findAllProjects.mockRejectedValue(new Error('database unavailable'));

    const response = await request(app).get('/api/project');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erro ao buscar projetos.' });
  });

  it('retorna 404 para projeto inexistente', async () => {
    projectServiceMock.getProjectById.mockResolvedValue(null);

    const response = await request(app).get('/api/project/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Projeto não encontrado.' });
  });

  it('trata ID inválido na busca', async () => {
    projectServiceMock.getProjectById.mockResolvedValue(null);

    const response = await request(app).get('/api/project/id-invalido');

    expect(response.status).toBe(404);
    expect(projectServiceMock.getProjectById).toHaveBeenCalledWith(Number.NaN);
  });

  it('retorna projeto com local relacionado', async () => {
    projectServiceMock.getProjectById.mockResolvedValue({
      id: 1,
      ...projectPayload,
      complemento: null,
      local: { id: 'a-dap', nome: 'DAP', bloco: 'A', tipo: 'administrativo' },
    });

    const response = await request(app).get('/api/project/1');

    expect(response.status).toBe(200);
    expect(response.body.local).toEqual(expect.objectContaining({ id: 'a-dap', nome: 'DAP' }));
  });

  it('atualiza o título', async () => {
    projectServiceMock.updateProject.mockResolvedValue({
      id: 1,
      ...projectPayload,
      title: 'Projeto atualizado',
      complemento: null,
      local: null,
    });

    const response = await request(app)
      .put('/api/project/1')
      .set('Authorization', authorization(adminToken()))
      .send({ title: 'Projeto atualizado' });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Projeto atualizado');
    expect(projectServiceMock.updateProject).toHaveBeenCalledWith(
      1,
      { title: 'Projeto atualizado' },
    );
  });

  it('rejeita atualização por usuário sem autorização', async () => {
    const response = await request(app)
      .put('/api/project/1')
      .set('Authorization', authorization(userToken()))
      .send({ title: 'Alteração proibida' });

    expect(response.status).toBe(403);
    expect(projectServiceMock.updateProject).not.toHaveBeenCalled();
  });

  it('permite mudar o local', async () => {
    projectServiceMock.updateProject.mockResolvedValue({
      id: 1,
      ...projectPayload,
      localId: 'a-dir-ensino',
      complemento: null,
      local: { id: 'a-dir-ensino', nome: 'Dir. Ensino', bloco: 'A', tipo: 'administrativo' },
    });

    const response = await request(app)
      .put('/api/project/1')
      .set('Authorization', authorization(adminToken()))
      .send({ localId: 'a-dir-ensino' });

    expect(response.status).toBe(200);
    expect(response.body.localId).toBe('a-dir-ensino');
    expect(projectServiceMock.updateProject).toHaveBeenCalledWith(
      1,
      { localId: 'a-dir-ensino' },
    );
  });

  it('retorna erro quando a atualização falha no banco', async () => {
    projectServiceMock.updateProject.mockRejectedValue(new Error('database unavailable'));

    const response = await request(app)
      .put('/api/project/1')
      .set('Authorization', authorization(adminToken()))
      .send({ title: 'Falha de atualização' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erro ao atualizar projeto.' });
  });

  it('exclui um projeto autorizado', async () => {
    projectServiceMock.deleteProject.mockResolvedValue(undefined);

    const response = await request(app)
      .delete('/api/project/1')
      .set('Authorization', authorization(adminToken()));

    expect(response.status).toBe(204);
    expect(projectServiceMock.deleteProject).toHaveBeenCalledWith(1);
  });

  it('rejeita exclusão por usuário sem autorização', async () => {
    const response = await request(app)
      .delete('/api/project/1')
      .set('Authorization', authorization(userToken()));

    expect(response.status).toBe(403);
    expect(projectServiceMock.deleteProject).not.toHaveBeenCalled();
  });

  it('retorna erro quando a exclusão falha no banco', async () => {
    projectServiceMock.deleteProject.mockRejectedValue(new Error('database unavailable'));

    const response = await request(app)
      .delete('/api/project/1')
      .set('Authorization', authorization(adminToken()));

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erro ao deletar projeto.' });
  });
});
