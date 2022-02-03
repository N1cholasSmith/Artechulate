import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export const GET_ARTICLES = gql`
  {
    getArticles {
      _id
      username
      title
      body
      createdAt
      user {
        _id
        username
        email
      }
      commentCount  
      comments{
        id
        username
        body
        createdAt
      }
      likeCount
      likes {
        username
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  query getArticle($articleId: ID!) {
    getArticle (articleId: $articleId) {
      _id
      username
      title
      body
      createdAt
      user {
        _id
        username
        email
      }
      commentCount  
      comments{
        id
        username
        body
        createdAt
      }
      likeCount
      likes {
        username
      }
    }
  }
`;

