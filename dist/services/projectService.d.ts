import { Prisma } from "@prisma/client";
export declare const createNewProject: (data: Prisma.ProjectCreateInput) => Promise<{
    room: {
        id: number;
        name: string;
        y: number;
        x: number;
        description: string;
        path: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date | null;
    };
} & {
    number: number;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    roomId: number;
    title: string;
}>;
export declare const findAllProjects: () => Promise<({
    room: {
        id: number;
        name: string;
        y: number;
        x: number;
        description: string;
        path: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date | null;
    };
} & {
    number: number;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    roomId: number;
    title: string;
})[]>;
export declare const getProjectById: (id: number) => Promise<({
    room: {
        id: number;
        name: string;
        y: number;
        x: number;
        description: string;
        path: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date | null;
    };
} & {
    number: number;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    roomId: number;
    title: string;
}) | null>;
export declare const updateProject: (id: number, data: Prisma.ProjectUpdateInput) => Promise<{
    room: {
        id: number;
        name: string;
        y: number;
        x: number;
        description: string;
        path: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date | null;
    };
} & {
    number: number;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    roomId: number;
    title: string;
}>;
export declare const deleteProject: (id: number) => Promise<void>;
//# sourceMappingURL=projectService.d.ts.map