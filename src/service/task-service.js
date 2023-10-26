import taskHistoryStatus from '../enum/task-history-status.js';
import taskStatus from '../enum/task-status.js';
import { NotFoundError } from '../infra/error/error-handler.js';
import * as taskRepository from '../repository/task-repository.js';
import * as taskHistoryService from '../service/task-history-service.js';
import { getUserByUserName } from '../service/user-service.js';
import validateTask from './task-validator.js';

export async function getTasks() {
    const tasks = await taskRepository.getTasks();
    if (!tasks || tasks.length === 0) {
        throw new NotFoundError('Nenhuma tarefa encontrada!');
    }

    for (const task of tasks) {
        const history = await taskHistoryService.getTaskHistoryByTaskId(task.id);
        task.historico = history;
    }
    return tasks;
}

export async function getTaskById(taskId) {
    const task = await taskRepository.getTaskById(taskId);
    if (!task) {
        throw new NotFoundError('Tarefa não encontrada!');
    }

    task.historico = await taskHistoryService.getTaskHistoryByTaskId(taskId);
    return task;
}

export async function createTask(task, userLogged) {
    validateTask(task);
    await getUserByUserName(task.responsavel.replace(/\s+/g, ' '));

    const newTask = await taskRepository.insertTask({ ...task, status: taskStatus.PENDENTE });
    insertTaskHistory(newTask.id, userLogged, taskHistoryStatus.CRIADA);

    return await getTaskById(newTask.id);
}

export async function updateTaskById(taskId, taskUpdate) {
    validateTask(taskUpdate, true);
    await taskRepository.getTaskById(taskId);
    await getUserByUserName(taskUpdate.responsavel.replace(/\s+/g, ' '));

    taskRepository.updateTask(taskId, taskUpdate);
    setStatusHistoricoAlteracao(taskId, taskUpdate);

    return await getTaskById(taskId);
}

export async function completeTask(taskId, username) {
    await taskRepository.completeTask(taskId);
    insertTaskHistory(taskId, username, taskHistoryStatus.CONCLUIDA);

    return await getTaskById(taskId);
}

export async function cancelTask(taskId, username) {
    await taskRepository.cancelTask(taskId);
    insertTaskHistory(taskId, username, taskHistoryStatus.CANCELADA);

    return await getTaskById(taskId);
}

export async function deleteTask(taskId) {
    await taskRepository.getTaskById(taskId);
    await taskHistoryService.deleteTaskHistoryByTaskId(taskId);
    taskRepository.deleteTask(taskId);

    return true;
}

async function setStatusHistoricoAlteracao(taskId, task) {
    insertTaskHistory(taskId, task.responsavel, getTaskHistoryStatus(task.status));
    switch (task.status) {
        case taskStatus.CANCELADA:
            await cancelTask(taskId, task.responsavel);
            break;
        case taskStatus.CONCLUIDA:
            await completeTask(taskId, task.responsavel);
            break;
    }
}

function getTaskHistoryStatus(status) {
    console.log(status);
    switch (status) {
        case taskStatus.CANCELADA:
            return taskHistoryStatus.ALTERADA_CANCELADA;
        case taskStatus.CONCLUIDA:
            return taskHistoryStatus.ALTERADA_CONCLUIDA;
        default:
            return taskHistoryStatus.ALTERADA;
    }
}

async function insertTaskHistory(taskId, username, historyStatus) {
    await taskHistoryService.createTaskHistory(taskId, username, historyStatus);
}