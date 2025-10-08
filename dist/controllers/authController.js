"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const userService_1 = require("../services/userService");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const tokenService_1 = require("../services/tokenService");
const register = async (req, res) => {
    const { nome, email, senha, role, adminEmail, adminSenha } = req.body;
    // Verificar se é o primeiro usuário ou se são credenciais válidas de admin
    const userCount = await (0, userService_1.getUserCount)();
    if (userCount > 0 && !(0, authMiddleware_1.validateAdminCredentials)(adminEmail, adminSenha)) {
        return res.status(403).json({ error: 'Apenas administradores podem criar contas.' });
    }
    try {
        const usuario = await (0, userService_1.createUser)(nome, email, senha, role);
        res.status(201).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role,
            isFirstUser: userCount === 0 // Indica se é o primeiro usuário
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Email já cadastrado ou dados inválidos.' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, senha } = req.body;
    // Verificar se não há usuários registrados
    const userCount = await (0, userService_1.getUserCount)();
    // Se não há usuários, permitir login com credenciais especiais
    if (userCount === 0) {
        if ((email === 'admin' && senha === 'admin') ||
            (email === 'admin@mail.com' && senha === 'admin')) {
            // Criar usuário admin automaticamente
            try {
                const adminUser = await (0, userService_1.createUser)('Administrador', 'admin@mail.com', 'admin', 'admin');
                const token = (0, tokenService_1.generateToken)(adminUser.id, adminUser.email, adminUser.role);
                return res.json({
                    id: adminUser.id,
                    nome: adminUser.nome,
                    email: adminUser.email,
                    role: adminUser.role,
                    token,
                    isFirstLogin: true // Indica que é o primeiro login
                });
            }
            catch (error) {
                return res.status(500).json({ error: 'Erro ao criar usuário administrador.' });
            }
        }
        else {
            return res.status(401).json({ error: 'Sistema não inicializado. Use email "admin" ou "admin@mail.com" com senha "admin".' });
        }
    }
    // Login normal para usuários existentes
    const usuario = await (0, userService_1.findUserByEmail)(email);
    if (!usuario)
        return res.status(401).json({ error: 'Usuário não encontrado.' });
    const valid = await (0, userService_1.validatePassword)(senha, usuario.senha);
    if (!valid)
        return res.status(401).json({ error: 'Senha incorreta.' });
    const token = (0, tokenService_1.generateToken)(usuario.id, usuario.email, usuario.role);
    res.json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
        token
    });
};
exports.login = login;
//# sourceMappingURL=authController.js.map