"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const userService_1 = require("../services/userService");
const authMiddleware_1 = require("../middlewares/authMiddleware");
/**
 * #swagger.tags = ['Auth']
 * #swagger.summary = 'Registrar novo usuário'
 * #swagger.description = 'Endpoint para registrar um novo usuário no sistema'
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Dados do usuário e credenciais de admin',
 *   required: true,
 *   schema: {
 *     nome: 'João Silva',
 *     email: 'joao@email.com',
 *     senha: '123456',
 *     role: 'user',
 *     adminEmail: 'admin',
 *     adminSenha: 'admin'
 *   }
 * }
 */
const register = async (req, res) => {
    const { nome, email, senha, role, adminEmail, adminSenha } = req.body;
    await (0, userService_1.createDefaultAdmin)();
    if (!(0, authMiddleware_1.validateAdminCredentials)(adminEmail, adminSenha)) {
        return res.status(403).json({ error: 'Apenas administradores podem criar contas.' });
    }
    try {
        const usuario = await (0, userService_1.createUser)(nome, email, senha, role);
        res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role });
    }
    catch (error) {
        res.status(400).json({ error: 'Email já cadastrado ou dados inválidos.' });
    }
};
exports.register = register;
/**
 * #swagger.tags = ['Auth']
 * #swagger.summary = 'Login do usuário'
 * #swagger.description = 'Endpoint para autenticar usuário no sistema'
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Credenciais do usuário',
 *   required: true,
 *   schema: {
 *     email: 'joao@email.com',
 *     senha: '123456'
 *   }
 * }
 */
const login = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await (0, userService_1.findUserByEmail)(email);
    if (!usuario)
        return res.status(401).json({ error: 'Usuário não encontrado.' });
    const valid = await (0, userService_1.validatePassword)(senha, usuario.senha);
    if (!valid)
        return res.status(401).json({ error: 'Senha incorreta.' });
    res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role });
};
exports.login = login;
//# sourceMappingURL=authController.js.map