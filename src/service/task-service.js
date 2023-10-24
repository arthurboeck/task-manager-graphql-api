import * as taskRepository from '../repository/task-repository.js';
import * as taskHistoryService from '../service/task-history-service.js';
import { getUserByUserName } from '../service/user-service.js';
import { NotFoundError } from '../infra/error/request-error.js';
import validateTask from './task-validator.js';
import taskHistoryStatus from '../enum/task-history-status.js';
import taskStatus from '../enum/task-status.js';

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
};

export async function getTaskById(taskId) {
    const task = await taskRepository.getTaskById(taskId);
    if (!task) {
        throw new NotFoundError('Tarefa não encontrada!');
    }

    const history = await taskHistoryService.getTaskHistoryByTaskId(taskId);
    task.historico = history;
    return task;
};

export async function createTask(task, userLogged) {
    try {
        validateTask(task);
        await getUserByUserName(task.responsavel.replace(/\s+/g, ' '));
        task.status = taskStatus.PENDENTE;
        let newTask = await taskRepository.insertTask(task);
        taskHistoryService.createTaskHistory(newTask.id, userLogged, taskHistoryStatus.CRIADA);
        return await getTaskById(newTask.id);
    } catch (error) {
        throw error;
    }
};

export async function updateTask(taskId, taskUpdate, userLogged) {
    try {
        await taskRepository.getTaskById(taskId);

        validateTask(taskUpdate, true);
        await getUserByUserName(taskUpdate.responsavel.replace(/\s+/g, ' '));
        await taskRepository.updateTask(taskId, taskUpdate);
        taskHistoryService.createTaskHistory(taskId, userLogged, taskHistoryStatus.ALTERADA);
        return await getTaskById(taskId);
    } catch (error) {
        throw error;
    }
};

export async function completeTask(taskId, userLogged) {
    try {
        await taskRepository.completeTask(taskId);
        await taskHistoryService.createTaskHistory(taskId, userLogged, taskHistoryStatus.CONCLUIDA);
        return await getTaskById(taskId);
    } catch (error) {
        throw error;
    }
};

export async function deleteTask(taskId) {
    let mutationStatus;
    try {
        await taskRepository.getTaskById(taskId);
        await taskHistoryService.deleteTaskHistoryByTaskId(taskId);
        await taskRepository.deleteTask(taskId);
        mutationStatus = true;
    } catch (error) {
        mutationStatus = false;
        throw error;
    }
    return mutationStatus;
};