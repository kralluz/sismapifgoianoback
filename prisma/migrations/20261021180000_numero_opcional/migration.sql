-- Itens da feira sem número (estandes, atividades) passam a ser aceitos
ALTER TABLE "Project" ALTER COLUMN "number" DROP NOT NULL;
