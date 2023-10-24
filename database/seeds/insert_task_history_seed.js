/**
 * @param {import("../../../../")} knex
 */
export async function seed(knex) {
  await knex("task_history").del();
  await knex("task_history").insert(taskHistory);
};

const taskHistory = [
  { id: 1, idTask: 1, descricao: "TAREFA CRIADA", usuario: "boeckarthur", data: knex.fn.now() },

  { id: 2, idTask: 2, descricao: "TAREFA CRIADA", usuario: "arthur_guterres", data: knex.fn.now() },
  { id: 3, idTask: 2, descricao: "TAREFA CONCLUIDA", usuario: "arthur_guterres", data: knex.fn.now() },

  { id: 4, idTask: 3, descricao: "TAREFA CRIADA", usuario: "arthur_guterres", data: knex.fn.now() },
  { id: 5, idTask: 3, descricao: "TAREFA CANCELADA", usuario: "arthur_guterres", data: knex.fn.now() },
]