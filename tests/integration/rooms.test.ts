import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../src/app';

describe('catálogo de locais', () => {
  it('lista os locais em GET /api/locais', async () => {
    const response = await request(app).get('/api/locais');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        nome: expect.any(String),
        tipo: expect.any(String),
      }),
    );
  });

  it('não expõe a rota antiga de salas', async () => {
    const response = await request(app).get('/api/room');

    expect(response.status).toBe(404);
  });
});