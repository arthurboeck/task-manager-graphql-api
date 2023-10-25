import {BadRequestError} from '../infra/error/error-handler.js';

function isValidString(value, fieldName, minLength = 1, maxLength = 255) {
    if (!value || typeof value !== 'string' || value.length < minLength || value.length > maxLength) {
        throw new BadRequestError(`Campo ${fieldName} deve ser uma string com tamanho entre ${minLength} e ${maxLength}!`);
    }
}

export default function validateUser(user) {
    isValidString(user.nome, 'nome');
    isValidString(user.usuario, 'usuario');
    isValidString(user.senha, 'senha');

    console.info('Usuário informado com request.body válido!');
}
