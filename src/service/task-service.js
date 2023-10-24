import * as taskRepository from '../repository/task-repository.js';
import * as taskHistoryService from '../service/task-history-service.js';
import { getUserByUserName } from '../service/user-service.js';
import { NotFoundError } from '../infra/error/request-error.js';
import validateTask from './task-validator.js';
import taskHistoryStatus from '../enums/task-history-status.js';

export async function getTasks() {
    const tasks = await taskRepository.getTasks();
    if (!tasks || tasks.length === 0) {
        throw new NotFoundError('Nenhuma tarefa encontrada!');
    }
    return tasks;
};

export async function getTaskById(taskId) {
    const task = await taskRepository.getTaskById(taskId);
    if (!task) {
        throw new NotFoundError('Tarefa não encontrada!');
    }
    return task;
};

export async function createTask(task, userLogged) {
    try {
        validateTask(task);
        await getUserByUserName(task.responsavel.replace(/\s+/g, ' '));
        let newTaskId = await taskRepository.insertTask(task);
        taskHistoryService.createTaskHistory(newTaskId, userLogged, taskHistoryStatus.CRIADA);
    } catch (error) {
        throw error;
    }
};

export async function updateTask(taskId, taskUpdate, userLogged) {
    try {
        await taskRepository.getTaskById(taskId);

        validateTask(taskUpdate);
        await getUserByUserName(taskUpdate.responsavel.replace(/\s+/g, ' '));
        taskRepository.updateTask(taskId, taskUpdate);
        taskHistoryService.createTaskHistory(taskId, userLogged, taskHistoryStatus.ALTERADA);
    } catch (error) {
        throw error;
    }
};

export async function deleteTask(taskId) {
    try {
        await taskRepository.getTaskById(taskId);
        await taskHistoryService.deleteTaskHistoryByTaskId(taskId);
        await taskRepository.deleteTask(taskId);
    } catch (error) {
        throw error;
    }
};