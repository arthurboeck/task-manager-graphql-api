# Gerenciador de Tarefas GraphQL API

Aplicação desenvolvida para a disciplina de Node.JS na Especialização em Arquitetura de Software Distribuído - PUCMG.

A `task-manager-graphql-api` é uma aplicação Node.js construída com GraphQL e ApolloServer para gerenciar informações sobre tarefas e usuários. Essa API permite criar, visualizar, atualizar e deletar tarefas.

## Dependencias

- [Node](https://nodejs.org/en/docs/)
- [Npm](https://docs.npmjs.com/)
- [GraphQL](https://graphql.org/learn/)
- [GraphQL Scalars](https://the-guild.dev/graphql/scalars/docs/quick-start)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Knex](https://knexjs.org/guide/)
- [SQLite](https://github.com/TryGhost/node-sqlite3)
- [ESLint](https://eslint.org/docs/latest/use/getting-started)

## Como executar a aplicação

Caso voce esteja executando o projeto pela primeira vez, será necessário executar aas migrations e seeds do projeto, tal processo pode ser startado e executado com base nos seguintes comandos:

Passo 1: Install de dependencias:

```shell
npm install --legacy-peer-deps
```

Passo 2: Start do projeto:

```shell
npm run start:migrations
```

Caso voce já tenha executado as migrations e seeds do projeto, o mesmo pode ser startado e executado com base nos seguintes comandos:

Passo 1: Install de dependencias:

```shell
npm install --legacy-peer-deps
```

Passo 2: Start do projeto:

```shell
npm start
```

Após isso o projeto estará rodando na porta 8080, podendo ser acessado em [http://localhost:8080](http://localhost:8080).

## Estrutura do projeto

Os pacotes do projeto se distribuem da seguinte forma:

- `database`: contém as configurações de conexão com o banco de dados, migrations e seeds do projeto.
  - `database/migrations`: contém as migrations do projeto.
  - `database/seeds`: contém as seeds do projeto.
- `src`: contém o código fonte da aplicação.
  - `src/controllers`: contém os controllers da aplicação.
  - `src/enum`: contém os enums da aplicação.
  - `src/infra/error`: contém as classes de erros da aplicação e seu respectivo error handler.
  - `src/repository`: contém as repositories, responsaveis pela comunicacao direta com o banco de dados.
  - `src/service`: contém as services, responsaveis pela regra de negocio da aplicacao.
    - `validators`: responsaveis pela validacao dos dados de entrada de cada dominio.

## Funcionalidade disponibilizadas

A API possui as seguintes funcionalidades disponibilizadas, e seus respectivos payloads:

### Usuários

Possibilita o cadastro, atualiçao e listagem de usuários.

#### Cadastrar usuário

```graphql
mutation CreateUser {
  createUser(nome: "Arthur", usuario: "arthur_boeck", senha: "123456") {
    id
    nome
    usuario
    dataCriacao
  }
}
```

#### Atualizar usuário

```graphql
mutation CreateUser {
  updateUser(id: 1, nome: "Arthur", usuario: "arthur_boeck", senha: "123456") {
    id
    nome
    usuario
    dataCriacao
  }
}
```

#### Listar usuários

```graphql
query Users {
  users {
    id
    nome
    usuario
    dataCriacao
  }
}
```

#### Listar usuário por usuario/username

```graphql
query User {
  user(usuario: "arthur_guterres") {
    id
    nome
    usuario
    dataCriacao
  }
}
```

### Tarefas

Possibilita o cadastro, atualização e listagem de tarefas e o historico de alteraçao das respectivas tarefas.

#### Cadastrar tarefa

```graphql
mutation CreateTask {
  createTask(
    nome: "Lavar roupa"
    descricao: "Lavar as roupas de cama"
    responsavel: "arthur_guterres"
  ) {
    id
    nome
    descricao
    responsavel
    status
    dataCriacao
    dataConclusao
    historico {
      id
      idTask
      descricao
      usuario
      data
    }
  }
}
```

#### Atualizar tarefa

```graphql
mutation UpdateTask {
  updateTask(
    id: 1
    nome: "Lavar roupa"
    descricao: "Lavar as roupas de cama"
    status: "CANCELADO"
    responsavel: "arthur_guterres"
  ) {
    id
    nome
    descricao
    responsavel
    status
    dataCriacao
    dataConclusao
    historico {
      id
      idTask
      descricao
      usuario
      data
    }
  }
}
```

#### Concluir tarefa

```graphql
mutation CompleteTask {
  completeTask(id: 1, usuario: "arthur_guterres") {
    id
    nome
    descricao
    responsavel
    status
    dataCriacao
    dataConclusao
    historico {
      id
      idTask
      descricao
      usuario
      data
    }
  }
}
```

#### Deletar tarefa

```graphql
mutation DeleteTask {
  deleteTask(id: 1)
}
```

#### Listar tarefas

```graphql
query Tasks {
  tasks {
    id
    nome
    descricao
    responsavel
    status
    dataCriacao
    dataConclusao
    historico {
      id
      idTask
      descricao
      usuario
      data
    }
  }
}
```

#### Listar tarefa por id

```graphql
query Task {
  task(id: 1) {
    id
    nome
    descricao
    responsavel
    status
    dataCriacao
    dataConclusao
    historico {
      id
      idTask
      descricao
      usuario
      data
    }
  }
}
```

### Tarefas Historico

Possibilita a visualização do historico de alteraçao das respectivas tarefas.

#### Listar historicos de tarefas

```graphql
query TaskHistories {
  taskHistories {
    id
    idTask
    descricao
    usuario
    data
  }
}
```

#### Listar historicos por id tarefas

```graphql
query TaskHistory {
  taskHistory(idTask: 1) {
    id
    idTask
    descricao
    usuario
    data
  }
}
```

## Deploy

Este compononente utiliza o [render](https://render.com/) para deploy. O deploy é realizado automaticamente a cada commit na branch master.

A aplicação e seu explorer podem ser acessados em [https://task-manager-graphql-api.onrender.com](https://task-manager-graphql-api.onrender.com).
