import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

export async function mealsRoutes(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnDiet: z.boolean(),
      date: z.coerce.date(),
    });

    const { name, description, isOnDiet, date } = createMealBodySchema.parse(
      req.body,
    );

    await knex("meals").insert({
      id: randomUUID(),
      name,
      description,
      is_on_diet: isOnDiet,
      date: date.getTime(),
      user_id: req.user?.id,
    });

    return res.status(201).send("Refeição criada com sucesso!");
  });
}
