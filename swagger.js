const swaggerAutogen = require('swagger-autogen')();

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
      name: 'Auth',
      description: 'Endpoints de autenticação'
    }
  ]
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);