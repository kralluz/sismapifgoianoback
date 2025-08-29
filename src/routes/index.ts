import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('API Express + TypeScript');
});

export default router;