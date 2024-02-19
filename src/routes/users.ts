import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
    });

    const { name, email } = createUserBodySchema.parse(req.body);

    await knex("users").insert({
      id: randomUUID(),
      name,
      email,
    });

    return res.status(201).send("Usuário cadastrado com sucesso!");
  });

  app.get("/", async (req, res) => {
    const users = await knex("users").select();
    return res.status(200).send({ users });
  });

  app.get("/:id", async (req, res) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUserParamsSchema.parse(req.params);

    const user = await knex("users").where({ id }).first();
    return res.status(200).send({ user });
  });
}
