"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.findProjectById = exports.getAllProjects = exports.createProject = void 0;
const projectService = __importStar(require("../services/projectService"));
const projectSchema_1 = require("../schema/projectSchema");
const createProject = async (req, res) => {
    try {
        const projectData = projectSchema_1.projectSchema.parse(req.body);
        const data = {
            number: projectData.number,
            title: projectData.title,
            room: { connect: { id: projectData.roomId } },
        };
        const project = await projectService.createNewProject(data);
        res.status(201).json(project);
    }
    catch (error) {
        console.error('Erro ao criar projeto:', error);
        res.status(400).json({ error: 'Erro ao criar projeto.' });
    }
};
exports.createProject = createProject;
const getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.findAllProjects();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar projetos.' });
    }
};
exports.getAllProjects = getAllProjects;
const findProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await projectService.getProjectById(Number(id));
        if (!project) {
            return res.status(404).json({ error: 'Projeto não encontrado.' });
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar projeto.' });
    }
};
exports.findProjectById = findProjectById;
const updateProject = async (req, res) => {
    const { id } = req.params;
    try {
        const projectData = projectSchema_1.projectUpdateSchema.parse(req.body);
        const data = {};
        if (projectData.number !== undefined)
            data.number = projectData.number;
        if (projectData.title !== undefined)
            data.title = projectData.title;
        if (projectData.roomId !== undefined)
            data.room = { connect: { id: projectData.roomId } };
        const updatedProject = await projectService.updateProject(Number(id), data);
        if (!updatedProject) {
            return res.status(404).json({ error: 'Projeto não encontrado.' });
        }
        res.status(200).json(updatedProject);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar projeto.' });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await projectService.deleteProject(Number(id));
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao deletar projeto.' });
    }
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=projectController.js.map