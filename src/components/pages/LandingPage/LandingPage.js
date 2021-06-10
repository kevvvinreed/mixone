import './LandingPage.css';

import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import  Navbar  from '../../Navbar';

const LandingPage = () => {

  const [offsetY, setOffsetY] = useState(0);
  const [button, setButton] = useState(true);

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }
  const handleScroll = () => setOffsetY(window.pageYOffset);

  window.addEventListener('resize', showButton);
  // if (offsetY > 0) {
  //   document.querySelector('.navbar').style = 'box-shadow: 0px 0px 5px gray;'
  // }
  // else {
  //   document.querySelector('.navbar').style = 'box-shadow: 0px 0px 0px gray;'
  // }
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div class='landing-page-container'>
        {/*  style={{ transform: `translateY(${offsetY * 1}px)` }} */}
        {/* <span class='navbar' style={{ transform: `translateY(${offsetY * 1}px)` }}> 
          <Link to='/' class='navbar-logo'>
          
          </Link>
          <ul>
            <li class='nav-item'>
              <Link to='/contact' class='nav-links'>
                Contact
              </Link>
            </li>
            <li class='nav-item'>
              <Link to='/services' class='nav-links'>
                Services
              </Link>
            </li>
            <li class='nav-item'>
              <Link to='/photo-gallery' class='nav-links'>
                Photo Gallery
              </Link>
            </li>
            <li class='nav-item'>
              <Link to='/about' class='nav-links'>
                About
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>TEST</Button>}
        </span> */}
        <span class='break'></span>
        <span class='carousel' style={{ transform: `translateY(${offsetY * -0.8}px)` }} ></span>
        <span class='break'></span>
        <span class='scroll-down-display'></span>
      </div>
    </>
  );
}

export default withRouter(LandingPage);