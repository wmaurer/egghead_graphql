import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLList
} from 'graphql';
import { getVideoById, getVideos, createVideo } from './src/data';

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video on Egghead.io',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        duration: { type: GraphQLInt },
        released: { type: GraphQLBoolean }
    }
});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        video: {
            type: videoType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (_, args) => getVideoById(args.id)
        },
        videos: {
            type: new GraphQLList(videoType),
            resolve: getVideos
        }
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root mutation type.',
    fields: {
        createVideo: {
            type: videoType,
            args: {
                title: { type: GraphQLString },
                duration: { type: GraphQLInt },
                released: { type: GraphQLBoolean }
            },
            resolve: (_, args: any) => createVideo(args)
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
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
