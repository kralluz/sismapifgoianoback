const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'SISMAP API',
    description: 'API do Sistema de Mapeamento',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
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
      description: 'Endpoints de gerenciamento de salas'
    },
    {
      name: 'Projects',
      description: 'Endpoints de gerenciamento de projetos'
    }
  ],
  paths: {
    '/health': {
      get: {
        tags: ['System'],
        summary: 'Health check do sistema',
        description: 'Endpoint para verificar se a API está funcionando',
        responses: {
          200: {
            description: 'Sistema funcionando normalmente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok'
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time',
                      example: '2023-09-03T10:30:00.000Z'
                    },
                    uptime: {
                      type: 'number',
                      example: 123.456
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './src/routers/authRouter.ts',
  './src/routers/roomRouter.ts',
  './src/routers/projectRouter.ts'
];

swaggerAutogen(outputFile, endpointsFiles, doc);