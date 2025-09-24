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