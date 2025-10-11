"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/register', 
// #swagger.tags = ['Auth']
// #swagger.summary = 'Registrar novo usuário'
// #swagger.description = 'Endpoint para registrar um novo usuário no sistema'
/* #swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          nome: {
            type: "string",
            example: "João Silva"
          },
          email: {
            type: "string",
            example: "joao@email.com"
          },
          senha: {
            type: "string",
            example: "123456"
          },
          role: {
            type: "string",
            example: "user"
          },
          adminEmail: {
            type: "string",
            example: "admin"
          },
          adminSenha: {
            type: "string",
            example: "admin"
          }
        },
        required: ["nome", "email", "senha", "role", "adminEmail", "adminSenha"]
      }
    }
  }
} */
/* #swagger.responses[201] = {
  description: 'Usuário criado com sucesso',
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          id: { type: "integer" },
          nome: { type: "string" },
          email: { type: "string" },
          role: { type: "string" }
        }
      }
    }
  }
} */
/* #swagger.responses[400] = {
  description: 'Email já cadastrado ou dados inválidos'
} */
/* #swagger.responses[403] = {
  description: 'Apenas administradores podem criar contas'
} */
authController_1.register);
router.post('/login', 
// #swagger.tags = ['Auth']
// #swagger.summary = 'Login do usuário'
// #swagger.description = 'Autentica um usuário no sistema. Aceita qualquer payload e cria usuário automaticamente se não existir. Se o sistema não tiver usuários, use email "admin" ou "admin@mail.com" com senha "admin" para criar o primeiro administrador.'
/* #swagger.requestBody = {
  required: false,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "admin@mail.com"
          },
          senha: {
            type: "string",
            example: "admin"
          },
          nome: {
            type: "string",
            example: "Novo Usuário"
          },
          role: {
            type: "string",
            example: "user"
          }
        }
      }
    }
  }
} */
/* #swagger.responses[200] = {
  description: 'Login realizado com sucesso',
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          id: { type: "integer" },
          nome: { type: "string" },
          email: { type: "string" },
          role: { type: "string" }
        }
      }
    }
  }
} */
/* #swagger.responses[401] = {
  description: 'Credenciais inválidas'
} */
authController_1.login);
exports.default = router;
//# sourceMappingURL=authRouter.js.map