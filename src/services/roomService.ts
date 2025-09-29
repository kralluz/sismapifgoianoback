import { Prisma, PrismaClient, Room } from "@prisma/client";


const prisma = new PrismaClient();


export const createRoom = async (data: Prisma.RoomCreateInput) => {
  const room = await prisma.room.create({
    data,
  });
  return room;
};

export const findAllRooms = async (): Promise<Room[]> => {
  const rooms = await prisma.room.findMany();
  return rooms;
};

export const findRoomById = async (id: number): Promise<Room | null> => {
  const room = await prisma.room.findUnique({
    where: { id },
  });
  return room;
};

export const deleteRoomById = async (id: number): Promise<void> => {
  await prisma.room.delete({
    where: { id },
  });
};

export const updateRoomById = async (
  id: number,
  data: Prisma.RoomUpdateInput
): Promise<Room> => {
  const updated = await prisma.room.update({
    where: { id },
    data,
  });
  return updated;
};
