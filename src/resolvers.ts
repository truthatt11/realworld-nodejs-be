// import { User } from './variable-types'

const resolvers = {
    Query: {
        getUser: async (_parent: any, _args: any, {dataSources, authScope}: any) => {
            console.log(`[RESOLVER] getUser, authScope: ${authScope}`)
            const user = await dataSources.localAPI.getUser(authScope);
            return user;
        },
    },
    Mutation: {
        loginUser: async (_parent: any, args: any, { dataSources }: any) => {
            const {email, password}: {email: string, password: string} = args;
            const user = await dataSources.localAPI.loginUser(email, password);
            return user;
        },
        createUser: async (_parent: any, args: any, { dataSources }: any) => {
            const {username, email, password}: {username: string, email: string, password: string} = args;
            const user: any = await dataSources.localAPI.createUser(username, email, password);
            return user;
        },
        updateUser: async (_parent: any, args: any, { dataSources }: any) => {
            const {email, token, username, bio, image}: 
                {email: string, token: string, username: string, bio: string, image: string} = args;
            const user = await dataSources.localAPI.updateUser(email, token, username, bio, image);
            return user;
        },
    },
};

export = resolvers;