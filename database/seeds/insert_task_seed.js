/**
 * @param {import("../../../../")} knex
 */

export async function seed(knex) {
    await knex('task').del();
    await knex('task').insert(tasks);
}

const data = new Date();

const tasks = [
    {id: 1, nome: 'Lavar louça', descricao: 'lavar a louca em casa', responsavel: 'boeckarthur', status: 'PENDENTE', dataCriacao: data.toISOString()},
    {id: 2, nome: 'Recolher as roupas', descricao: 'recolher as roupas antes da chuva', responsavel: 'arthur_guterres', status: 'CONCLUIDO', dataCriacao: data.toISOString(), dataConclusao: data.toISOString()},
    {id: 3, nome: 'Lavar as roupas', descricao: 'lavar as roupas', responsavel: 'arthur_guterres', status: 'CANCELADO', dataCriacao: data.toISOString(), dataConclusao: data.toISOString()},
];
