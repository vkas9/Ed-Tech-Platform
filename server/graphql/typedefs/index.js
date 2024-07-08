const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    FirstName: String!
    LastName: String!
    Email: String!
    Contact_Number: String!
  }

  type Query {
    userDetail: [User!]!
    userById(_id: ID!): User
  }
`;

module.exports = typeDefs;
