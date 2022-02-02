import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
// import moment from 'moment'

// IMPORT LIKE BUTTON =======================================================
import  LikeButton  from './LikeButton';
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
        _id : id, 
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
                <Button color='black' className='read-more-btn'>
                    Read More
                </Button>
            </Card.Content>
            <Card.Content extra>
                {/* <div className='ui two buttons'> */}
                    <LikeButton user={user} article={{ id, likes, likeCount}} />
                    <Button labelPosition='right' as={Link} to={`/articles/${id}`}>
                        <Button color='blue' basic>
                            <Icon name='comments' />
                            Comment
                        </Button>
                        <Label  basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                    {/* If users username matches user logged in, then they are shown a delete button */}
                    {user && user.username === username && (
                    <Button 
                        as='div' 
                        color='red' 
                        floated='right'
                        onClick={() => console.log('Delete Post')}>
                        <Icon name='trash' style={{ margin: 0 }}></Icon>
                    </Button>
                    )}
                {/* </div> */}
            </Card.Content>
        </Card>
    )
}

export default ArticleCard;












