import { NotFoundError } from '../infra/error/error-handler.js';
import * as userRepository from '../repository/user-repository.js';
import validateUser from './user-validator.js';

export async function getUsers() {
    const users = await userRepository.getUsers();
    if (!users || users.length === 0) {
        throw new NotFoundError('Nenhum usuário encontrado!');
    }
    return users;
}

export async function getUserByUserName(userName) {
    const userDetail = await userRepository.getUserByUserName(userName);
    if (!userDetail) {
        throw new NotFoundError('Usuário não encontrado!');
    }
    return userDetail;
}
export async function getUserById(userId) {
    const userDetail = await userRepository.getUserById(userId);
    if (!userDetail) {
        throw new NotFoundError('Usuário não encontrado!');
    }
    return userDetail;
}

export async function createUser(user) {
    validateUser(user);
    const newUser = await userRepository.insertUser(user);
    return getUserById(newUser.id);
}

export async function updateUser(userId, userUpdate) {
    validateUser(userUpdate);
    await getUserById(userId);
    const updatedUser = await userRepository.updateUser(userId, userUpdate);
    return getUserById(updatedUser.id);
}
