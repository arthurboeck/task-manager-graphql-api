import * as userRepository from '../repository/user-repository.js';
import { NotFoundError } from '../infra/error/request-error.js';
import validateUser from './user-validator.js';

export async function getUsers() {
    const users = await userRepository.getUsers();
    if (!users || users.length === 0) {
        throw new NotFoundError('Nenhum usuario encontrado!');
    }
    return users;
};

export async function getUserByUserName(userName) {
    const userDetail = await userRepository.getUserByUserName(userName);
    if (!userDetail) {
        throw new NotFoundError('Usuario não encontrado!');
    }
    return userDetail;
};
export async function getUserById(userId) {
    const userDetail = await userRepository.getUserById(userId);
    if (!userDetail) {
        throw new NotFoundError('Usuario não encontrado!');
    }
    return userDetail;
};

export async function createUser(user) {
    try {
        validateUser(user);
        let newUser = await userRepository.insertUser(user);
        return await getUserById(newUser.id);
    } catch (error) {
        throw error;
    }
};

export async function updateUser(userId, userUpdate) {
    try {
        await getUserById(userId);
        validateUser(userUpdate);
        let user = await userRepository.updateUser(userId, userUpdate);
        return await getUserById(user.id);
    } catch (error) {
        throw error;
    }
};

export async function deleteUser(userId) {
    try {
        await getUserById(userId);
        await userRepository.deleteUser(userId);
    } catch (error) {
        throw error;
    }
};