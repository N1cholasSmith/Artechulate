import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Label, Icon } from 'semantic-ui-react'
import '../styles/styles.css'

import { LIKE_ARTICLE } from '../utils/mutations'

function LikeButton({ user, article: { id, likeCount, likes } }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // User can only like if theyre logged in and match user.username
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [user, likes]);

    const[likeArticle] = useMutation(LIKE_ARTICLE, {
        variables: { articleId: id}
    });

    // IF user is logged in and liked (DISPLAY = solid)
    // if user is logged in but hasnt liked (DISPLAY = Basic outlined)
    // IF user likes but isnt logged in, they will be redirect to the /login page
    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
                Like
            </Button>
        ) : (
            <Button color='teal' basic>
                <Icon name='heart' />
                Like
            </Button>
        ) 
    ) : (
        <Button as={Link} to='/login' color='teal' basic>
            <Icon name='heart' />
            Like
        </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likeArticle}>
            {likeButton}
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}





export default LikeButton;