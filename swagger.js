const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'SISMAP API',
    description: 'API do Sistema de Mapeamento',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT para autenticação. Formato: Bearer {token}'
      }
    },
    schemas: {
      Room: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Sala de Reuniões A' },
          x: { type: 'integer', example: 10 },
          y: { type: 'integer', example: 20 },
          description: { type: 'string', example: 'Sala para reuniões pequenas' },
          capacity: { type: 'integer', example: 10 },
          type: { type: 'string', example: 'meeting' },
          floor: { type: 'integer', example: 1 },
          building: { type: 'string', example: 'Prédio Principal' },
          amenities: { type: 'array', items: { type: 'string' }, example: ['projetor', 'quadro branco'] },
          path: { type: 'array', items: { type: 'array', items: { type: 'integer' } }, example: [[10, 10], [20, 15]] },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time', nullable: true }
        }
      },
      Project: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Apresentação de Projeto' },
          type: { type: 'string', example: 'palestra' },
          startAt: { type: 'string', format: 'date-time', example: '2025-09-25T10:00:00.000Z' },
          endAt: { type: 'string', format: 'date-time', example: '2025-09-25T12:00:00.000Z' },
          roomId: { type: 'integer', example: 1 },
          room: { $ref: '#/components/schemas/Room' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time', nullable: true }
        }
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nome: { type: 'string', example: 'João Silva' },
          email: { type: 'string', example: 'joao@email.com' },
          role: { type: 'string', example: 'user' }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Mensagem de erro' }
        }
      }
    }
  },
  tags: [
    {
      name: 'System',
      description: 'Endpoints do sistema'
    },
    {
      name: 'Auth',
      description: 'Endpoints de autenticação'
    },
    {
      name: 'Rooms',
      description: 'Endpoints de gerenciamento de salas (protegidos)'
    },
    {
      name: 'Projects',
      description: 'Endpoints de gerenciamento de projetos'
    }
  ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './src/app.ts'
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Documentação Swagger gerada com sucesso!');
});