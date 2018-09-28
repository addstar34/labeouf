const { ApolloServer, gql } = require('apollo-server')
const { merge } = require('lodash');
const fs = require('fs');

const { prisma } = require('../database/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const typeDefs = gql`${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}`
const resolvers = merge(Query, Mutation)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})