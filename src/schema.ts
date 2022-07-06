const { gql } = require('apollo-server');

const typeDefs = require('../data/schema.graphql');
console.log(typeDefs)

export = typeDefs;