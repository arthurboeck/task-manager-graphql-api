import knex from 'knex';
import { ServerError } from '../infra/error/error-handler.js';

const tableTaskHistory = 'task_history';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './database/db.sqlite',
    },
    useNullAsDefault: true,
});

export async function getTaskHistories() {
    let historyList;
    try {
        historyList = await db(tableTaskHistory);
        console.info('Históricos encontrados na base: ', historyList);
    } catch (err) {
        handleDatabaseError('consultar', err);
    }
    return historyList;
}

export async function getTaskHistoryByHistoryId(historyId) {
    let history;
    try {
        history = await db(tableTaskHistory).where({ id: historyId });
        console.info('Histórico encontrado na base: ', history);
    } catch (err) {
        handleDatabaseError('consultar', err);
    }
    return history[0];
}

export async function getTaskHistoryByTaskId(taskId) {
    let historyList;
    try {
        historyList = await db(tableTaskHistory).where({ idTask: taskId });
        console.info('Histórico encontrado na base: ', historyList);
    } catch (err) {
        handleDatabaseError('consultar', err);
    }
    return historyList;
}

export function insertTaskHistory(taskHistory) {
    db(tableTaskHistory)
        .insert(taskHistory)
        .then(() => {
            console.info('Historico inserido com sucesso na base');
        })
        .catch((err) => {
            handleDatabaseError('inserir', err);
        });
}

export function deleteTaskHistoryByTaskId(taskId) {
    db(tableTaskHistory)
        .where({ idTask: taskId })
        .del()
        .then(() => {
            console.info('Historico deletado com sucesso na base');
        })
        .catch((err) => {
            handleDatabaseError('deletar', err);
        });
}

function handleDatabaseError(operation, error) {
    console.error(`Erro ao ${operation} histórico na base: `, error);
    throw new ServerError(`Erro ao ${operation} histórico na base: `,
        error.message);
}

