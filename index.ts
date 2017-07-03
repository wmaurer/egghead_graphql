import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } from 'graphql';
import { getVideoById } from './src/data';

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video on Egghead.io',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        duration: { type: GraphQLString },
        watched: { type: GraphQLBoolean }
    }
});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        video: {
            type: videoType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (_, args) => getVideoById(args.id)
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType
});

server.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
