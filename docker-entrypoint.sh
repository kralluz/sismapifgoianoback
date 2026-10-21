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

echo "🎯 Iniciando servidor..."
exec node dist/server.js
