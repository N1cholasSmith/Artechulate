import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        email
        username
        createdAt
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      token
      user {
        _id
        email
        username
        createdAt
      }
    }
  }
`;


export const CREATE_ARTICLE = gql`
  mutation createArticle($body: String!, $title: String!) {
    createArticle(body: $body, title: $title) {
      _id
      username
      title
      body
      createdAt
      commentCount
      comments {
        id
        username
        body
        createdAt
        }
        likeCount
        likes {
          id
          username
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($articleId: String!) {
    deleteArticle(articleId: $articleId) {
      _id
      username
      email
      articleCount
    }
  }
`;

export const SAVE_ARTICLE = gql`
  mutation saveArticle($input: savedArticle!) {
    saveArticle(input: $input) {
      _id
      username
      email
      articleCount
      savedArticle {
        # _id
        articleId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export const LIKE_ARTICLE = gql`
mutation likeArticle($articleId: ID){
  likeArticle(articleId: $articleId){
    _id
    likes{
      id
      username
    }
    likeCount
  }
}
`;

export const CREATE_COMMENT = gql`
  mutation createComment($articleId: String!, $body: String!) {
    deleteComment(articleId: $articleId, body: $body) {
      _id
      body
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;


export const DELETE_COMMENT = gql`
  mutation deleteComment($articleId: ID!, $commentId: ID!) {
    deleteComment(articleId: $articleId, commentId: $commentId) {
      _id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;










