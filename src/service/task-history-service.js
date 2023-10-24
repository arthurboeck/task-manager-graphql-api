import * as taskHistoryRepository from '../repository/task-history-repository.js';
import { NotFoundError } from '../infra/error/request-error.js';

export async function getTaskHistories() {
    const tasks = await taskHistoryRepository.getTaskHistories();
    if (!tasks || tasks.length === 0) {
        throw new NotFoundError('Nenhum historico encontrado!');
    }
    return tasks;
};

export async function getTaskHistoryByHistoryId(historyId) {
    const history = await taskHistoryRepository.getTaskHistoryByHistoryId(historyId);
    if (!history) {
        throw new NotFoundError('Historico não encontrado!');
    }
    return history;
};

export async function getTaskHistoryByTaskId(taskId) {
    const history = await taskHistoryRepository.getTaskHistoryByTaskId(taskId);
    if (!history) {
        throw new NotFoundError('Historico não encontrado!');
    }
    return history;
};

export async function getTaskHistoryByUserName(username) {
    const history = await taskHistoryRepository.getTaskHistoryByUserName(username);
    if (!history) {
        throw new NotFoundError('Historico não encontrado!');
    }
    return history;
};

export async function createTaskHistory(idTask, usuario, descricao) {
    try {
        const history = {
            idTask: idTask,
            usuario: usuario,
            descricao: descricao
        };
        taskHistoryRepository.insertTaskHistory(history);
    } catch (error) {
        throw error;
    }
};

export async function deleteTaskHistoryByTaskId(taskId) {
    try {
        await taskHistoryRepository.deleteTaskHistoryByTaskId(taskId);
    } catch (error) {
        throw error;
    }
};