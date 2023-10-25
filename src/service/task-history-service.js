import { NotFoundError } from '../infra/error/error-handler.js';
import * as taskHistoryRepository from
    '../repository/task-history-repository.js';

export async function getTaskHistories() {
    const histories = await taskHistoryRepository.getTaskHistories();
    if (!histories || histories.length === 0) {
        throw new NotFoundError('Nenhum histórico encontrado!');
    }
    return histories;
}

export async function getTaskHistoryByHistoryId(historyId) {
    const history = await taskHistoryRepository
        .getTaskHistoryByHistoryId(historyId);
    if (!history) {
        throw new NotFoundError('Histórico não encontrado!');
    }
    return history;
}

export async function getTaskHistoryByTaskId(taskId) {
    const history = await taskHistoryRepository.getTaskHistoryByTaskId(taskId);
    if (!history) {
        throw new NotFoundError('Histórico não encontrado!');
    }
    return history;
}

export async function createTaskHistory(idTask, usuario, descricao) {
    const history = {
        idTask: idTask,
        usuario: usuario,
        descricao: descricao,
    };
    await taskHistoryRepository.insertTaskHistory(history);
}

export async function deleteTaskHistoryByTaskId(taskId) {
    await taskHistoryRepository.deleteTaskHistoryByTaskId(taskId);
}
