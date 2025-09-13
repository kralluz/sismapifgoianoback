import { Prisma, PrismaClient, Project } from "@prisma/client";


const prisma = new PrismaClient();

export const createNewProject = async (data: Prisma.ProjectCreateInput) => {
  const project = await prisma.project.create({
    data,
  });
  return project;
};

export const findAllProjects = async (): Promise<Project[]>=> {
  const projects = await prisma.project.findMany();
  return projects;
};

export const getProjectById = async (id: number) => {
  const project = await prisma.project.findUnique({
    where: { id },
  });
  return project;
};

export const updateProject = async (id: number, data: Prisma.ProjectUpdateInput) => {
  const updatedProject = await prisma.project.update({
    where: { id },
    data,
  });
  return updatedProject;
};

export const deleteProject = async (id: number) => {
  await prisma.project.delete({
    where: { id },
  });
};