import { Prisma, PrismaClient, Project } from "@prisma/client";


const prisma = new PrismaClient();

export const createNewProject = async (data: Prisma.ProjectCreateInput) => {
  const project = await prisma.project.create({
    data,
    include: {
      room: true
    }
  });
  return project;
};

export const findAllProjects = async ()=> {
  const projects = await prisma.project.findMany({
    include: {
      room: true
    }
  });
  return projects;
};

export const getProjectById = async (id: number) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      room: true
    }
  });
  return project;
};

export const updateProject = async (id: number, data: Prisma.ProjectUpdateInput) => {
  const updatedProject = await prisma.project.update({
    where: { id },
    data,
    include: {
      room: true
    }
  });
  return updatedProject;
};

export const deleteProject = async (id: number) => {
  await prisma.project.delete({
    where: { id },
  });
};