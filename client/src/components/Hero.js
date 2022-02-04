import React from 'react';
import '../App'
import HeroOne from '../assets/videos/hero1.mp4'
import { Button } from 'semantic-ui-react'

function Hero() {
    return (
        <>
            <div className='hero-container'>
                <video src={HeroOne} className='hero-video' autoPlay loop muted />
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

            <script>
                let video = document.querySelector('video');

                {/* // Set the default playing speed */}
                video.defaultPlaybackRate = 0.2
            </script>
        </>
    )
}

export default Hero;