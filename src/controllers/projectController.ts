import { Request, Response } from 'express';
import * as projectService from '../services/projectService';
import { projectSchema, projectUpdateSchema } from '../schema/projectSchema';
import { Prisma } from '@prisma/client';

export const createProject = async (req: Request, res: Response) => {
  try {
    const projectData = projectSchema.parse(req.body);

    const data: Prisma.ProjectCreateInput = {
      title: projectData.title,
      type: projectData.type,
      startAt: projectData.startAt,
      endAt: projectData.endAt,
      room: { connect: { id: projectData.roomId } },
    };
    const project = await projectService.createNewProject(data);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar projeto.' });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.findAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar projetos.' });
  }
};

export const findProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await projectService.getProjectById(Number(id));
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado.' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar projeto.' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const projectData = projectUpdateSchema.parse(req.body);
    const data: Prisma.ProjectUpdateInput = {};
    if (projectData.title !== undefined) data.title = projectData.title;
    if (projectData.type !== undefined) data.type = projectData.type;
    if (projectData.startAt !== undefined) data.startAt = projectData.startAt as any;
    if (projectData.endAt !== undefined) data.endAt = projectData.endAt as any;
    if (projectData.roomId !== undefined) data.room = { connect: { id: projectData.roomId } };
    const updatedProject = await projectService.updateProject(Number(id), data);
    if (!updatedProject) {
      return res.status(404).json({ error: 'Projeto não encontrado.' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar projeto.' });
  }
};


export const deleteProject = async (req: Request, res: Response) => {
  const {id} = req.params;

  try{
    await projectService.deleteProject(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar projeto.' });
  }
}