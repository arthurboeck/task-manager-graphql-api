/**
 * @param {import("../../../../")} knex
 */
export async function seed(knex) {
  await knex("task").del();
  await knex("task").insert(tasks);
};

const tasks = [
  { id: 1, nome: "Lavar louça", descricao: "lavar a louca em casa", responsavel: "boeckarthur", status: "PENDENTE", dataCriacao: knex.fn.now() },
  { id: 2, nome: "Recolher as roupas", descricao: "recolher as roupas antes da chuva", responsavel: "arthur_guterres", status: "CONCLUIDO", dataCriacao: knex.fn.now(), dataConclusao: knex.fn.now() },
  { id: 3, nome: "Lavar as roupas", descricao: "lavar as roupas", responsavel: "arthur_guterres", status: "CANCELADO", dataCriacao: knex.fn.now(), dataConclusao: knex.fn.now() },
];