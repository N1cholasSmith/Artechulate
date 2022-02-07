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
            'AI looks vastly different in such an agile and innovative space. Adapting to changes is the biggest hurdle but with the assistance of AI Technology and leveraging it with Machine Learning. We welcome the year 2022 which will be monumental. There has never been a more exciting time to be alive in history.',
        rating: '9.7/10',
        articleId: '1'
    },
    {
        username: '@SethV',
        profilePic: Face,
        img: AI,
        title:'Machine Learning',
        body:
            "Machine learning leverage's agile frameworks to provide a robust synopsis for high level overviews. Learning from Wyatt Meldman Floch who worked for NASA on the kelper space crafter telescope and implimented machine learning so advanced. It's currrently looking for alien life as it traverse's through space.",
        rating: '8.9/10',
        articleId: '2'
    },
    {
        username: '@digbickBot',
        profilePic: Face,
        img: SM,
        title:'Cryptographic Smart Cities',
        body:
            'Constellation Network powering smart cities on their Distributed ledger Technology (DLT). The cryptographically secure data source is currently being utlized by the US department of defence and all things pending it is looking to set its goals with smart cities and enconomies. This vision is being realising in recent times with the advancement of DOR technologies beinging this seamingly digital space to the real world to track foot track which is proving to be more valuable by the day. The future looks bright for Constellation Network.',
        rating: '9.2/10',
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