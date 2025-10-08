"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.authenticateToken = exports.validateAdminCredentials = void 0;
const jwtService_1 = require("../services/jwtService");
const validateAdminCredentials = (adminEmail, adminSenha) => {
    return (adminEmail === 'admin' || adminEmail === 'admin@mail.com') && adminSenha === 'admin';
};
exports.validateAdminCredentials = validateAdminCredentials;
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token de acesso requerido' });
    }
    // Development mode: accept dev token
    if (token === 'dev-token-for-testing' && process.env.NODE_ENV !== 'production') {
        req.user = { id: 1, email: 'dev@test.com', role: 'admin' };
        return next();
    }
    const decoded = (0, jwtService_1.verifyToken)(token);
    if (!decoded) {
        return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
    req.user = decoded;
    next();
};
exports.authenticateToken = authenticateToken;
const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
    }
    next();
};
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=authMiddleware.js.map