#!/bin/sh

echo "🔄 Iniciando aplicação..."

# Verificar se DATABASE_URL está definida
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL não está definida"
  exit 1
fi

echo "🔍 Verificando status das migrations..."
npx prisma migrate status

echo "🚀 Executando migrations..."
npx prisma migrate deploy

if [ $? -eq 0 ]; then
  echo "✅ Migrations executadas com sucesso"
else
  echo "❌ Erro ao executar migrations"
  exit 1
fi

# Popula os trabalhos da feira 2026 se o banco estiver vazio (SEED_FEIRA=0 desliga)
if [ "$SEED_FEIRA" != "0" ]; then
  node prisma/seed/seed-feira-2026.js --se-vazio || echo "⚠️  Seed da feira falhou; seguindo sem ele"
fi

echo "🎯 Iniciando servidor..."
exec node dist/server.js
