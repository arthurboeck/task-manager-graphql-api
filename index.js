import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { resolvers, typeDefs } from './src/controller/graphql/schema.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

const port = process.env.PORT || 8080;
const { url } = await startStandaloneServer(server, {
    listen: { port: port },
});

console.log(`🚀  Server ready at: ${url}`);
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;