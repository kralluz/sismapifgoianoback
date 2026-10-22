import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../src/app';

describe('GET /health', () => {
  it('retorna 200 e o estado da aplicação', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      timestamp: expect.any(String),
      uptime: expect.any(Number),
    });
  });
});