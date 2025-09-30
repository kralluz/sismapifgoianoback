# Orientações para Criar uma Sala (Room) com Caminho e Pontos do Mapa

## Visão Geral
Para criar uma nova sala no sistema, você precisa fazer uma requisição POST para o endpoint `/api/room`. A sala pode incluir um caminho (path) definido por pontos no mapa, representados como coordenadas [x, y].

## Pré-requisitos
- Você deve estar autenticado como administrador no sistema.
- Obtenha um token JWT através do endpoint de login (`POST /auth/login`).

## Endpoint
```
POST /api/room
```

## Headers Necessários
```
Authorization: Bearer <seu_token_jwt>
Content-Type: application/json
```

## Corpo da Requisição (JSON)
Todos os campos são obrigatórios, exceto `path` e `projects` que são opcionais.

```json
{
  "name": "Nome da Sala",
  "x": 10,
  "y": 20,
  "description": "Descrição da sala",
  "capacity": 10,
  "type": "Tipo da sala (ex: meeting, conference)",
  "floor": 1,
  "building": "Nome do prédio",
  "amenities": ["projetor", "quadro branco"],
  "path": [
    [10, 10],
    [20, 15],
    [30, 25]
  ]
}
```

### Campos Detalhados
- **name**: String (2-100 caracteres) - Nome da sala
- **x**: Número - Coordenada X da posição da sala no mapa (pode ser negativo)
- **y**: Número - Coordenada Y da posição da sala no mapa (pode ser negativo)
- **description**: String (máximo 500 caracteres) - Descrição da sala
- **capacity**: Número inteiro (>= 1) - Capacidade máxima de pessoas
- **type**: String (máximo 50 caracteres) - Tipo da sala (ex: "meeting", "conference")
- **floor**: Número inteiro (>= 0) - Andar onde a sala está localizada
- **building**: String (máximo 100 caracteres) - Nome do prédio
- **amenities**: Array de strings - Comodidades disponíveis na sala
- **path**: Array de arrays de números (opcional) - Caminho definido por pontos [x, y] no mapa
- **projects**: Array de números inteiros (opcional) - IDs dos projetos associados

## Exemplo de Caminho (Path)
O campo `path` representa um caminho no mapa, composto por uma sequência de pontos. Cada ponto é um array com duas coordenadas [x, y].

Exemplo de um caminho simples:
```json
"path": [
  [0, 0],     // Ponto inicial
  [10, 5],    // Ponto intermediário
  [20, 10]    // Ponto final
]
```

## Respostas da API
- **201 Created**: Sala criada com sucesso. Retorna os dados da sala criada.
- **400 Bad Request**: Erro nos dados enviados (validação falhou).
- **401 Unauthorized**: Token inválido ou ausente.
- **403 Forbidden**: Usuário não tem permissões de administrador.

## Exemplo de Requisição Completa (usando curl)
```bash
curl -X POST http://localhost:3000/api/room \
  -H "Authorization: Bearer seu_token_aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sala de Reuniões A",
    "x": 10,
    "y": 20,
    "description": "Sala para reuniões pequenas",
    "capacity": 10,
    "type": "meeting",
    "floor": 1,
    "building": "Prédio Principal",
    "amenities": ["projetor", "quadro branco"],
    "path": [[10, 10], [20, 15], [30, 25]]
  }'
```

## Notas Importantes
- O campo `path` é opcional, mas se incluído, deve ser um array válido de pontos [x, y].
- Certifique-se de que o token JWT é válido e que você tem permissões de administrador.
- As coordenadas x e y podem ser números positivos ou negativos, dependendo do sistema de coordenadas do mapa.
- O servidor está rodando em `http://localhost:3000` por padrão.</content>
<filePath">c:\Users\chenr\Documents\sismapifgoianoback\ORIENTACOES_CRIAR_ROOM.md