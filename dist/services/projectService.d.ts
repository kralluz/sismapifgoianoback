import { Prisma, Project } from "@prisma/client";
export declare const createNewProject: (data: Prisma.ProjectCreateInput) => Promise<{
    number: number;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    title: string;
    roomId: number;
}>;
export declare const findAllProjects: () => Promise<Project[]>;
export declare const getProjectById: (id: number) => Promise<{
    number: number;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    title: string;
    roomId: number;
} | null>;
export declare const updateProject: (id: number, data: Prisma.ProjectUpdateInput) => Promise<{
    number: number;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    title: string;
    roomId: number;
}>;
export declare const deleteProject: (id: number) => Promise<void>;
//# sourceMappingURL=projectService.d.ts.map