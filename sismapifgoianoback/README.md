# sismapifgoianoback

Este projeto é uma aplicação web construída com TypeScript e Express. Abaixo estão as informações sobre a estrutura do projeto e suas funcionalidades.

## Estrutura do Projeto

```
sismapifgoianoback
├── src
│   ├── app.ts                # Ponto de entrada da aplicação
│   ├── controllers           # Contém os controladores da aplicação
│   │   └── index.ts          # Controlador principal
│   ├── routes                # Define as rotas da aplicação
│   │   └── index.ts          # Configuração das rotas
│   └── types                 # Tipos personalizados
│       └── index.ts          # Interfaces para Request e Response
├── package.json              # Configuração do npm e dependências
├── tsconfig.json             # Configuração do TypeScript
└── README.md                 # Documentação do projeto
```

## Funcionalidades

- **src/app.ts**: Este arquivo cria uma instância do aplicativo Express, configura middleware e define as rotas.
- **src/controllers/index.ts**: Contém a classe `IndexController` com o método `getIndex` que lida com a rota raiz.
- **src/routes/index.ts**: Exporta a função `setRoutes` que configura as rotas da aplicação utilizando o `IndexController`.
- **src/types/index.ts**: Define interfaces `Request` e `Response` que estendem as interfaces da biblioteca Express.
- **tsconfig.json**: Configurações do compilador TypeScript, especificando opções e arquivos a serem incluídos.
- **package.json**: Lista as dependências do projeto e scripts para facilitar o desenvolvimento.

## Como Executar o Projeto

1. Clone o repositório:
   ```
   git clone <url-do-repositorio>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd sismapifgoianoback
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Compile o TypeScript:
   ```
   npm run build
   ```
5. Inicie a aplicação:
   ```
   npm start
   ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.