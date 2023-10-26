import knex from 'knex';
import { ServerError } from '../infra/error/error-handler.js';

const tableUser = 'user';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './database/db.sqlite',
    },
    useNullAsDefault: true,
});

export async function getUsers() {
    let userList;
    try {
        userList = await db(tableUser);
        console.info('Usuários encontrados na base: ', userList);
    } catch (err) {
        handleDatabaseError('consultar', err);
    }
    return userList;
}

export async function getUserById(userId) {
    let user;
    try {
        user = await db(tableUser).where({ id: userId });
        console.info('Usuário encontrado na base: ', user);
    } catch (err) {
        handleDatabaseError('consultar', err);
    }
    return user[0];
}

export async function getUserByUserName(username) {
    let user;
    try {
        user = await db(tableUser).where({ usuario: username });
        console.info('Usuário encontrado na base: ', user);
    } catch (err) {
        handleDatabaseError('consultar', err);
    }
    return user[0];
}

export function insertUser(user) {
    return db(tableUser)
        .insert(user)
        .returning('id')
        .then((ids) => {
            console.info('Usuario inserido com sucesso na base');
            return ids[0];
        })
        .catch((err) => {
            handleDatabaseError('inserir', err);
        });
}

export function updateUser(userId, user) {
    return db(tableUser)
        .where({ id: userId })
        .update(user)
        .returning('id')
        .then((ids) => {
            console.info('Usuario atualizado com sucesso na base');
            return ids[0];
        })
        .catch((err) => {
            handleDatabaseError('atualizar', err);
        });
}

function handleDatabaseError(operation, error) {
    console.error(`Erro ao ${operation} usuário na base: `, error);
    throw new ServerError(`Erro ao ${operation} usuário na base: `,
        error.message);
}
