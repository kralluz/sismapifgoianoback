-- Salas passam a ser fixas no código (catálogo de locais); o projeto
-- referencia o local por id textual. Remove o cadastro de salas.
-- Se já existirem projetos, o ADD COLUMN NOT NULL abaixo falha de propósito:
-- os projetos antigos apontam para salas que deixam de existir e precisam
-- ser migrados à mão.

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_roomId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "roomId",
ADD COLUMN "localId" TEXT NOT NULL,
ADD COLUMN "complemento" TEXT;

-- DropTable
DROP TABLE "Room";

-- CreateIndex
CREATE UNIQUE INDEX "Project_number_key" ON "Project"("number");

-- CreateIndex
CREATE INDEX "Project_localId_idx" ON "Project"("localId");
