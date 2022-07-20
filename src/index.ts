import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import LocalAPI from './datasources/local-api';

const mocks = {
    Query: () => ({
        getUser: () => {
            console.log('[GET_USER]');
            return {
                code: 200,
                success: true,
                message: "",
                user: {
                    email: "getuser@graphql.com",
                    token: "111111",
                    username: "getuser",
                    bio: "hello graphql 1",
                    image: "123.jpg"
                },
            };
        }
    }),
    Mutation: () => ({
        loginUser: (email: string, password: string) => {
            return {
                code: 200,
                success: true,
                message: "",
                user: {
                    email: "loginuser@graphql.com",
                    token: "222222",
                    username: "loginuser",
                    bio: "hello graphql 2",
                    image: "234.jpg"
                }
            };
        },
        createUser: (username: string, email: string, password: string) => {
            return {
                code: 200,
                success: true,
                message: "",
                user: {
                    email: "createuser@graphql.com",
                    token: "333333",
                    username,
                    bio: "hello createUser",
                    image: "345.jpg"
                }
            };
        },
        updateUser: (email: string, token: string, username: string, bio: string, image: string) => {
            return {
                code: 200,
                success: true,
                message: "",
                user: {
                    email: "updateuser@graphql.com",
                    token: "444444",
                    username,
                    bio: "hello updateUser",
                    image: "456.jpg",
                }
            };
        },
    }),
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        console.log("[APOLLO_SERVER] dataSources");
        return {
            localAPI: new LocalAPI(),
        }
    },
    context: ({ req }) => ({
        // authScope: getScope(req.headers.authorization)
        authScope: req.headers.authorization
    })
    // mocks
});

server.listen().then(() => {
    console.log('apollo server started');
});
