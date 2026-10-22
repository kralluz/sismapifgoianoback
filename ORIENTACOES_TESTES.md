# Orientações de testes

Este documento descreve os testes disponíveis, as ferramentas utilizadas e os comandos para executar os testes e gerar o relatório de cobertura.

## Estrutura dos testes

```text
tests/
├── setup.ts
├── helpers/
│   ├── app.ts
│   ├── auth.ts
│   └── database.ts
├── unit/
│   ├── schemas/
│   │   ├── projectSchema.test.ts
│   │   └── roomSchema.test.ts
│   ├── services/
│   │   ├── jwtService.test.ts
│   │   ├── projectService.test.ts
│   │   ├── roomService.test.ts
│   │   ├── tokenService.test.ts
│   │   └── userService.test.ts
│   └── middlewares/
│       └── authMiddleware.test.ts
└── integration/
    ├── auth.test.ts
    ├── health.test.ts
    ├── projects.test.ts
    └── rooms.test.ts
```

Os arquivos `setup.ts`, os helpers e alguns arquivos de testes reservados para módulos que não existem na versão atual podem permanecer sem testes implementados. Arquivos com suítes `skip` são ignorados pelo Vitest e não contribuem para a cobertura.

## Testes unitários

Os testes unitários verificam unidades isoladas e simulam dependências externas, como o Prisma Client.

### Schemas

#### `projectSchema.test.ts`

Arquivo: `tests/unit/schemas/projectSchema.test.ts`

Verifica:

- aceitação de um projeto válido;
- rejeição de `localId` inexistente no catálogo;
- rejeição de título menor que dois caracteres;
- rejeição de número menor que um.

O schema atual utiliza `localId`, pois o projeto trabalha com um catálogo fixo de locais.

#### `roomSchema.test.ts`

Arquivo: `tests/unit/schemas/roomSchema.test.ts`

A suíte está marcada como ignorada porque `src/schema/roomSchema.ts` não existe na implementação atual. O domínio antigo de salas foi substituído pelo catálogo de locais disponibilizado em `/api/locais`.

### Serviços

#### `jwtService.test.ts`

Arquivo: `tests/unit/services/jwtService.test.ts`

Verifica:

- validação de token JWT válido;
- rejeição de token expirado;
- rejeição de token inválido.

#### `tokenService.test.ts`

Arquivo: `tests/unit/services/tokenService.test.ts`

Verifica:

- geração de token com os dados do usuário;
- presença dos campos esperados no payload;
- expiração configurada para quinze dias.

#### `userService.test.ts`

Arquivo: `tests/unit/services/userService.test.ts`

Verifica:

- contagem de usuários;
- criação de usuário;
- armazenamento da senha com hash;
- busca de usuário por e-mail;
- validação de senha correta;
- rejeição de senha incorreta.

O Prisma Client é simulado para manter o teste unitário isolado e evitar acesso ao banco.

#### `projectService.test.ts`

Arquivo: `tests/unit/services/projectService.test.ts`

A suíte está marcada como ignorada porque o arquivo de serviço correspondente não estava disponível na estrutura considerada para os testes unitários.

#### `roomService.test.ts`

Arquivo: `tests/unit/services/roomService.test.ts`

A suíte está marcada como ignorada porque `src/services/roomService.ts` não existe na implementação atual.

### Middleware

#### `authMiddleware.test.ts`

Arquivo: `tests/unit/middlewares/authMiddleware.test.ts`

Verifica:

- autorização de usuário com token válido;
- rejeição de requisição sem token;
- rejeição de token inválido;
- autorização de administrador pelo `requireAdmin`;
- rejeição de usuário comum pelo `requireAdmin`.

## Testes de integração HTTP

Os testes de integração executam a aplicação Express e fazem requisições HTTP com Supertest. Os serviços que acessariam o banco são simulados nos testes de autenticação e projetos, portanto esses testes não substituem testes contra um PostgreSQL real.

### Health check

#### `health.test.ts`

Arquivo: `tests/integration/health.test.ts`

Verifica:

- `GET /health` retorna HTTP `200`;
- resposta contém `status`;
- resposta contém `timestamp`;
- resposta contém `uptime`.

### Autenticação

#### `auth.test.ts`

Arquivo: `tests/integration/auth.test.ts`

Verifica:

- criação do primeiro administrador;
- registro posterior autorizado por administrador;
- tentativa não autorizada de registrar papel de administrador;
- rejeição de e-mail inválido;
- rejeição de senha ausente;
- rejeição de e-mail duplicado;
- login com credenciais válidas;
- rejeição de senha incorreta;
- rejeição de e-mail inexistente;
- rejeição de payload de login inválido;
- retorno de token no login válido;
- ausência da senha na resposta HTTP.

O serviço de usuários é simulado com `vi.mock`, evitando dependência de banco real.

### Locais

#### `rooms.test.ts`

Arquivo: `tests/integration/rooms.test.ts`

Como a API atual não possui mais a rota `/api/room`, os testes verificam o catálogo atual:

- `GET /api/locais` retorna HTTP `200`;
- resposta é uma lista;
- itens possuem `id`, `nome` e `tipo`;
- a antiga rota `/api/room` não está disponível.

Os testes antigos de criação, alteração e exclusão de salas não são aplicáveis ao código atual.

### Projetos

#### `projects.test.ts`

Arquivo: `tests/integration/projects.test.ts`

Verifica:

- criação autorizada de projeto;
- argumentos enviados ao serviço;
- rejeição de criação sem token;
- rejeição de usuário sem permissão de administrador;
- rejeição de token malformado;
- rejeição de token expirado;
- rejeição de local inexistente;
- rejeição de número inválido;
- rejeição de título inválido;
- resposta `409` para número duplicado;
- tratamento de falha de banco na criação;
- listagem de projetos;
- tratamento de falha de banco na listagem;
- retorno `404` para projeto inexistente;
- tratamento de ID inválido;
- retorno do projeto com local relacionado;
- atualização do título;
- mudança de local;
- rejeição de atualização por usuário sem autorização;
- tratamento de falha de banco na atualização;
- exclusão autorizada;
- rejeição de exclusão por usuário sem autorização;
- tratamento de falha de banco na exclusão.

O serviço de projetos é simulado. Esses testes validam o fluxo HTTP, os middlewares, os controladores e o tratamento das respostas, mas não validam persistência real, migrations ou constraints reais do PostgreSQL.

## Pacotes utilizados

### Vitest

Responsável por:

- executar testes;
- organizar suítes com `describe`, `it` e `expect`;
- criar mocks com `vi.mock` e `vi.fn`;
- executar testes em modo watch;
- coletar cobertura.

### `@vitest/coverage-v8`

Fornece a coleta de cobertura baseada no mecanismo V8 do Node.js.

O projeto está configurado para gerar relatórios em formato texto, HTML, LCOV e JSON.

### Supertest

Executa requisições HTTP contra a aplicação Express sem precisar iniciar o servidor em uma porta externa.

### `@types/supertest`

Fornece os tipos TypeScript para o Supertest.

### `jsonwebtoken`

É usado pelos testes para criar e validar tokens JWT nos fluxos de autenticação.

### `bcrypt`

É usado nos testes do `userService` para verificar hashing e comparação de senhas.

### `@prisma/client`

É utilizado pelo código de produção. Nos testes unitários do usuário e nos testes de integração de projetos, o acesso ao Prisma é simulado para evitar operação em banco real.

### `zod`

É usado pelos schemas e pelos controladores para validação de dados de entrada.

## Scripts disponíveis

Os scripts estão definidos no `package.json`:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:unit": "vitest run tests/unit",
  "test:integration": "vitest run tests/integration"
}
```

## Como instalar as dependências

Na raiz do projeto:

```bash
npm install
```

Para instalação reproduzível, quando houver um `package-lock.json` atualizado:

```bash
npm ci
```

## Como executar todos os testes

```bash
npm test
```

Ou diretamente:

```bash
npx vitest run
```

## Como executar somente os testes unitários

```bash
npm run test:unit
```

Esse comando executa os arquivos em:

```text
tests/unit/
```

## Como executar somente os testes de integração

```bash
npm run test:integration
```

Esse comando executa os arquivos em:

```text
tests/integration/
```

Os testes atuais usam mocks para serviços que acessam o banco. Portanto, não é necessário iniciar um PostgreSQL para executar esse conjunto atual de testes.

## Como executar em modo de observação

```bash
npm run test:watch
```

O Vitest permanecerá observando alterações nos arquivos e executará novamente os testes afetados.

## Como gerar a cobertura

```bash
npm run test:coverage
```

O comando executa os testes e coleta cobertura usando V8.

Os relatórios são gerados em:

```text
coverage/
├── index.html
├── lcov.info
├── coverage-final.json
└── reports/
```

Para abrir o relatório HTML:

```bash
xdg-open coverage/index.html
```

Em ambientes sem `xdg-open`, abra manualmente o arquivo `coverage/index.html` no navegador.

## Limites de cobertura

O arquivo `vitest.config.ts` define o mínimo de 80% para:

- linhas (`lines`);
- funções (`functions`);
- statements (`statements`);
- branches (`branches`).

Se qualquer uma dessas métricas ficar abaixo de 80%, o comando de cobertura deve terminar com falha.

Os limites configurados não significam que a cobertura já foi atingida. O resultado real deve ser confirmado executando:

```bash
npm run test:coverage
```

## Avisos e limitações atuais

### `JWT_SECRET`

Quando `JWT_SECRET` não está definido, o serviço JWT gera um segredo aleatório por processo e emite um aviso. Para executar os testes com um segredo explícito:

```bash
JWT_SECRET=test-secret npm run test
```

Em PowerShell:

```powershell
$env:JWT_SECRET="test-secret"; npm test
```

Use valores de teste apenas no ambiente de testes. Nunca coloque segredos reais nos arquivos de teste ou na documentação.

### Cobertura de banco

Os testes atuais não executam operações em banco real. Mocks são usados para validar controladores, middlewares e tratamentos de erro sem alterar dados persistidos.

Por isso, os testes não comprovam:

- migrations;
- constraints reais;
- persistência no PostgreSQL;
- consultas reais do Prisma;
- transações;
- comportamento do banco indisponível em ambiente real.

Esses cenários exigiriam uma suíte adicional com um PostgreSQL isolado, por exemplo em container exclusivo para testes.

### Arquivos ignorados

Testes com `describe.skip` não são executados e não aumentam a cobertura. Eles representam módulos antigos ou ainda não disponíveis na implementação atual e devem ser revisados quando esses módulos forem restaurados ou substituídos.

