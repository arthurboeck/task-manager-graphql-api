/**
 * @param {import("../../../../")} knex
 */
export async function seed(knex) {
    await knex('user').del();
    await knex('user').insert(users);
}

const users = [
    {id: 1, nome: 'Arthur Guterres', usuario: 'arthur_guterres', senha: ''},
    {id: 2, nome: 'Arthur Boeck', usuario: 'boeckarthur', senha: ''},
    {id: 3, nome: 'Getulio Vargas', usuario: 'getulinho', senha: ''},
];
