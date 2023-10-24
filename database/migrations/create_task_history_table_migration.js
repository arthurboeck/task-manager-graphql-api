/**
 * @param {import("../../../../")} knex
 */
export function up(knex) {
    return knex.schema.createTable('task_history', function (table) {
        table.increments('id').primary();
        table.integer('idTask').unsigned().notNullable();
        table.foreign('idTask').references('id').inTable('task');
        table.string('descricao', 255).notNullable();
        table.string('usuario', 255).unsigned().notNullable();
        table.foreign('usuario').references('usuario').inTable('user');
        table.timestamp('data').defaultTo(knex.fn.now());
    });
};

/**
 * @param {import("../../../../")} knex
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('task_history');
};