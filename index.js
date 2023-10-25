import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers, typeDefs } from './src/controller/graphql/schema.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    status400ForVariableCoercionErrors: true,
    plugins: [ApolloServerPluginLandingPageProductionDefault(
        {
            embed: {
                displayOptions: {
                    runTelemetry: true,
                    docsPanelState: 'open',
                    showHeadersAndEnvVars: true,
                },
            },
            document: resolvers,
        }
    )]
});

const port = process.env.PORT || 8080;
const { url } = await startStandaloneServer(server, {
    listen: { port: port },
});

console.log(`🚀  Server ready at: ${url}`);
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;