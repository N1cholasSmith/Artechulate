const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    _id: ID
    username: String!
    email: String!
    articleCount: Int
    savedArticles: [Article]
  }

  type Article {
    articleId: String!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
  }

  input savedArticle {
    articleId: String!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveArticle(input: savedArticle): User
    removeArticle(articleId: String!): User
  }
`;

module.exports = typeDefs;





