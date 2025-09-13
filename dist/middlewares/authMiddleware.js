"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminCredentials = void 0;
const validateAdminCredentials = (adminEmail, adminSenha) => {
    return adminEmail === 'admin' && adminSenha === 'admin';
};
exports.validateAdminCredentials = validateAdminCredentials;
//# sourceMappingURL=authMiddleware.js.map