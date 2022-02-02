
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    GridColumn,
    Image,
    Loader,
    Dimmer,
    Segment,
    Card,
    Button,
    Icon,
    Label
} from 'semantic-ui-react'
// IMPORTING AUTH AND CONTEXT ===============================================
import '../styles/styles.css'
// PICTURES =================================================================
import Face from '../assets/images/face.jpg';
import VR from '../assets/images/VR.jpeg';
// IMPORTING AUTH AND CONTEXT ===============================================
import Auth from '../utils/auth';
// QUERIES ==================================================================
import { GET_ARTICLE } from '../utils/queries'
import { GraphQLDirective } from 'graphql';
import LikeButton from '../components/LikeButton';


function SingleArticle(props){
    const articleId = props.match.params.articleId;
    const isLoggedIn = Auth.loggedIn();

    const { getArticle } = useQuery(GET_ARTICLE, {
        
        variables: {
            articleId
        },
    })
    console.log(getArticle)

    let articleMarkup;
    if(!getArticle){
        articleMarkup = 
        <Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>
        <h1>Loading Article...</h1>
      </Segment>
    } else {
        const { 
            title, 
            _id : id, 
            body,  
            createdAt, 
            username,
            comments,
            likes,
            likeCount,
            commentCount, 
        } = getArticle;

        articleMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    <Image 
                        floated='right'
                        size='mini'
                        src={Face}
                    />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                {/* <Card.Meta as={Link} to={`/articles/${id}`}>
                                {moment(createdAt).fromNow(true)} 
                                </Card.Meta> */}
                                <Image src={VR} />
                                <Card.Description className='article-card-title'>
                                    {title}
                                </Card.Description>
                                <Card.Description className='article-card-body'>
                                    {body}
                                </Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton {...isLoggedIn} article={{ id, likeCount, likes }}>
                                    <Button 
                                    as='div'
                                    labelPosition='right'
                                    onClick={() => console.log('Comment on Post')}
                                    >
                                        <Button basic color='blue'>
                                            <Icon name='comments'/>
                                            <Label basic color='blue' pointing='left'>
                                                {commentCount}
                                            </Label>
                                        </Button>

                                    </Button>
                                </LikeButton>
                            </Card.Content>
                        </Card>
              
                    </Grid.Column>
                    
                    
                </Grid.Row>
            </Grid>
        )
    }
    
}

export default SingleArticle;