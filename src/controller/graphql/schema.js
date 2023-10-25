import { readFileSync } from 'fs';
import { DateTimeResolver } from 'graphql-scalars';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import * as taskHistoryService from '../../service/task-history-service.js';
import * as taskService from '../../service/task-service.js';
import * as userService from '../../service/user-service.js';

const queryResolvers = {
    tasks(_root, args) {
        return taskService.getTasks();
    },
    task(_root, args) {
        return taskService.getTaskById(args.id);
    },
    taskHistory(_root, args) {
        return taskHistoryService.getTaskHistoryByTaskId(args.idTask);
    },
    taskHistories(_root, args) {
        return taskHistoryService.getTaskHistories();
    },
    users(_root, args) {
        return userService.getUsers();
    },
    user(_root, args) {
        return userService.getUserByUserName(args.usuario);
    },
};

const mutationResolvers = {
    createTask(_root, args) {
        return taskService.createTask(args, args.responsavel);
    },
    completeTask(_root, args) {
        return taskService.completeTask(args.id, args.usuario);
    },
    updateTask(_root, args) {
        return taskService.updateTask(args.id, args, args.responsavel);
    },
    deleteTask(_root, args) {
        return taskService.deleteTask(args.id);
    },
    createUser(_root, args) {
        return userService.createUser(args);
    },
    updateUser(_root, args) {
        return userService.updateUser(args.id, args);
    },
};

const filename = fileURLToPath(import.meta.url);
const schemaPath = resolve(dirname(filename), 'schema.graphql');
const typeDefs = readFileSync(schemaPath, { encoding: 'utf-8' });

const resolvers = {
    DateTime: DateTimeResolver,
    Query: queryResolvers,
    Mutation: mutationResolvers,
};

export { resolvers, typeDefs };

