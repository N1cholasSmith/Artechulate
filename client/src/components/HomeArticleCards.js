import React from 'react';

import { Card, Icon, Label, Image, Button, Container } from 'semantic-ui-react';
// import moment from 'moment'

// COMPONENTS ===============================================================
import '../styles/styles.css';
import HomeFeaturedArticleCards from '../components/HomeFeaturedArticleCards'
// PICTURES =================================================================
import Face from '../assets/images/face.jpg';
import AI from '../assets/images/AI.jpeg'
import ML from '../assets/images/ML.jpeg'
import SM from '../assets/images/smart-city.jpeg'

// AUTH =====================================================================
// import Auth from '../utils/auth';

const articles = [
    {
        username: '@JimmyRyan',
        profilePic: Face,
        img: ML,
        title:'AI in 2022',
        body:
            'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
        rating: '9.7/10',
        articleId: '1'
    },
    {
        username: '@SethV',
        profilePic: Face,
        img: AI,
        title:'AI in 2022',
        body:
            'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
        rating: '',
        articleId: '2'
    },
    {
        username: '@digbickBot',
        profilePic: Face,
        img: SM,
        title:'AI in 2022',
        body:
            'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
        rating: '',
        articleId: '3'
    },
]

// const CardExampleGroupCentered = () => <Card.Group centered items={items} />


function HomeArticleCards() {
    return (
        <>
         <section id="home-article-cards">
        <div className="container m-2 p-1"/>
          <div className="row mb-5">
            <div className="col-12">
              <h1 className="fw-bold text-center featured-articles mb-4">Featured Articles</h1>
              {/* <hr/> */}
            </div>
            <div className="row d-flex justify-content-center">
                {articles.map( (article, index) => (
                    <HomeFeaturedArticleCards 
                    key={index} 
                    username={article.username} 
                    profilePic={article.profilePic}
                    img={article.img} 
                    title={article.title}
                    body={article.body}
                    rating={article.rating}
                    articleId={article.articleId}
                    />
                    )  
                )}
            </div>
          </div>
      </section>

        </>
    )
}

export default HomeArticleCards;