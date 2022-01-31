
import React, { useState, useEffect } from 'react';
import { Grid, Image } from 'semantic-ui-react'
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';

// PICTURES
import Face from '../assets/images/face.jpg'

// COMPONENTS ==============================================================
import ArticleCard from '../components/ArticleCard';

// QUERIES 
import { GET_ARTICLES } from '../utils/queries'

function Feed() {
    const { loading, data } = useQuery(GET_ARTICLES)
    console.log(data)

    const articleData = data?.articles || []

    // use this to determine if `useEffect()` hook needs to run again
    const articleDataLength = Object.keys(articleData).length;



    return (
        <>
            <Grid columns={3} divided>
                <Grid.Row className='page-title'>
                    <h1>Latest Articles</h1>
                </Grid.Row>
                <Grid.Row>
                    {/* Shows loading scren while fetching for article data */}
                    {loading ? (
                        <h1> Loading Articles...</h1>
                    ) : (
                        articleData && articleData.map(article => (
                            <Grid.Column key={article.id} style={{ marginBottom: 20 }}>
                                <Image src={Face} />
                                <ArticleCard article={article} />
                            </Grid.Column>
                        ))
                    )}
                </Grid.Row>
            </Grid>
        </>
    );
}

// const FETCH_ARTICLES_QUERY = gql`
//  {
//     getArticles {
//       _id
//       username
//       title
//       body
//       createdAt
//       user {
//         _id
//         username
//         email
//       }
//       commentCount  
//       comments{
//         id
//         username
//         body
//         createdAt
//       }
//       likeCount
//       likes {
//         username
//       }
//     }
//   }
// `;

export default Feed;



