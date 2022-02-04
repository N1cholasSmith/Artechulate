import React from 'react';
import { useQuery } from '@apollo/client';
import { graphql } from 'graphql';
import '../styles/styles.css'

import  Hero  from '../components/Hero.js'

function Home() {
    // const { loading, data } = useQuery
  return <div>
          <Hero />

        <div className='spacer layer2'>

        </div>

  </div>;
}


export default Home;









