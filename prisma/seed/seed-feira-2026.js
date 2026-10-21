// Popula os trabalhos da XXVII Feira de Ciência e Tecnologia (2026)
// a partir da legenda oficial do mapa. Idempotente: atualiza pelo número
// (ou pelo título, nos itens sem número) e cria o que faltar.
//
//   DATABASE_URL=... node prisma/seed/seed-feira-2026.js
const { PrismaClient } = require("@prisma/client");
const trabalhos = require("./trabalhos-feira-2026.json");
const locais = require("../../src/data/locais.json");

const prisma = new PrismaClient();
const ids = new Set(locais.map((l) => l.id));

const main = async () => {
  const invalidos = trabalhos.filter((t) => !ids.has(t.localId));
  if (invalidos.length) {
    throw new Error(`Locais fora do catálogo: ${invalidos.map((t) => `#${t.number} ${t.localId}`).join(", ")}`);
  }

  let criados = 0;
  let atualizados = 0;
  for (const t of trabalhos) {
    const data = { number: t.number, title: t.title, localId: t.localId, complemento: t.complemento };
    const existente = t.number != null
      ? await prisma.project.findUnique({ where: { number: t.number } })
      : await prisma.project.findFirst({ where: { number: null, title: t.title } });
    if (existente) {
      await prisma.project.update({ where: { id: existente.id }, data });
      atualizados++;
    } else {
      await prisma.project.create({ data });
      criados++;
    }
  }
  console.log(`${trabalhos.length} trabalhos: ${criados} criados, ${atualizados} atualizados`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
