import React from 'react';
import HeroOne from '../assets/videos/hero1.mp4'
import { Button } from 'semantic-ui-react'





function Hero() {

    return (
        <>
            <div className='hero-container'>
                
                    <video src={HeroOne} className='hero-video video' autoPlay loop muted defaultplayback={0.1} />
                    <h1 className='text-reveal'>Artechulate</h1>
                    <h2 className='text-reveal'>The Information Hub for Articulating Technical Articles</h2>

                    <div className='hero-btns'>
                        <Button className='btn btn-reveal' inverted buttonsize='btn--large'>
                            GET STARTED
                        </Button>
                        <Button className='btn register-btn btn-reveal' buttonsize='btn--large'>
                            REGISTER
                        </Button>
                    </div>
                    <svg width="24" height="95" viewBox="0 0 24 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9393 94.0607C11.5251 94.6464 12.4749 94.6464 13.0607 94.0607L22.6066 84.5147C23.1924 83.9289 23.1924 82.9792 22.6066 82.3934C22.0208 81.8076 21.0711 81.8076 20.4853 82.3934L12 90.8787L3.51472 82.3934C2.92893 81.8076 1.97918 81.8076 1.39339 82.3934C0.807608 82.9792 0.807608 83.9289 1.39339 84.5147L10.9393 94.0607ZM10.5 -6.55671e-08L10.5 93L13.5 93L13.5 6.55671e-08L10.5 -6.55671e-08Z" fill="transparent" />
                    </svg>
            
            </div>
            <div className='spacer1 layer3'></div>



        </>
    )
}

export default Hero;