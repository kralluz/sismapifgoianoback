import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createDefaultAdmin = async () => {
  const userCount = await prisma.usuario.count();
  
  if (userCount === 0) {
    const adminHash = await bcrypt.hash('admin', 10);
    await prisma.usuario.create({
      data: { nome: 'Admin', email: 'admin', senha: adminHash, role: 'admin' }
    });
  }
};

export const createUser = async (nome: string, email: string, senha: string, role: string) => {
  const hashedPassword = await bcrypt.hash(senha, 10);
  
  return await prisma.usuario.create({
    data: { nome, email, senha: hashedPassword, role }
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.usuario.findUnique({ where: { email } });
};

export const validatePassword = async (senha: string, hashedPassword: string) => {
  return await bcrypt.compare(senha, hashedPassword);
};