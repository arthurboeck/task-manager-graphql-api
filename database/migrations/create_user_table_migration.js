/**
 * @param {import("../../../../")} knex
 */
export function up(knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments('id').primary();
        table.string('nome', 255).notNullable();
        table.string('usuario', 255).notNullable();
        table.string('senha', 255).notNullable();
        table.string('dataCriacao', 255).notNullable();
    });
};

/**
 * @param {import("../../../../")} knex
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('user');
};