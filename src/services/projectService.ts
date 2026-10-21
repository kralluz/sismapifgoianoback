import { Prisma, PrismaClient, Project } from "@prisma/client";
import { getLocal } from "./localService";

const prisma = new PrismaClient();

// Anexa os dados do local (nome, bloco, tipo) vindos do catálogo fixo
const withLocal = (project: Project) => ({ ...project, local: getLocal(project.localId) ?? null });

export const createNewProject = async (data: Prisma.ProjectCreateInput) => {
  const project = await prisma.project.create({ data });
  return withLocal(project);
};

export const findAllProjects = async () => {
  const projects = await prisma.project.findMany({ orderBy: [{ number: { sort: "asc", nulls: "last" } }, { title: "asc" }] });
  return projects.map(withLocal);
};

export const getProjectById = async (id: number) => {
  const project = await prisma.project.findUnique({ where: { id } });
  return project && withLocal(project);
};

export const updateProject = async (id: number, data: Prisma.ProjectUpdateInput) => {
  const updatedProject = await prisma.project.update({ where: { id }, data });
  return withLocal(updatedProject);
};

export const deleteProject = async (id: number) => {
  await prisma.project.delete({
    where: { id },
  });
};
