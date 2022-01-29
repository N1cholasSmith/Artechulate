import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(email: $email, password: $password) {
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
  mutation register(registerInput: {$username: String!, $email: String!, $password: String!, $confirmPassword: $String!}) { 
    register(username: $username, password: $password, confirmPassword: $confirmPassword) {
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
  mutation createArticle($body: String, $title: String) {
    createArticle(body: $body, title: $title) {
      _id
      username
      title
      body
      createdAt
      comments {
        id
        username
        body
        createdAt
        likes {
          id
          username
        }
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($articleId: String!) {
    removeArticle(articleId: $articleId) {
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