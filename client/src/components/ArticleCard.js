import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';

// import moment from 'moment'

// PICTURES
import Face from '../assets/images/face.jpg'



function ArticleCard({ article: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
    function likeArticle(){
        console.log('like Article')
    }
    function commentOnArticle(){
        console.log('comment On Article')
    }

    return (
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src={Face}
                />
                <Card.Header>{username}</Card.Header>
                {/* <Card.Meta as={Link} to={`/articles/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta> */}
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button as='div' labelPosition='right' onClick={likeArticle}>
                        <Button color='teal' basic>
                            <Icon name='heart' />
                            Like
                        </Button>
                        <Label  basic color='teal' pointing='left'>
                            {likeCount}
                        </Label>
                    </Button>
                    <Button as='div' labelPosition='right' onClick={commentOnArticle}>
                        <Button color='blue' basic>
                            <Icon name='comments' />
                            Comment
                        </Button>
                        <Label  basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}

export default ArticleCard;












