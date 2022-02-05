import React from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';

export default function HomeFeaturedArticleCards({ profilePic, username, title, img, body }) {
    return (
        <div className="col-sm-12 col-md-6 col-lg-4">
           
                <Card fluid className="featured-article-card">
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src={profilePic}
                        />
                        <Card.Header>{username}</Card.Header>
                        <Image src={img} />
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
                </Card>

        </div>


    )
}