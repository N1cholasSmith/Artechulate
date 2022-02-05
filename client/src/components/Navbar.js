import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap'
// import { Menu, Segment, Sticky, Grid } from 'semantic-ui-react'
// import { useMediaQuery } from 'react-responsive'
import '../styles/styles.css';
import "../App.css"






function Navigation() {
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  // console.log(isTabletOrMobile)

  const pathname = window.location.pathname;
  //  /login
  const path = pathname === '/' ? 'home' : pathname.substring(1)
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    // <Sticky>
    //         <Menu pointing secondary size='massive' color='teal'>
    //           <Menu.Item
    //             name='home'
    //             active={activeItem === 'home'}
    //             onClick={handleItemClick}
    //             as={Link}
    //             to='/'
    //           />
    //           <Menu.Item
    //             name='profile'
    //             active={activeItem === 'profile'}
    //             onClick={handleItemClick}
    //             as={Link}
    //             to='/Profile'
    //           />
    //           <Menu.Item
    //             name='feed'
    //             active={activeItem === 'feed'}
    //             onClick={handleItemClick}
    //             as={Link}
    //             to='/Feed'
    //           />
    //           <Menu.Menu position='right'>
    //             <Menu.Item
    //               name='login'
    //               active={activeItem === 'login'}
    //               onClick={handleItemClick}
    //               as={Link}
    //               to='/Login'
    //             />
    //             <Menu.Item
    //               name='register'
    //               active={activeItem === 'register'}
    //               onClick={handleItemClick}
    //               as={Link}
    //               to='/Register'
    //             />
    //           </Menu.Menu>
    //         </Menu>
    // </Sticky >
 
      <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#project">Ar<span className='tech'>tech</span>ulate</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link px-4" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="/Profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4 feed-nav" to="/Feed">Feed</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link px-4" to="/Register">Register</Link>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    
  );
}

export default Navigation;