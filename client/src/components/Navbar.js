import React, { useState} from 'react';
import { Link } from "react-router-dom";
import '../styles/styles.css';

import "../App.css"
function Navbar() {
    const pathname = window.location.pathname;
    //  /login
    const path = pathname === '/' ? 'home' : pathname.substring(1)
    const [activeItem, setActiveItem] = useState(path);
    const handleItemClick = (e, { name }) => this.setActiveItem(name)
    
    return (
    <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
        <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#project">Artechulate</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link px-4" active={activeItem === 'home'} name='home' onClick={handleItemClick} 
                to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link px-4" active={activeItem === 'profile'} name='profile' onClick={handleItemClick} 
                to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link px-4" active={activeItem === 'feed'} name='feed' onClick={handleItemClick} 
                to="/feed">Feed</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link px-4" active={activeItem === 'login'} name='login' onClick={handleItemClick} 
                to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link px-4" active={activeItem === 'register'} name='register' onClick={handleItemClick} 
                to="/register">Register</Link>
            </li>
      
            </ul>
        </div>
        </div>
    </nav>
    );
}

export default Navbar;