<h1 align="center">
  Aplicação back-end desenvolvida durante a formação Node.JS na plataforma da <a href="https://app.rocketseat.com.br/home">Rocketseat</a>.
</h1>

<p align="center">
  <a href="LICENSE"><img  src="https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge" alt="License"></a>
</p>

---

## 📁 Sobre o projeto

Esta é uma API desenvolvida para completar o desafio 02 do módulo criando APIs RESTfull com Node.js da formação Node.Js na plataforma da Rocketseat o qual estou participando.
A aplicação consiste em um sistema de controle para dietas diárias no qual o usuário se cadastra com nome e email e pode iniciar o acompanhamento de suas dietas no dia a dia
cadastrando as refeições feitas.

---

## 📝 Regras da aplicação

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  > *As refeições devem ser relacionadas a um usuário.*
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível recuperar as métricas de um usuário
  - [x] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [x] Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

---

## ✅ Requisitos

- Node.js versão 20 ou superior.

---

## 💻 Tecnologias

- Fastify
- Zod
- Typescript
- SQLite
- ESLint
- Dotenv
- Knex
- Tsx
- @fastify/cookie
- @rocketseat/eslint-config
- @types/node

---

## 💡 Utilização

1. Clone o projeto:

```
$ git clone https://github.com/JaasielAntunes/daily-diet-api-challenge.git
```

2. Acesse a pasta do projeto:

```
$ cd daily-diet-api-challenge
```

3. Instale as dependências:

```
$ npm install
```

4. Execute:

```
$ npm run knex -- migrate:latest
```

5. Inicie o servidor:

```
$ npm run dev
```

---

## 💻 Rotas HTTP

### POST `/users`

Cadastrar usuário

#### Corpo da requisição

```json
{
    "name": "José",
    "email": "jose@gmail.com"
}
```

### POST `/meals`

Cadastrar refeição

#### Corpo da requisição

```json
{
  "name": "Café da Manhã",
  "description": "Cuscuz, Iame e Frango Grelhado",
  "isOnDiet": true,
  "date": 20022024
}
```

### PUT `/meals/:mealId`

Atualizar uma refeição

#### Corpo da requisição

```json
{
  "name": "Almoço",
  "description": "Batata doce, ovo cozido e salada",
  "isOnDiet": true,
  "date": 20022024
}
```

### GET `/users`

Retorna todas os usuários cadastrados.

### GET `/meals`

Retorna todas as refeições cadastradas.

### GET `/meals/metrics`

Retorna as métricas da dieta realizada.

### GET `/users/:userId`

Retorna um usuário específico.

### GET `/users/:mealId`

Retorna uma refeição específica.

### DELETE `/users/:mealId`

Deleta uma refeição específica.

---

## ✅ Sugestão

- Utilize o Postman ou Insomnia para testar as requisições.

---

<h4 align="center">
  Feito com ❤️ by Jaasiel Antunes - <a href="mailto:contato.jaasiel@gmail.com.com">Entre em contato!</a>
</h4>

<p align="center">
  <a href="https://www.linkedin.com/in/jaasiel-antunes-1517b41bb/">
    <img alt="Jaasiel Antunes" src="https://img.shields.io/badge/LinkedIn-Jaasiel-0e76a8?style=flat&logoColor=white&logo=linkedin">
  </a>
</p>
