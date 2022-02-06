import React from 'react';
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react';

// SOCIAL ICONS =======================================================
import Facebook from '../assets/images/facebook-logo.png'
import Instagram from '../assets/images/instagram-logo.png'
import LinkedIn from '../assets/images/linkedin-logo.png'
import Twitter from '../assets/images/twitter-logo.png'


function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-large-screens'>
                <section className='footer-subscription'>
                    <p className='footer-subscription-heading'>
                        Join the Artechulate Monthly Newsletter
                    </p>
                    <div className='input-areas'>
                        <Form>
                            <Form.Field>
                                <Form.Input
                                    type='email'
                                    name='email'
                                    placeholder='James@gmail.com'
                                    className='Footer-input' />
                                <Button className='footer-subscribe' inverted>Subscribe</Button>
                            </Form.Field>
                        </Form>
                    </div>
                </section>
                <div className='footer-links'>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>About Us</h2>
                            <Link to='/Login'>Login</Link>
                            <Link to='/Register'>Register</Link>
                            <Link to='/'>Web3.0 Generative Model</Link>
                            <Link to='/'>Become a Content Creator</Link>
                            <Link to='/'>Terms of Service</Link>
                        </div>
                        <div className='footer-link-items'>
                            <h2>Contact Us</h2>
                            <Link to='/'>Login</Link>
                            <Link to='/'>Register</Link>
                            <Link to='/'>How to be Featured</Link>
                            <Link to='/'>Events</Link>
                            <Link to='/'>Sponsorships</Link>
                        </div>
                    </div>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>Videos</h2>
                            <Link to='/'>Ambassadors</Link>
                            <Link to='/'>Agency</Link>
                            <Link to='/'>Influencer</Link>
                        </div>
                        <div className='footer-link-items'>
                            <h2>Social Media</h2>
                            <Link to='/'>Facebook</Link>
                            <Link to='/'>Instagram</Link>
                            <Link to='/'>YouTube</Link>
                            <Link to='/'>Twitter</Link>
                            <Link to='/'>LinkedIn</Link>
                        </div>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            Ar<span className='footer-tech'>tech</span>ulate
                        </Link>
                    </div>
                    <small className='website-rights'>Artechulate © 2022</small>
                    <div className='social-icons'>
                        <Link className='social-icon-link facebook'
                            to='/'
                            target='_blank'
                            arial-label='Facebook'>
                            <img className='logo' src={Facebook} alt='Facebook'></img>
                        </Link>
                        <Link className='social-icon-link instagram'
                            to='/'
                            target='_blank'
                            arial-label='Instgram'>
                            <img className='logo' src={Instagram} alt='Instagram'></img>
                        </Link>
                        <Link className='social-icon-link twitter'
                            to='/'
                            target='_blank'
                            arial-label='Twitter'>
                            <img className='logo' src={Twitter} alt='Twitter'></img>
                        </Link>
                        <Link className='social-icon-link linkedin'
                            to='/'
                            target='_blank'
                            arial-label='LinkedIn' >
                            <img className='logo' src={LinkedIn} alt='LinkedIn'></img>
                        </Link>
                    </div>
                </div>
            </section>
        </div>


    )
};


export default Footer;