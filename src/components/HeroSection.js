import React, { useState } from 'react';
// import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      {/* style={{opacity: `${1 + (-(1/800) * offsetY)}`}} (used to be used in the video element in the above line)*/}
      {/* transform: `translateY(${offsetY * 3}px)`, */}
      <h1
        className="header-1"
        style={{ opacity: `${-Math.sqrt(offsetY / 230) + 1}` }}
      >
        WE BRING EVENTS TO LIFE
      </h1>
      <p
        className="sub-header-1"
        style={{ opacity: `${-Math.sqrt(offsetY / 300) + 1}` }}
      >
        What are you waiting for?
      </p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
        <Button
          style={{ opacity: `${-Math.sqrt(offsetY / 300) + 1}` }}
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={() => console.log('hey')}
        >
          WATCH TRAILER <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
