import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";

export async function checkSessionIdExists(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return rep.status(401).send({
      error: "Não autorizado!",
    });
  }

  const user = await knex("users")
    .where({
      session_id: sessionId,
    })
    .first();

  if (!user) {
    return rep.status(401).send({
      error: "Não autorizado!",
    });
  }

  req.user = user;
}
