import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';


// IMPORT LIKE BUTTON =======================================================
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import '../styles/styles.css';
// PICTURES =================================================================
import Face from '../assets/images/face.jpg';
import VR from '../assets/images/VR.jpeg';
// AUTH =====================================================================
import Auth from '../utils/auth';



function ArticleCard({
    article: {
        title,
        body,
        createdAt,
        _id: id,
        username,
        likeCount,
        commentCount,
        likes
    },
}) {
    const user = Auth.getProfile().data;
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src={Face}
                />
                <Card.Header>@{username}</Card.Header>
                {/* <Card.Meta>{moment(createdAt).fromNow(true)} </Card.Meta> */}
                <Card.Meta>{createdAt} </Card.Meta>
                <Image src={VR} />
                <Card.Description className='article-card-title'>
                    {title}
                </Card.Description>
                <Card.Description className='article-card-body'>
                    {body}
                </Card.Description>
                <Button color='black' className='read-more-btn' as={Link} to={`/articles/${id}`}>
                    Read More
                </Button>
            </Card.Content>
            <Card.Content extra>

                <LikeButton user={user} article={{ id, likes, likeCount }} />
                <Button labelPosition='right'>
                    <Button color='blue' basic as={Link} to={`/articles/${id}`}>
                        <Icon name='comments' />
                        Comment
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {/* If users username matches user logged in, then they are shown a delete button */}
                {user && user.username === username && <DeleteButton articleId={id} />}



            </Card.Content>
        </Card>
    )
}

export default ArticleCard;












