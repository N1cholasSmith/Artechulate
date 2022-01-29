import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Grid, Image } from 'semantic-ui-react'

// COMPONENTS ==============================================================
import ArticleCard from '../components/ArticleCard';

function Feed() {
    const { loading, data: { getArticles: articles } } = useQuery(FETCH_ARTICLES_QUERY);


    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <h1>Latest Articles</h1>
            </Grid.Row>
            <Grid.Row>
                {/* Shows loading scren while fetching for article data */}
                {loading ? (
                    <h1> Loading Articles...</h1>
                ) : (
                    articles && articles.map(article => (
                        <Grid.Column key={article.id}>
                            <Image src='/images/wireframe/media-paragraph.png' />
                            <ArticleCard article={article}/>
                        </Grid.Column>
                    ))
                )}
                <Grid.Column>
                    <Image src='/images/wireframe/media-paragraph.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='/images/wireframe/media-paragraph.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='/images/wireframe/media-paragraph.png' />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Image src='/images/wireframe/media-paragraph.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='/images/wireframe/media-paragraph.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='/images/wireframe/media-paragraph.png' />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

const FETCH_ARTICLES_QUERY = gql`
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

export default Feed;



