import taskStatus from '../enum/task-status.js';
import { BadRequestError } from '../infra/error/error-handler.js';

function isValidString(value, fieldName, minLength = 1, maxLength = 255) {
    if (!value || typeof value !== 'string' || value.length < minLength || value.length > maxLength) {
        throw new BadRequestError(`Campo ${fieldName} deve ser uma string com tamanho entre ${minLength} e ${maxLength}!`);
    }
};

function isValidTaskStatus(value) {
    const validStatusValues = [taskStatus.CANCELADO, taskStatus.CONCLUIDO, taskStatus.PENDENTE];
    if (!validStatusValues.includes(value)) {
        throw new BadRequestError('Campo status é obrigatório e deve ser um dos valores: "CANCELADO", "CONCLUÍDO" ou "PENDENTE".');
    }
};

export default function validateTask(task, update = false) {
    isValidString(task.nome, 'nome');
    isValidString(task.descricao, 'descricao');
    isValidString(task.responsavel, 'responsavel');

    if (update) {
        isValidTaskStatus(task.status);
    }

    console.info('Tarefa informada com request.body válido!');
};