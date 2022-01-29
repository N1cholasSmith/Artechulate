import React from "react";
import { Card, Icon, Label } from 'semantic-ui-react';


// <CloudinaryContext cloudName="n1cholassmith">
//   <div>
//   <Image publicId="sample" width="50" />
// </div>
// <Image publicId="sample" width="0.5" />
// </CloudinaryContext>

function ArticleCard({ article: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
    const { body, createdAt, id, username, likeCount, commentCount, likes } = props.ArticleCard

    return (
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='/images/avatar/large/molly.png'
                />
                <Card.Header>Molly Thomas</Card.Header>
                <Card.Meta>New User</Card.Meta>
                <Card.Description>
                    Molly wants to add you to the group <strong>musicians</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
                    </Button>
                    <Button basic color='red'>
                        Decline
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}













