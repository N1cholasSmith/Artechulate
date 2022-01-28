const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    createdAt: String
    articleCount: Int
    savedArticles: [Article]
  }

  type Article {
    _id: ID
    title: String
    username: String
    body: String
    # image: String
    # link: String
    createdAt: String
    comments: [Comment]!
    likes: [Like]
  }

  type Comment {
    id: ID
    createdAt: String
    username: String
    body: String
  }

  type Like {
    id: ID
    createdAt: String
    username: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
  }

  input savedArticle {
    articleId: String
    title: String
    username: String
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    me: User
    getArticles: [Article]
    getArticle(articleId: ID!): Article
  }

  type Mutation {
    # login(email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    register(registerInput: RegisterInput): Auth
    # addUser(username: String!, email: String!, password: String!): Auth
    createArticle(body: String!, title: String!): Article
    deleteArticle(articleId: String!): User
    updateArticle(id: ID, body: String!, title: String): Article
    saveArticle(input: savedArticle): User

    # createComment(articleId: String, body: String): Article
    # deleteComment(articleId: ID, commentId: ID)
  }
`;

module.exports = typeDefs;





