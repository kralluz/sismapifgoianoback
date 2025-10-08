import { Prisma, Room } from "@prisma/client";
export declare const createRoom: (data: Prisma.RoomCreateInput) => Promise<{
    id: number;
    name: string;
    y: number;
    x: number;
    description: string;
    capacity: number;
    type: string;
    building: string;
    path: Prisma.JsonValue;
    createdAt: Date;
    updatedAt: Date | null;
}>;
export declare const findAllRooms: () => Promise<Room[]>;
export declare const findRoomById: (id: number) => Promise<Room | null>;
export declare const deleteRoomById: (id: number) => Promise<void>;
export declare const updateRoomById: (id: number, data: Prisma.RoomUpdateInput) => Promise<Room>;
//# sourceMappingURL=roomService.d.ts.map