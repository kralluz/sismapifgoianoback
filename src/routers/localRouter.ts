import { Router } from "express";
import { listLocais } from "../services/localService";

const router = Router();

router.get('/',
  // #swagger.tags = ['Locais']
  // #swagger.summary = 'Catálogo fixo de locais (salas, laboratórios, tendas, áreas)'
  (req, res) => {
    res.status(200).json(listLocais());
  });

export default router;
