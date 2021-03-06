
import { useMutation, useQuery } from '@apollo/client';
import React, { useRef, useState } from 'react';
// import moment from "moment";
import { useParams } from 'react-router-dom';
import {
    Grid,
    Image,
    Loader,
    Dimmer,
    Segment,
    Card,
    Button,
    Icon,
    Label,
    Form,
} from 'semantic-ui-react'

// Components ===============================================================
import Face from '../assets/images/face.jpg';
import VR from '../assets/images/VR.jpeg';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
// STYLES ===================================================================
import '../styles/styles.css'
// IMPORTING AUTH AND CONTEXT ===============================================
import Auth from '../utils/auth';
// QUERIES AND MUTATIONS ====================================================
import { CREATE_COMMENT } from '../utils/mutations';
import { GET_ARTICLE } from '../utils/queries'

function SingleArticle(props) {
    const { articleId } = useParams();
    // console.log(articleId);

    const user = Auth.getProfile().data
    const loggedIn = Auth.loggedIn()

    // CHANGE STATE OF COMMENT FORM ONCE COMMENT IS SUBMITTED
    const commentInputRef = useRef(null)

    const [comment, setComment] = useState('')

    // data: {getArticle}
    const { loading, data } = useQuery(GET_ARTICLE, {
        variables: {
            articleId,
        },
    });
    const articleData = data?.getArticle || []


    const [createComment] = useMutation(CREATE_COMMENT, {
        update() {
            setComment('')
            // blurs form placeholder once comment has been submitted
            commentInputRef.current.blur();
        },
        variables: {
            articleId,
            body: comment,
        },
    });

    function deleteArticleCallback() {
        props.history.push('/Feed')
    }

    let articleMarkup;
    if (loading) {
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
            _id: id,
            body,
            createdAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount,
        } = articleData;

        articleMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>

                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Image
                                    floated='right'
                                    size='mini'
                                    src={Face}
                                />
                                <Card.Header>@{username}</Card.Header>
                                {/* <Card.Meta>{moment(createdAt).fromNow(true)} </Card.Meta> */}
                                <Card.Meta>{createdAt}</Card.Meta>
                                <Image src={VR} />
                                <Card.Description className='article-card-title'>
                                    {title}
                                </Card.Description>
                                <Card.Description className='single-article-card-body'>
                                    {body}
                                </Card.Description>
                            </Card.Content>

                            <Card.Content extra>
                                <LikeButton user={user} article={{ id, likeCount, likes }}></LikeButton>
                                <Button labelPosition='right' onClick={() => console.log('Comment on Post')}>
                                    <Button color='blue' basic >
                                        <Icon name='comments' />
                                        Comments
                                    </Button>
                                    <Label basic color='blue' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton articleId={id} callback={deleteArticleCallback} />
                                )}

                            </Card.Content>
                        </Card>
                        {/* ADD COMMENT ================================================================================== */}
                        {user && loggedIn && (
                            <Card fluid>
                                <Card.Content>
                                    <p> Post a comment</p>
                                    <Form>
                                        <div className='ui action input fluid'>
                                            <input
                                                type='text'
                                                placeholder='comment'
                                                name='comment'
                                                value={comment}
                                                onChange={event => setComment(event.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button type='submit'
                                                className='ui button teal'
                                                // Button disabled if placeholder is empty
                                                disabled={comment.trim() === ''}
                                                onClick={createComment}
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {/* MAP COMMENTS ================================================================================= */}
                        {comments.map((comment) => (

                            <Card fluid key={comment.length}>
                                <Card.Content>
                                    {/* IF USER LOGGED IN MATCHES USERNAME OF COMMENT DELETE BUTTON WILL DISPLAY */}
                                    {user && user.username === comment.username && (
                                        <DeleteButton className='delete-btn' articleId={id} commentId={id} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    {/* <Card.Meta>{moment(createdAt).fromNow(true)} </Card.Meta> */}
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
    return articleMarkup;
};

export default SingleArticle;