import { Request, Response } from 'express';
import * as projectService from '../services/projectService';
import { projectSchema } from '../schema/projectSchema';


/**
 * #swagger.tags = ['Projects']
 * #swagger.summary = 'Criar um novo projeto'
 * #swagger.description = 'Endpoint para criar um projeto no sistema'
 * #swagger.requestBody = {
 *   required: true,
 *   content: {
 *     "application/json": {
 *       schema: {
 *         title: "Novo Projeto",
 *         type: "Banner",
 *         startAt: "2023-01-01",
 *         endAt: "2023-12-31",
 *         roomId: 1
 *       }
 *     }
 *   }
 * }
 * #swagger.responses[201] = { description: "Projeto criado com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao criar projeto" }
 */
export const createProject = async (req: Request, res: Response) => {
  try {
    const projectData = projectSchema.parse(req.body);

    const project = await projectService.createNewProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar projeto.' });
  }
};

/**
 * #swagger.tags = ['Projects']
 * #swagger.summary = 'Listagem de todos os projetos'
 * #swagger.description = 'Endpoint para listar todos os projetos do sistema'
 * #swagger.responses[200] = { description: "Projetos listados com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao listar projetos" }
 */
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
    const projectData = projectSchema.parse(req.body);
    const updatedProject = await projectService.updateProject(Number(id), projectData);
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