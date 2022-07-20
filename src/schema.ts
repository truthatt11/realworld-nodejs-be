import { gql } from 'apollo-server';

// const typeDefs = require('../data/schema.graphql');
// import typeDefs from '../data/schema.graphql';
// console.log(typeDefs)

const typeDefs = gql`
    type Query {
        ### User and authentication
        getUser: CommonUserResponse!
    }

    type Mutation {
        ### User and authentication
        loginUser(email: String!, password: String!): CommonUserResponse!
        createUser(username: String!, email: String!, password: String!): CommonUserResponse!
        updateUser(email: String, token: String, username: String, bio: String, image: String): CommonUserResponse!
    }

    type CommonUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        user: User
    }
    
    type User {
        id: ID!
        email: String
        token: String
        username: String
        bio: String
        image: String
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

// export = gql`${typeDefs}`;
export = typeDefs;
