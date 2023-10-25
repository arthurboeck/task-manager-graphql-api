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
};

export async function getTaskById(taskId) {
    const task = await taskRepository.getTaskById(taskId);
    if (!task) {
        throw new NotFoundError('Tarefa não encontrada!');
    }

    task.historico = await taskHistoryService.getTaskHistoryByTaskId(taskId);
    return task;
};

export async function createTask(task, userLogged) {
    try {
        validateTask(task);
        await getUserByUserName(task.responsavel.replace(/\s+/g, ' '));

        const newTask = await taskRepository.insertTask({ ...task, status: taskStatus.PENDENTE });
        await taskHistoryService.createTaskHistory(newTask.id, userLogged, taskHistoryStatus.CRIADA);

        return getTaskById(newTask.id);
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
    try {
        await taskRepository.getTaskById(taskId);
        await taskHistoryService.deleteTaskHistoryByTaskId(taskId);
        await taskRepository.deleteTask(taskId);

        return true;
    } catch (error) {
        throw error;
    }
}
