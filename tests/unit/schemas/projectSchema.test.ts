import { describe, expect, it } from 'vitest';
import { projectSchema } from '../../../src/schema/projectSchema';

describe('projectSchema', () => {
  const validProject = {
    number: 1,
    title: 'Projeto válido',
    localId: 'a-dap',
    complemento: 'Bloco administrativo',
  };

  it('aceita um projeto válido', () => {
    const result = projectSchema.safeParse(validProject);

    expect(result.success).toBe(true);
  });

  it('rejeita roomId/localId inexistente no catálogo', () => {
    const result = projectSchema.safeParse({
      ...validProject,
      localId: 'local-inexistente',
    });

    expect(result.success).toBe(false);
  });

  it('rejeita título com menos de dois caracteres', () => {
    const result = projectSchema.safeParse({
      ...validProject,
      title: 'A',
    });

    expect(result.success).toBe(false);
  });

  it('rejeita número menor que um', () => {
    const result = projectSchema.safeParse({
      ...validProject,
      number: 0,
    });

    expect(result.success).toBe(false);
  });
});