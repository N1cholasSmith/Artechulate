import React from 'react';
import '../App'
// import  ProfileOne  from '../assets/videos/profile1.mp4'
// import  ProfileTwo  from '../assets/videos/profile2.mp4'
import  ProfileThree  from '../assets/videos/profile3.mp4'
import { Button } from 'semantic-ui-react'

function ProfileHero () {
  return (
    <div className='hero-container'>
        <video src={ProfileThree} autoPlay loop muted />
        <h1>Jimmy Ryan</h1>
        <h2>Welcome</h2>

       <div className='hero-btns'>
           <Button className='btns about-me-btn' inverted buttonsize='btn--large'>
                SAVED ARTICLES
           </Button>
           <Button className='btns'  buttonsize='btn--large'>
               ABOUT ME
           </Button>

       </div>


    </div>
  )
}

export default ProfileHero;