import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
// Components ===============================================================
import Face from '../assets/images/face.jpg';
import AI from '../assets/images/AI.jpeg'

function ProfileAbout() {
    return (
        <>
            <h1 className='text-center about-title'> About</h1>
            <p className='text-center about-p'>
                Part Time Astronaught who has lived in a space capusale for the last 30days, I specialize in landscaping and creative dancing.
                I have advanced degrees in Artifical Intelligence and Machine Learning. These Skills have allowed me to creatively design innovative
                solutions to overcome problems only encountered on a space station.
            </p>
            <br></br>

            <p className='text-center about-p'>
                I'm an acreditted investor and focus on disruptive technologies such as Cyprocurrency and Constellation Network. Through Constellation Network I have found tremendously promising buisness opportunities such as Aklimi Exchange who are focused on
            </p>
            <br></br>
            <p className='text-center about-p'>
                Artechulate solves the trilemma of bringing in new users, motivating content creators, and motivating individuals to maintain the website.
                Artechulate is an innovative solution to reward every member of strong communities in a self-sustaining Web3.0 application. Artechulate
                is paving the way for a new standard of websites.
            </p>
            <br></br>
            <section id="profile-featured-card">
                <div className="container m-2 p-1" />
                <div className="row mb-5">
                    <div className="col-12 featured-article-container">

                        <h1 className='text-center about-title'>Featured Article</h1>
                        <div className="col-sm-12 col-md-10 col-lg-8 ">

                            <Card fluid className="profile-featured-article-card">
                                <Card.Content>
                                    <Image
                                        floated='right'
                                        size='mini'
                                        src={Face}
                                    />
                                    <Card.Header>JimmyRyan</Card.Header>
                                    <Image src={AI} />
                                    <Card.Description className='article-card-title'>
                                        AI in 2022
                                    </Card.Description>
                                    <Card.Description className='article-card-body'>
                                        AI looks vastly different in such an agile and innovative space. Adapting to changes is the biggest hurdle but with the assistance of AI Technology and leveraging it with Machine Learning. We welcome the year 2022 which will be monumental. There has never been a more exciting time to be alive in history.
                                    </Card.Description>
                                    <div className='featured-card-footer'>
                                        <Button color='black' className='read-more-btn'>
                                            Read More
                                        </Button>
                                        <div className='rating'>
                                            Rating
                                            <Card.Description className='featured-card-rating'>
                                                '8.9/10'
                                            </Card.Description>
                                        </div>
                                    </div>
                                </Card.Content>
                            </Card>

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}


export default ProfileAbout;