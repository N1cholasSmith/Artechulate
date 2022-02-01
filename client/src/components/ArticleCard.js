import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import '../styles/styles.css'

// import moment from 'moment'

// IMPORT AUTH CONTEXT TO DELETE IF LOGGED IN AND ARTICLE IS IDENTIFIED TO USER
import Auth from '../utils/auth'
import { setContext } from '@apollo/client/link/context';

// IMPORT LIKE BUTTON
import  LikeButton  from './LikeButton';

// PICTURES
import Face from '../assets/images/face.jpg';



function ArticleCard({ article: { title, body, createdAt, id, username, likeCount, commentCount, likes } 
}) {
    // const user = auth
    const { user } = useContext(setContext);

    return (
        <Card>
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
                <Card.Description>
                    {title}
                </Card.Description>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <LikeButton article={{ id, likes, likeCount}} />
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
                </div>
            </Card.Content>
        </Card>
    )
}

export default ArticleCard;












