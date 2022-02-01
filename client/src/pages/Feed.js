
import React, { useState, useEffect, useContext } from 'react';
import { Grid, GridColumn, Image, Transition } from 'semantic-ui-react'
import { useQuery } from '@apollo/client';
import '../styles/styles.css'

// IMPORTING AUTH AND CONTEXT ===============================================
import { setContext } from '@apollo/client/link/context';
import Auth from '../utils/auth';

// COMPONENTS ===============================================================wwwww
import ArticleCard from '../components/ArticleCard';
import ArticleForm from '../components/ArticleForm'

// QUERIES ==================================================================
import { GET_ARTICLES } from '../utils/queries'

// PICTURES =================================================================
import Face from '../assets/images/face.jpg'

const Feed = () => {
    const { user } = useContext(setContext)
    const { loading, data } = useQuery(GET_ARTICLES)
    console.log(data)

    const articleData = data?.articles || []

    // use this to determine if `useEffect()` hook needs to run again
    const articleDataLength = Object.keys(articleData).length;

    const articleFeed = async (login) => {
        console.log('articleFeed hit')
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            console.log('client not getting valid token (articleFeed)')
            return false;
        }

        // CHECK IF USER IS LOGGED IN.
        // try {
        //     const { data } = await login({
        //         variables: { ...userFormData }
        //     });

        //     Auth.login(data.addUser.token);
        // } catch (e) {
        //     console.error(e);
        // }


    }





    return (
        <>
            <Grid columns={3} divided>
                <Grid.Row className='page-title'>
                    <h1>Latest Articles</h1>
                </Grid.Row>
                <Grid.Row>
                    {/* if logged in show this form */}
                    {user && (
                        <GridColumn>
                            <ArticleForm>
                                {/* component */}
                            </ArticleForm>
                        </GridColumn>
                    )}

                    {/* Shows loading screen while fetching for article data */}
                    {loading ? (
                        <h1> Loading Articles...</h1>
                    ) : (
                        <Transition.Group>
                            {articleData && articleData.map(article => (
                            <Grid.Column key={articleDataLength.id} style={{ marginBottom: 20 }}>
                                <Image src={Face} />
                                <ArticleCard article={article} />
                            </Grid.Column>
                            ))}
                        </Transition.Group>
                    )}
                </Grid.Row>
            </Grid>
        </>
    );
}


export default Feed;



