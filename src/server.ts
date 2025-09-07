import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema/index.js';
import { atoresQueryResolvers } from './atores/query.js';
import { atoresMutationResolvers } from './atores/mutation.js';
import { filmesQueryResolvers } from './filmes/query.js';
import { filmesMutationResolvers } from './filmes/mutation.js';
import { generosQueryResolvers } from './generos/query.js';
import { generosMutationResolvers } from './generos/mutation.js';
import { start } from 'repl';

const resolvers = {
    Query: {
        ...atoresQueryResolvers.Query,
        ...filmesQueryResolvers.Query,
        ...generosQueryResolvers.Query,
    },
    Mutation: {
        ...atoresMutationResolvers.Mutation,
        ...filmesMutationResolvers.Mutation,
        ...generosMutationResolvers.Mutation,
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server).then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at: ${url}`);
});