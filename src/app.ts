import express from 'express';
import authRouter from './routers/authRouter';

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});