const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'SISMAP API',
    description: 'API do Sistema de Mapeamento',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Bearer token. Exemplo: Bearer seu_token_aqui'
    }
  },
  tags: [
    {
      name: 'Auth',
      description: 'Endpoints de autenticação'
    },
    {
      name: 'Rooms',
      description: 'Endpoints de salas (protegidos)'
    }
  ]
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);