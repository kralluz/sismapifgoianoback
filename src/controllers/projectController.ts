import { Request, Response } from 'express';
import * as projectService from '../services/projectService';
import { projectSchema, projectUpdateSchema } from '../schema/projectSchema';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

// Traduz erros conhecidos em respostas úteis para o formulário
const sendError = (res: Response, error: unknown, fallback: string) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ error: error.issues[0]?.message ?? fallback, issues: error.issues });
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Já existe um projeto com esse número.' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Projeto não encontrado.' });
    }
  }
  console.error(fallback, error);
  return res.status(500).json({ error: fallback });
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const projectData = projectSchema.parse(req.body);
    const project = await projectService.createNewProject({
      number: projectData.number ?? null,
      title: projectData.title,
      localId: projectData.localId,
      complemento: projectData.complemento || null,
    });
    res.status(201).json(project);
  } catch (error) {
    sendError(res, error, 'Erro ao criar projeto.');
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.findAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    sendError(res, error, 'Erro ao buscar projetos.');
  }
};

export const findProjectById = async (req: Request, res: Response) => {
  try {
    const project = await projectService.getProjectById(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado.' });
    }
    res.status(200).json(project);
  } catch (error) {
    sendError(res, error, 'Erro ao buscar projeto.');
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const projectData = projectUpdateSchema.parse(req.body);
    const data: Prisma.ProjectUpdateInput = {};
    if (projectData.number !== undefined) data.number = projectData.number;
    if (projectData.title !== undefined) data.title = projectData.title;
    if (projectData.localId !== undefined) data.localId = projectData.localId;
    if (projectData.complemento !== undefined) data.complemento = projectData.complemento || null;
    const updatedProject = await projectService.updateProject(Number(req.params.id), data);
    res.status(200).json(updatedProject);
  } catch (error) {
    sendError(res, error, 'Erro ao atualizar projeto.');
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    await projectService.deleteProject(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    sendError(res, error, 'Erro ao deletar projeto.');
  }
};
