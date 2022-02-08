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
    comments: [Comment]
    likes: [Like]
    commentCount: Int
    likeCount: Int
    user: User
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
    body: String
    # image: String
    # link: String
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
    login(username: String!, password: String!): Auth
    register(registerInput: RegisterInput): Auth

    createArticle(body: String, title: String): Article
    # CHANGED TO ID from String =========================================================================
    deleteArticle(articleId: String!): User
    updateArticle(id: ID, body: String, title: String): Article
    savedArticle(input: savedArticle): User

    # CHANGED CREATECOMMENT(ARTICLE: ID  from String) ===================================================
    createComment(articleId: ID, body: String): Article
    deleteComment(articleId: ID, commentId: ID): Article
    likeArticle(articleId: ID): Article

    # articleCount(likeCount: Int, commentCount: Int): Article
  }

  # notification of new articles
  type Subscription {
    newArticle: Article
  }
`;

module.exports = typeDefs;





