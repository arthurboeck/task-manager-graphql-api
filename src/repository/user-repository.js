import { ServerError } from '../infra/error/request-error.js';
import knex from 'knex';

const tableUser = 'user';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './database/db.sqlite'
    },
    useNullAsDefault: true,
});

export async function getUsers() {
    let userList;
    try {
        user = await db(tableUser);
        console.info('Usuarios encontrados na base: ', userList);
    } catch (err) {
        handleDatabaseError('consultar', err);
    }
    return userList;
};

export async function getUserByUserName(username) {
    let user;
    try {
        user = await db(tableUser).where({ usuario: username });
        console.info('Usuario encontrado na base: ', user);
    } catch (err) {
        handleDatabaseError('consultar', err);
    }
    return user[0];
};

export function insertUser(user) {
    db(tableUser)
        .insert(user)
        .then(() => {
            console.info('Usuario inserido com sucesso na base');
        })
        .catch((err) => {
            handleDatabaseError('inserir', err);
        });
};

export function updateUser(userId, user) {
    db(tableUser)
        .where({ id: userId })
        .update(user)
        .then(() => {
            console.info('Usuario atualizado com sucesso na base');
        })
        .catch((err) => {
            handleDatabaseError('atualizar', err);
        });
};

export function deleteUser(userId) {
    db(tableUser)
        .where({ id: userId })
        .del()
        .then(() => {
            console.info('Usuario deletado com sucesso na base');
        })
        .catch((err) => {
            handleDatabaseError('deletar', err);
        });
};

function handleDatabaseError(operation, error) {
    console.error(`Erro ao ${operation} usuario na base: `, error);
    throw new ServerError(`Erro ao ${operation} usuario na base: `, error.message);
};