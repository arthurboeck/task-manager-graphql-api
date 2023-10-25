/**
 * @param {import("../../../../")} knex
 */
export function up(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.string('usuario', 255).notNullable();
    table.string('senha', 255).notNullable();
    table.datetime('dataCriacao', {precision: 6}).defaultTo((new Date()).toISOString());
  });
}

/**
 * @param {import("../../../../")} knex
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('user');
}
