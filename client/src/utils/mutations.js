import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
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

export const REMOVE_ARTICLE = gql`
  mutation removeArticle($articleId: String!) {
    removeArticle(articleId: $articleId) {
      _id
      username
      email
      articleCount
      savedArticles {
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
