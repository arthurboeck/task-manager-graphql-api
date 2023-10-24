import { BadRequestError } from '../infra/error/request-error.js';

function isValidString(value, callbackMessage) {
    if (!value || typeof value !== 'string' || value.length === 0 || value.length > 255) {
        throw new BadRequestError(callbackMessage);
    }
};

const tamanhoCampo = 'deve ser do tipo string com tamanho entre 1 e 255!';
const nomeInvalido = `Campo nome é obrigatorio, ${tamanhoCampo}`;
const usuarioInvalido = `Campo usuario é obrigatorio, ${tamanhoCampo}`;
const senhaInvalida = `Campo senha é obrigatorio, ${tamanhoCampo}`;

export default function validateUser(user) {
    isValidString(user.nome, nomeInvalido);
    isValidString(user.usuario, usuarioInvalido);
    isValidString(user.senha, senhaInvalida);

    console.info('Usuario informado com request.body válido!');
};