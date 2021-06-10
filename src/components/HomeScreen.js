import React, { useState, useEffect } from 'react';
import './HomeScreen.css';
import { Button } from './Button';
import { Link, useHistory } from 'react-router-dom';
import store from '../state/store.js';

import LinkTransition from './LinkTransition';

import TextAnimation from './TextAnimation';

const DynamicButton = props => {
  const clickHandler = () => {
    store.dispatch({ type: 'offHome' });
    console.log(props.url);
  };

  return (
    <LinkTransition to={props.url} targetContainer="#root">
      <button
        onClick={clickHandler}
        className="dynamic-btn"
        style={{ top: props.posY }}
      >
        {props.displayText}
      </button>
    </LinkTransition>
  );
};

const HomeScreen = props => {
  const history = useHistory();
  const [offsetY, setOffsetY] = useState(0);
  const [fade, setFade] = useState(0);
  const [fade2, setFade2] = useState(0);
  const [frame, setFrame] = useState(1);

  let previousY = 0;

  const scrollClick = tag => {
    console.log(`Tag: ${tag}`);
    try {
      document.querySelector(`#${tag}`).scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      if (err instanceof TypeError) {
        history.push('/');
        (function checkExists() {
          if (!document.querySelector(`#${tag}`)) {
            window.requestAnimationFrame(checkExists);
          } else {
            document
              .querySelector(`#${tag}`)
              .scrollIntoView({ behavior: 'auto' });
          }
        })();
      }
    }
  };

  const handleScroll = () => {
    let currentY = Math.abs(
      document.querySelector('#hero-section').getBoundingClientRect().y
    );
    let frameCount = currentY / window.innerHeight + 1;

    setOffsetY(currentY);

    // Set frame count for scroll arrow opacity
    if (frameCount == 1) {
      setFrame(1);
    } else if (frameCount == 2) {
      setFrame(2);
    } else if (frameCount == 3) {
      setFrame(3);
    } else if (frameCount == 4) {
      setFrame(4);
    } else {
      setFrame(-1);
    }

    previousY = currentY;
  };

  // Make navbar elements white
  useEffect(() => {
    document
      .querySelector('#subWindow')
      .addEventListener('scroll', handleScroll);

    const navLinks = Array.from(document.querySelectorAll('.nav-links'));
    for (const el of navLinks) {
      el.style.color = 'white';
    }

    const contact = document.querySelector('.btn.btn--nav.btn--medium');
    contact.style.border = '1px solid white';
    contact.style.color = 'white';

    document.querySelector('.logo-name').style.filter = 'brightness(100)';
    document.querySelector('.logo-image').style.filter = 'brightness(100)';
  }, []);

  return (
    <>
      <div id="subWindow" className="full-card-container">
        <div className="section" id="hero-section">
          <video
            src="/videos/landing-video.mp4"
            autoPlay
            loop
            muted
            playsinline="true"
            disablePictureInPicture="true"
          />
          {/* <h1 style={{ top: offsetY * 1.05 }} className="hero-h">
              WE BRING EVENTS TO LIFE
            </h1>
            <p style={{ top: offsetY * 1.1 }} className="hero-p">
              what are you waiting for
            </p> */}

          <TextAnimation></TextAnimation>
          {/* <div
            className="scroll-mobile"
            style={{ opacity: frame == 1 ? 0.7 : 0 }}
            onClick={() => scrollClick('gallery')}
          >
            <div
              className="scroll-mobile-anim"
              style={{ opacity: frame == 1 ? 0.7 : 0 }}
            ></div>
          </div>

          <p
            className="hero-scroll"
            style={{ opacity: frame == 1 ? 0.7 : 0 }}
            onClick={() => scrollClick('gallery')}
          >
            {'\u02EC'}
          </p>
        </div>

        <div
          id="gallery"
          className="section"
          style={{
            background: `#DF928E url(${
              process.env.PUBLIC_URL + '/images/sample-2.jpg'
            }) center 0 no-repeat`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        >
          <h1
            style={{
              top:
                offsetY * 1.2 -
                window.innerHeight -
                window.innerHeight * 0.1809,
            }}
            className="hero-h"
          >
            Gallery
          </h1>
          <p
            style={{
              top:
                offsetY * 1.3 -
                window.innerHeight -
                window.innerHeight * 0.2766,
            }}
            className="hero-p"
          >
            Take a look into our extensive catalog
          </p>
          <DynamicButton
            displayText="Explore"
            url="/gallery"
            posY={
              offsetY * 1.3 - window.innerHeight - window.innerHeight * 0.2606
            }
          />
          <div
            className="scroll-mobile"
            style={{ opacity: frame == 2 ? 0.7 : 0 }}
            onClick={() => scrollClick('services')}
          >
            <div
              className="scroll-mobile-anim"
              style={{ opacity: frame == 2 ? 0.7 : 0 }}
            ></div>
          </div>
          <p
            className="hero-scroll"
            style={{ opacity: frame == 2 ? 0.7 : 0 }}
            onClick={() => scrollClick('services')}
          >
            {'\u02EC'}
          </p>
        </div>

        <div
          id="services"
          className="section"
          style={{
            background: `#EAD2AC url(${
              process.env.PUBLIC_URL + '/images/sample-4.jpg'
            }) center 0 no-repeat`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        >
          <h1
            style={{
              top:
                (offsetY * 2.1) / 2 -
                window.innerHeight -
                window.innerHeight * 1.0688,
            }}
            className="hero-h"
          >
            Services
          </h1>
          <p
            style={{
              top:
                (offsetY * 2.2) / 2 -
                window.innerHeight -
                window.innerHeight * 1.1652,
            }}
            className="hero-p"
          >
            See what we have to offer
          </p>
          <DynamicButton
            displayText="Explore"
            url="/services"
            posY={
              (offsetY * 2.3) / 2 -
              window.innerHeight -
              window.innerHeight * 1.2486
            }
          />
          <div
            className="scroll-mobile"
            style={{ opacity: frame == 3 ? 0.7 : 0 }}
            onClick={() => scrollClick('rentals')}
          >
            <div
              className="scroll-mobile-anim"
              style={{ opacity: frame == 3 ? 0.7 : 0 }}
            ></div>
          </div>
          <p
            className="hero-scroll"
            style={{ opacity: frame == 3 ? 0.7 : 0 }}
            onClick={() => scrollClick('rentals')}
          >
            {'\u02EC'}
          </p>
        </div>

        <div
          id="rentals"
          className="section"
          style={{
            background: `#D1DEDE url(${
              process.env.PUBLIC_URL + '/images/sample-3.jpg'
            }) center 0 no-repeat`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        >
          <h1
            style={{
              top:
                (offsetY * 2.1) / 2 -
                window.innerHeight -
                window.innerHeight * 2.084,
            }}
            className="hero-h"
          >
            Rentals
          </h1>
          <p
            style={{
              top:
                (offsetY * 2.2) / 2 -
                window.innerHeight -
                window.innerHeight * 2.2352,
            }}
            className="hero-p"
          >
            You want it, we got it
          </p>
          <DynamicButton
            displayText="Explore"
            url="/rentals"
            posY={
              (offsetY * 2.3) / 2 -
              window.innerHeight -
              window.innerHeight * 2.3812
            }
          /> */}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
