"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoomById = exports.deleteRoomById = exports.findRoomById = exports.findAllRooms = exports.createRoom = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createRoom = async (data) => {
    const room = await prisma.room.create({
        data,
    });
    return room;
};
exports.createRoom = createRoom;
const findAllRooms = async () => {
    const rooms = await prisma.room.findMany();
    return rooms;
};
exports.findAllRooms = findAllRooms;
const findRoomById = async (id) => {
    const room = await prisma.room.findUnique({
        where: { id },
    });
    return room;
};
exports.findRoomById = findRoomById;
const deleteRoomById = async (id) => {
    // Primeiro, deletar todos os projetos associados à sala
    await prisma.project.deleteMany({
        where: { roomId: id },
    });
    // Depois, deletar a sala
    await prisma.room.delete({
        where: { id },
    });
};
exports.deleteRoomById = deleteRoomById;
const updateRoomById = async (id, data) => {
    const updated = await prisma.room.update({
        where: { id },
        data,
    });
    return updated;
};
exports.updateRoomById = updateRoomById;
//# sourceMappingURL=roomService.js.map