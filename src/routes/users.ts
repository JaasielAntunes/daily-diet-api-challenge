import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    });

    let sessionId = req.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      res.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }

    const { name, email } = createUserBodySchema.parse(req.body);

    const userEmail = await knex("users").where({ email }).first();

    if (userEmail) {
      return res.status(400).send({ error: "Este email já existe!" });
    }

    await knex("users").insert({
      id: randomUUID(),
      name,
      email,
      session_id: sessionId,
    });

    return res.status(201).send("Usuário cadastrado com sucesso!");
  });

  app.get("/", { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const users = await knex("users").select();

    if (users.length === 0) {
      return res.status(404).send({ error: "Nenhum usuário encontrado!" });
    }

    return res.status(200).send({ users });
  });

  app.get("/:id", { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUserParamsSchema.parse(req.params);

    const user = await knex("users").where({ id }).first();
    return res.status(200).send({ user });
  });
}
