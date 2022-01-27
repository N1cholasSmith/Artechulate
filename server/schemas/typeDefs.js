const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    getArticles: [Article]
    getArticle(articleId: ID!): Article
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
    articleCount: Int
    savedArticles: [Article]
  }

  type Article {
    Id: ID!
    title: String!
    username: String!
    body: String!
    # image: String
    # link: String
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input savedArticle {
    articleId: String!
    title: String!
    username: String
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    # login(email: String!, password: String!): Auth
    login(username: String!, password: String!): User!
    register(registerInput: RegisterInput): User!
    addUser(username: String!, email: String!, password: String!): Auth
    createArticle(body: String!) Article!
    saveArticle(input: savedArticle): User
    deleteArticle(articleId: String!): User
  }
`;

module.exports = typeDefs;





