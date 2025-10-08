"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.findUserByEmail = exports.createUser = exports.getUserCount = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const getUserCount = async () => {
    return await prisma.usuario.count();
};
exports.getUserCount = getUserCount;
const createUser = async (nome, email, senha, role) => {
    const hashedPassword = await bcrypt_1.default.hash(senha, 10);
    return await prisma.usuario.create({
        data: { nome, email, senha: hashedPassword, role }
    });
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    return await prisma.usuario.findUnique({ where: { email } });
};
exports.findUserByEmail = findUserByEmail;
const validatePassword = async (senha, hashedPassword) => {
    return await bcrypt_1.default.compare(senha, hashedPassword);
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=userService.js.map