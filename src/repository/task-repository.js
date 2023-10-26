import knex from 'knex';
import taskStatus from '../enum/task-status.js';
import { ServerError } from '../infra/error/error-handler.js';

const tableTask = 'task';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './database/db.sqlite',
    },
    useNullAsDefault: true,
});

export async function getTasks() {
    let taskList;
    try {
        taskList = await db(tableTask);
        console.info('Tarefas encontradas na base: ', taskList);
    } catch (err) {
        handleDatabaseError('consultar', err);
    }
    return taskList;
}

export async function getTaskById(taskId) {
    let task;
    try {
        task = await db(tableTask).where({ id: taskId });
        console.info('Tarefa encontrada na base: ', task);
    } catch (err) {
        handleDatabaseError('consultar', err);
    }
    return task[0];
}

export function insertTask(task) {
    return db(tableTask)
        .insert(task)
        .returning('id')
        .then((ids) => {
            const id = ids[0];
            console.info(`Tarefa com ID ${id} inserida com sucesso na base`);
            return id;
        })
        .catch((err) => {
            handleDatabaseError('inserir', err);
        });
}

export function updateTask(taskId, task) {
    db(tableTask)
        .where({ id: taskId })
        .update(task)
        .then(() => {
            console.info('Tarefa atualizada com sucesso na base');
        })
        .catch((err) => {
            handleDatabaseError('atualizar', err);
        });
}

export function completeTask(taskId) {
    db(tableTask)
        .where({ id: taskId })
        .update({
            status: taskStatus.CONCLUIDO,
            dataConclusao: new Date().toISOString(),
        })
        .then(() => {
            console.info('Tarefa concluida com sucesso na base');
        })
        .catch((err) => {
            handleDatabaseError('atualizar', err);
        });
}

export function deleteTask(taskId) {
    db(tableTask)
        .where({ id: taskId })
        .del()
        .then(() => {
            console.info('Tarefa deletada com sucesso na base');
        })
        .catch((err) => {
            handleDatabaseError('deletar', err);
        });
}

function handleDatabaseError(operation, error) {
    console.error(`Erro ao ${operation} tarefa na base: `, error);
    throw new ServerError(`Erro ao ${operation} tarefa na base: `, error.message);
}
