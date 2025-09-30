const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRoom() {
  try {
    const room = await prisma.room.findUnique({ where: { id: 1 } });
    console.log('Sala 1:', room);

    const projects = await prisma.project.findMany({ where: { roomId: 1 } });
    console.log('Projetos associados à sala 1:', projects.length);

    if (projects.length > 0) {
      console.log('Projetos:', projects);
    }
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkRoom();