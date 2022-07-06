import { User } from './variable-types'

const resolvers = {
    Query: {
        getUser: (_parent: any, _args: any, {dataSources}: any) => {
            return dataSources.localAPI.getUser();
        },
    },
    Mutation: {
        loginUser: (_parent: any, args: any, { dataSources }: any) => {
            const {email, password}: {email: string, password: string} = args;
            return dataSources.localAPI.loginUser(email, password);
        },
        createUser: (_parent: any, args: any, { dataSources }: any) => {
            const {username, email, password}: {username: string, email: string, password: string} = args;
            return dataSources.localAPI.createUser(username, email, password);
        },
        updateUser: (_parent: any, args: any, { dataSources }: any) => {
            const {email, token, username, bio, image}: 
                {email: string, token: string, username: string, bio: string, image: string} = args;
            return dataSources.localAPI.updateUser(email, token, username, bio, image);
        },
    },
};

export = resolvers;