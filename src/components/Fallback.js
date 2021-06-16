import React, { useEffect } from 'react';
import './Fallback.css';

const Fallback = props => {
  useEffect(() => {
    // if (props.loaded) {
    //   document.querySelector('.container').style.animation =
    //     'fadeOut ease 1.5s';
    // }
    // const angleRadian = angle => {
    //   return angle * (Math.PI / 180);
    // };
    // const radius = (window.innerHeight / 100) * 22;
    // const circle = document.querySelector('#circular-text');
    // circle.style.left = '22vh';
    // circle.style.top = '22vh';
    // const text = circle.innerText;
    // const character = text.split('');
    // circle.innerText = null;
    // let angle = -90;
    // const deltaAngle = 360 / character.length;
    // character.forEach((char, index) => {
    //   const charElement = document.createElement('span');
    //   charElement.innerText = char;
    //   const xpos = radius * Math.cos(angleRadian(angle));
    //   const ypos = radius * Math.sin(angleRadian(angle));
    //   const transform = `translate(${xpos}px, ${ypos}px)`;
    //   const rotate = `rotate(${index * deltaAngle}deg)`;
    //   charElement.style.transform = `${transform} ${rotate}`;
    //   angle += deltaAngle;
    //   circle.appendChild(charElement);
    // });
  });

  return (
    <>
      {/* <div>{props.loaded ? 'yes' : 'no'}</div> */}
      <div className="container">
        {/* <div id="circular-text">
          • Mixone • Sound • Mixone • Sound{'\u00A0'}
        </div> */}
        <div
          className="logo"
          style={{
            background: `url(${
              process.env.PUBLIC_URL + '/images/logo-img.png'
            }) center 0 no-repeat`,
            backgroundSize: 'cover',
          }}
        ></div>
      </div>
    </>
  );
};

export default Fallback;
