import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function mealsRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const createMealBody = z.object({
      name: z.string(),
      description: z.string(),
      isOnDiet: z.boolean(),
      date: z.coerce.date(),
    });

    const { name, description, isOnDiet, date } = createMealBody.parse(
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

  app.get("/", { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const meals = await knex("meals")
      .where({ user_id: req.user?.id })
      .orderBy("date", "desc");

    if (meals.length === 0) {
      return res.status(404).send({ error: "Nenhuma refeição encontrada!" });
    }

    return res.status(200).send({
      meals,
    });
  });

  app.get(
    "/:mealId",
    { preHandler: [checkSessionIdExists] },
    async (req, res) => {
      const getMealParams = z.object({
        mealId: z.string().uuid(),
      });

      const { mealId } = getMealParams.parse(req.params);

      const meal = await knex("meals").where({ id: mealId }).first();

      if (!meal) {
        return res.status(404).send({ error: "Refeição não encontrada!" });
      }

      return res.status(200).send({ meal });
    },
  );

  app.put(
    "/:mealId",
    { preHandler: [checkSessionIdExists] },
    async (req, res) => {
      const getMealParams = z.object({
        mealId: z.string().uuid(),
      });

      const { mealId } = getMealParams.parse(req.params);

      const updateMealBody = z.object({
        name: z.string(),
        description: z.string(),
        isOnDiet: z.boolean(),
        date: z.coerce.date(),
      });

      const { name, description, isOnDiet, date } = updateMealBody.parse(
        req.body,
      );

      const meal = await knex("meals").where({ id: mealId }).first();

      if (!meal) {
        return res.status(404).send({ error: "Refeição não encontrada!" });
      }

      await knex("meals").where({ id: mealId }).update({
        name,
        description,
        is_on_diet: isOnDiet,
        date: date.getTime(),
      });

      return res
        .status(200)
        .send({ message: "Refeição atualizada com sucesso!", meal });
    },
  );

  app.delete(
    "/:mealId",
    { preHandler: [checkSessionIdExists] },
    async (req, res) => {
      const getMealParams = z.object({
        mealId: z.string().uuid(),
      });

      const { mealId } = getMealParams.parse(req.params);

      const meal = await knex("meals").where({ id: mealId }).first();

      if (!meal) {
        return res.status(404).send({ error: "Refeição não encontrada!" });
      }

      await knex("meals").where({ id: mealId }).delete();
      return res
        .status(200)
        .send({ message: "Refeição excluída com sucesso!" });
    },
  );

  app.get(
    "/metrics",
    { preHandler: [checkSessionIdExists] },
    async (req, res) => {
      const metricsOnDiet = await knex("meals")
        .where({
          user_id: req.user?.id,
          is_on_diet: true,
        })
        .count("id", { as: "total" })
        .first();

      const metricsOffDiet = await knex("meals")
        .where({ user_id: req.user?.id, is_on_diet: false })
        .count("id", { as: "total" })
        .first();

      const totalMeals = await knex("meals")
        .where({ user_id: req.user?.id })
        .orderBy("date", "desc");

      const { bestOnDietSequence } = totalMeals.reduce(
        (acc, meal) => {
          if (meal.is_on_diet) {
            acc.currentSequence += 1;
          } else {
            acc.currentSequence = 0;
          }

          if (acc.currentSequence > acc.bestOnDietSequence) {
            acc.bestOnDietSequence = acc.currentSequence;
          }

          return acc;
        },
        { bestOnDietSequence: 0, currentSequence: 0 },
      );

      return res.send({
        "Total de refeições": totalMeals.length.toString(),
        "Total de refeições na dieta": metricsOnDiet?.total.toString(),
        "Total de refeições fora da dieta": metricsOffDiet?.total.toString(),
        "Melhor sequência na dieta": bestOnDietSequence.toString(),
      });
    },
  );
}
