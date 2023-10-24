import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './src/controller/graphql/schema.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 8080 },
});

console.log(`🚀  Server ready at: ${url}`);
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;