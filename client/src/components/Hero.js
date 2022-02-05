import React from 'react';
import HeroOne from '../assets/videos/hero1.mp4'
import { Button } from 'semantic-ui-react'





function Hero() {
    
    return (
        <>
            <div className='hero-container'>
                <video src={HeroOne} className='hero-video video' autoPlay loop muted defaultplayback={0.1} />
                <h1>Artechulate</h1>
                <h2>The Information Hub for Articulating Technical Articles</h2>

                <div className='hero-btns'>
                    <Button className='btn' inverted buttonsize='btn--large'>
                        GET STARTED
                    </Button>
                    <Button className='btn register-btn' buttonsize='btn--large'>
                        REGISTER
                    </Button>
                </div>
            </div>
            <div className='spacer1 layer3'></div>

           

        </>
    )
}

export default Hero;