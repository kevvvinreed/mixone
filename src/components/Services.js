import React, { useEffect, useState } from 'react';
import './Services.css';

// Audio, Lighting, Video, LED, Backline, Staging, Drafting & Design

const Services = props => {
  // Initialize the page based on the URL
  let startService =
    window.location.href.split('/')[window.location.href.split('/').length - 1];
  console.log(window.location.href);
  console.log(startService);
  let updateFlag = false;

  const validQuery = [
    'audio',
    'lighting',
    'video',
    'led',
    'backline',
    'staging',
    'drafting-and-design',
  ];
  // Check to see if a valid query was made, and update the page accordingly
  for (let i = 0; i < validQuery.length; i++) {
    if (startService == validQuery[i]) {
      startService = validQuery[i];
      updateFlag = true;
    }
  }
  // If an invalid query was made, redirect to the default (audio) service
  if (!updateFlag) {
    startService = 'audio';
    window.history.replaceState(null, '', '/services/audio');
  }

  // Save the selected service to a state variable, and initialize it with the desired start service
  const [selectedService, setSelectedService] = useState(startService);
  // const [backgroundImg, setBackgroundImg] = useState();
  // This is to handle the issue encountered with using 'Drafting & Design'
  // as a selector
  const compare = () => {
    if (selectedService == 'drafting-and-design') {
      return true;
    } else {
      return false;
    }
  };

  const ServicesNav = props => {
    const onClick = props => {
      console.log(`Previous service: ${selectedService}`);
      setSelectedService(props.target.id);
      // setBackgroundImg({
      //   background: `url(${
      //     process.env.PUBLIC_URL + `/service-images/${props.target.id}.jpg`
      //   }) center 0 no-repeat`,
      //   backgroundSize: 'cover',
      //   backgroundAttachment: 'fixed',
      // });
      console.log(`Updated service: ${props.target.id}`);
    };

    useEffect(() => {
      document.querySelector(`#${selectedService}`).style.textDecoration =
        'underline';
      window.history.replaceState(null, '', `/services/${selectedService}`);
    });

    return (
      <>
        <div className="sub-nav-container">
          <span className="sub-nav-separator-left">.</span>
          <span className="sub-nav-item" id="audio" onClick={onClick}>
            Audio
          </span>
          <span className="sub-nav-separator">.</span>
          <span className="sub-nav-item" id="lighting" onClick={onClick}>
            Lighting
          </span>
          <span className="sub-nav-separator">.</span>
          <span className="sub-nav-item" id="video" onClick={onClick}>
            Video
          </span>
          <span className="sub-nav-separator">.</span>
          <span className="sub-nav-item" id="led" onClick={onClick}>
            LED
          </span>
          <span className="sub-nav-separator">.</span>
          <span className="sub-nav-item" id="backline" onClick={onClick}>
            Backline
          </span>
          <span className="sub-nav-separator">.</span>
          <span className="sub-nav-item" id="staging" onClick={onClick}>
            Staging
          </span>
          <span className="sub-nav-separator">.</span>
          <span
            className="sub-nav-item"
            id="drafting-and-design"
            onClick={onClick}
          >
            Drafting & Design
          </span>
          <span className="sub-nav-separator-right">.</span>
        </div>
      </>
    );
  };

  useEffect(() => {
    document.querySelector('#display-img').style.backgroundSize = 'cover';

    document.querySelector('#display-img').style.backgroundAttachment = 'fixed';
  });
  return (
    <>
      {console.log(`/images/services/${selectedService}.jpg`)}
      <div className="services-container">
        <div
          id="display-img"
          className="display-box"
          style={{
            background: `url(${
              process.env.PUBLIC_URL + `/images/services/${selectedService}.jpg`
            }) center 0 no-repeat`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        >
          <h1 className="service-name">
            {compare() ? 'Drafting & Design' : selectedService}
          </h1>
        </div>
        <ServicesNav selected={selectedService} />
      </div>
    </>
  );
};

export default Services;
