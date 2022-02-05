import React from 'react';
import { useQuery } from '@apollo/client';
import { graphql } from 'graphql';
import '../styles/styles.css'

// COMPONENTS ===================================================================================================
import Hero from '../components/Hero.js'
import HomeAbout from '../components/HomeAbout'
import HomeArticleCards from '../components/HomeArticleCards'

function Home() {
  // const { loading, data } = useQuery
  return <div>
    <Hero />
    <div className='ui container'>
      <HomeAbout />
      <HomeArticleCards />
    </div>
    

  </div>;
}


export default Home;









