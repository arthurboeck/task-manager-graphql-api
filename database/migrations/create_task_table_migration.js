/**
 * @param {import("../../../../")} knex
 */
export function up(knex) {
  return knex.schema.createTable('task', function(table) {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.string('descricao', 255).notNullable();
    table.string('responsavel', 255).unsigned().notNullable();
    table.foreign('responsavel').references('usuario').inTable('user');
    table.string('status', 255).notNullable();
    table.datetime('dataCriacao', {precision: 6}).defaultTo((new Date()).toISOString());
    table.datetime('dataConclusao', {precision: 6});
  });
}

/**
 * @param {import("../../../../")} knex
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('task');
}
