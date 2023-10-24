import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as taskService from '../../service/task-service.js';
import * as taskHistoryService from '../../service/task-history-service.js';
import * as userService from '../../service/user-service.js';
import GraphQLDateTime from 'graphql-iso-date';

const queryResolvers = {
    tasks(_root, args) {
        return taskService.getTasks();
    },
    task(_root, args) {
        return taskService.getTaskById(args.id);
    },
    taskHistory(_root, args) {
        return taskHistoryService.getTaskHistoryByTaskId(args.id);
    },
    taskHistories(_root, args) {
        return taskHistoryService.getTaskHistories();
    },
    users(_root, args) {
        return userService.getUsers();
    },
    user(_root, args) {
        return userService.getUserByUserName(args.usuario);
    }
};

const mutationResolvers = {
    createTask(_root, args) {
        return taskService.createTask(args.tarefa, args.usuario);
    },
    updateTask(_root, args) {
        return taskService.updateTask(args.id, args.tarefa, args.usuario);
    },
    deleteTask(_root, args) {
        return taskService.deleteTask(args.id);
    },
    createUser(_root, args) {
        return userService.createUser(args.usuario);
    }
};

const filename = fileURLToPath(import.meta.url);
const typeDefs = readFileSync(resolve(dirname(filename), 'schema.graphql'), { encoding: 'utf-8' });
const resolvers = {
    DateTime: GraphQLDateTime,
    Query: queryResolvers,
    Mutation: mutationResolvers
};

export { typeDefs, resolvers };