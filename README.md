<h1 align="center">
  Aplicação Backend desenvolvida durante a Trilha NodeJS no evento NLW Expert da Rocketseat em 2024.
</h1>

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

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

## 💻 Tecnologias utilizadas

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
