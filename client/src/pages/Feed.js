import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    GridColumn,
    Transition,
} from 'semantic-ui-react'
// IMPORTING AUTH AND CONTEXT ===============================================
import Auth from '../utils/auth';
// COMPONENTS ===============================================================
import ArticleCard from '../components/ArticleCard';
import ArticleForm from '../components/ArticleForm';
import '../styles/styles.css'
// QUERIES ==================================================================
import { GET_ARTICLES } from '../utils/queries'

// PICTURES =================================================================


const Feed = () => {
    // const  user  = useContext(setContext)
    const { loading, data } = useQuery(GET_ARTICLES)
    // console.log(data)
    const isLoggedIn = Auth.loggedIn();
    const [visible, setVisble] = useState(false)
    const articleData = data?.getArticles || []

    useEffect(() => {
        setVisble(!!data)
    }, [data, setVisble])

    return (
        <>
            <Grid columns={1}>
                <Grid.Row className='page-title'>
                    <h1>Latest Articles</h1>
                </Grid.Row>
                <Grid.Row>
                    {/* if logged in show this form */}
                    {isLoggedIn && (
                        <GridColumn className='form-container'>
                            <ArticleForm>{/* component */}</ArticleForm>
                        </GridColumn>
                    )}

                    {/* Shows loading screen while fetching for article data */}
                    {loading ? (
                        <h1> Loading Articles...</h1>
                    ) : (
                        <Transition visible={visible} animation='scale' duration={500}>
                            <Container>
                                {articleData &&
                                    articleData.map((article, index) => (
                                        <Grid.Column key={index} style={{ margin: 20 }}>

                                            <ArticleCard article={article} />

                                        </Grid.Column>
                                    ))}
                            </Container>
                        </Transition>
                    )}
                </Grid.Row>
            </Grid>
        </>
    );
}


export default Feed;



