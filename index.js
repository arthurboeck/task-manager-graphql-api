import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers, typeDefs } from './src/controller/graphql/schema.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageLocalDefault()]
});

const port = process.env.PORT || 8080;
const { url } = await startStandaloneServer(server, {
    listen: { port: port },
});

console.log(`🚀  Server ready at: ${url}`);
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;