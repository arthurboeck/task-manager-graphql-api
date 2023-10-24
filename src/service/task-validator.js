import { BadRequestError } from '../infra/error/request-error.js';
import taskStatus from '../enum/task-status.js';

function isValidString(value, callbackMessage) {
    if (!value || typeof value !== 'string' || value.length === 0 || value.length > 255) {
        throw new BadRequestError(callbackMessage);
    }
};

function isValidTaskStatus(value) {
    let statusInvalido = `Campo status é obrigatorio, devendo ser: 'PEDENTE', 'CONCLUIDO' ou 'CANCELADO'!`;

    if (value != taskStatus.CANCELADO && value != taskStatus.CONCLUIDO && value != taskStatus.PENDENTE) {
        throw new BadRequestError(statusInvalido);
    }
};

const tamanhoCampo = 'deve ser do tipo string com tamanho entre 1 e 255!';
const nomeInvalido = `Campo nome é obrigatorio, ${tamanhoCampo}`;
const descricaoInvalido = `Campo endereco é obrigatorio, ${tamanhoCampo}`;
const responsavelInvalido = `Campo nomeGerente é obrigatorio, ${tamanhoCampo}`;

export default function validateTask(task, update = false) {
    isValidString(task.nome, nomeInvalido);
    isValidString(task.descricao, descricaoInvalido);
    isValidString(task.responsavel, responsavelInvalido);

    if (update) {
        isValidTaskStatus(task.status);
    }

    console.info('Tarefa informada com request.body válido!');
};