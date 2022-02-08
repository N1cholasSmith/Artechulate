import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Label, Icon } from 'semantic-ui-react'
import '../styles/styles.css'

import { DELETE_ARTICLE, DELETE_COMMENT } from '../utils/mutations';
import { GET_ARTICLES } from '../utils/queries';

function DeleteButton({ articleId, commentId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Delete if commentId otherwise its an article and delete with articleId
    const mutation = commentId ? DELETE_COMMENT : DELETE_ARTICLE;

    const [deleteArticleOrMutation] = useMutation(mutation, {
        update(proxy, result) {
            console.log(result)
            setConfirmOpen(false);
            if (!commentId) {
                // remove article from cache
                const data = proxy.readQuery({
                    query: GET_ARTICLES
                });
                // delete only the article with matching ID and filter out everything else
                // data.getArticles = [result.data.createArticle, ...data.getArticles]
                console.log(data.getArticles)
                console.log(articleId)

                data.getArticles = data.getArticles.filter(articles => articles.id !== articleId)
                proxy.writeQuery({ query: GET_ARTICLES, data })
            }
            if (callback) callback();
        },
        variables: {
            articleId,
            commentId
        }
    });

    return (
        <>
            <Button
                as='div'
                color='red'
                floated='right'
                onClick={() => setConfirmOpen(true)}>
                <Icon name='trash' style={{ margin: 0 }}></Icon>
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteArticleOrMutation}
            />
        </>
    )

}



export default DeleteButton;















