/**
 * @param {import("../../../../")} knex
 */
export async function seed(knex) {
  await knex("task_history").del();
  await knex("task_history").insert(taskHistory);
};

const data = new Date();

const taskHistory = [
  { id: 1, idTask: 1, descricao: "TAREFA CRIADA", usuario: "boeckarthur", data: data.toISOString() },

  { id: 2, idTask: 2, descricao: "TAREFA CRIADA", usuario: "arthur_guterres", data: data.toISOString() },
  { id: 3, idTask: 2, descricao: "TAREFA CONCLUIDA", usuario: "arthur_guterres", data: data.toISOString() },

  { id: 4, idTask: 3, descricao: "TAREFA CRIADA", usuario: "arthur_guterres", data: data.toISOString() },
  { id: 5, idTask: 3, descricao: "TAREFA CANCELADA", usuario: "arthur_guterres", data: data.toISOString() },
]