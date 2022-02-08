import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/styles.css';
import "../App.css"

function Navigation() {
  const pathname = window.location.pathname;
  //  /login
  const path = pathname === '/' ? 'home' : pathname.substring(1)
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <nav className="navbar navbar-expand-sm navbar-light" id="navbar">
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