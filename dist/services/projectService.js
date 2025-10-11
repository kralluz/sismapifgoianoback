"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.findAllProjects = exports.createNewProject = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createNewProject = async (data) => {
    const project = await prisma.project.create({
        data,
        include: {
            room: true
        }
    });
    return project;
};
exports.createNewProject = createNewProject;
const findAllProjects = async () => {
    const projects = await prisma.project.findMany({
        include: {
            room: true
        }
    });
    return projects;
};
exports.findAllProjects = findAllProjects;
const getProjectById = async (id) => {
    const project = await prisma.project.findUnique({
        where: { id },
        include: {
            room: true
        }
    });
    return project;
};
exports.getProjectById = getProjectById;
const updateProject = async (id, data) => {
    const updatedProject = await prisma.project.update({
        where: { id },
        data,
        include: {
            room: true
        }
    });
    return updatedProject;
};
exports.updateProject = updateProject;
const deleteProject = async (id) => {
    await prisma.project.delete({
        where: { id },
    });
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=projectService.js.map