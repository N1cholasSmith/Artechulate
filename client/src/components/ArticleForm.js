import React, { useState } from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import { useMutation, useQuery } from "@apollo/client";

// IMPORT HOOK
import { useForm } from '../utils/hooks';
import { CREATE_ARTICLE } from "../utils/mutations";
import { GET_ARTICLES } from '../utils/queries';

// AUTH *******
import Auth from '../utils/auth';

const ArticleForm = () => {
    const [articleFormData, setArticleFormData] = useState({
        title: '',
        body: ''
    });

    const onChangeFormData = (event) => {
        const name = event.target.name
        const value = event.target.value

        setArticleFormData({
            ...articleFormData,
            [name]:value
        })
    }

    const [createArticle, { error }] = useMutation(CREATE_ARTICLE, {
        update(proxy, result) {
            console.log(result)
            // holding all the cache data inside the data variable
            const data = proxy.readQuery({
                // GET_ARTICLE...??
                query: CREATE_ARTICLE
            })
            // displays the newly created article at the top of the feed by updating the proxy to refresh
            // then displays get articles underneath which is already sorted in order of time on server
            data.getArticles = [result.data.createArticle, ...data.getArticles]
            proxy.writeQuery({ query: CREATE_ARTICLE, data })
            console.log(articleFormData)
            setArticleFormData({title: '', body: ''});
        }
    });

    function onSubmit(event) {
        event.preventDefault();
        // const {body, title} = articleFormData
        createArticle({variables: {...articleFormData} })
    }

    return (
        <div className='article-form'>
            <Form onSubmit={onSubmit} style={{ margineBottom: 20 }}>
                <h2>Create a Article</h2>
                <Form.Field>
                        <Form.Input
                            placeholder='Title'
                            name='title'
                            onChange={onChangeFormData}
                            value={articleFormData.title}
                            error={error ? true : false}
                        />
                        {/* WAS FORM.INPUT */}
                        <TextArea
                            placeholder='Article Body'
                            name='body'
                            onChange={onChangeFormData}
                            value={articleFormData.body}
                            error={error ? true : false}
                        />
                    <Button type='submit' color='teal'>
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className='ui error message' style={{ margineBottom: 20 }}>
                    <ul className='list'>
                        {/* {error.graphQLErrors[0].message} */}
                        <li>{error[0]}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ArticleForm;
