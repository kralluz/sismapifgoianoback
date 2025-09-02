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

  ]
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = [
  './src/app.ts',
  './src/routers/roomRouter.ts',
  './src/routers/projectRouter.ts'
];

swaggerAutogen(outputFile, endpointsFiles, doc);