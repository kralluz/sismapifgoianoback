import { Router } from "express";
import * as c from "../controllers/projectController";

const router = Router();

router.post('/', c.createProject);
router.get('/', c.getAllProjects);
router.get('/:id', c.findProjectById);
router.put('/:id', c.updateProject);
router.delete('/:id', c.deleteProject);


export default router;