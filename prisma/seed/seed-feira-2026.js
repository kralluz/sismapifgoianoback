// Popula os trabalhos da XXVII Feira de Ciência e Tecnologia (2026)
// a partir da legenda oficial do mapa. Idempotente: atualiza pelo número
// (ou pelo título, nos itens sem número) e cria o que faltar.
//
//   DATABASE_URL=... node prisma/seed/seed-feira-2026.js
//   node prisma/seed/seed-feira-2026.js --se-vazio   (só se não houver trabalhos;
//   é o que o docker-entrypoint roda a cada inicialização)
const { PrismaClient } = require("@prisma/client");
const trabalhos = require("./trabalhos-feira-2026.json");

// No container só existe o build (dist/); em dev, o código-fonte (src/)
const carregarLocais = () => {
  for (const p of ["../../src/data/locais.json", "../../dist/data/locais.json"]) {
    try {
      return require(p);
    } catch {
      // tenta o próximo caminho
    }
  }
  throw new Error("Catálogo de locais (locais.json) não encontrado.");
};
const locais = carregarLocais();

const prisma = new PrismaClient();
const ids = new Set(locais.map((l) => l.id));

const main = async () => {
  if (process.argv.includes("--se-vazio") && (await prisma.project.count()) > 0) {
    console.log("Seed da feira ignorado: já existem trabalhos cadastrados.");
    return;
  }
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
