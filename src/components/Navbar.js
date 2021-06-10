import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useHistory } from 'react-router-dom';
import LogoName from '../assets/images/logo-name.png';
import LogoImage from '../assets/images/logo-img.png';
import './Navbar.css';

// Import SVG icons for mobile navbar
// import HomeIcon from '../assets/mobile-nav/home.svg';
// import GalleryIcon from '../assets/mobile-nav/Gallery.svg';
// import ServicesIcon from '../assets/mobile-nav/services.svg';
// import RentalsIcon from '../assets/mobile-nav/rentals.svg';

import HomeIcon from '@material-ui/icons/HomeRounded';
import GalleryIcon from '@material-ui/icons/PhotoLibraryRounded';
import ServicesIcon from '@material-ui/icons/TuneRounded';
import RentalsIcon from '@material-ui/icons/StorefrontRounded';
import ContactIcon from '@material-ui/icons/CallRounded';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LinkTransition from './LinkTransition';
import store from '../state/store.js';

const useStyles = makeStyles(theme => ({
  // dialogContainer: {
  //   backgroundColor: '#212121',
  //   zIndex: 999999,
  // },
}));

const NavbarMobile = props => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  return (
    <>
      <div className="navbar-mobile">
        <HomeIcon
          to="/"
          onClick={() => {
            try {
              document
                .querySelector('#hero-section')
                .scrollIntoView({ behavior: 'smooth' });
            } catch (err) {
              if (err instanceof TypeError) {
                history.push('/');
                (function checkExists() {
                  if (!document.querySelector('#hero-section')) {
                    window.requestAnimationFrame(checkExists);
                  } else {
                    document
                      .querySelector('#hero-section')
                      .scrollIntoView({ behavior: 'auto' });
                  }
                })();
              }
            }
          }}
          className="nav-mobile-icon"
        />
        <GalleryIcon
          onClick={() => {
            try {
              document
                .querySelector('#gallery')
                .scrollIntoView({ behavior: 'smooth' });
            } catch (err) {
              if (err instanceof TypeError) {
                history.push('/gallery');
                (function checkExists() {
                  if (!document.querySelector('#gallery')) {
                    window.requestAnimationFrame(checkExists);
                  } else {
                    document
                      .querySelector('#gallery')
                      .scrollIntoView({ behavior: 'auto' });
                  }
                })();
              }
            }
          }}
          className="nav-mobile-icon"
        />
        <ServicesIcon
          onClick={() => {
            try {
              document
                .querySelector('#services')
                .scrollIntoView({ behavior: 'smooth' });
            } catch (err) {
              if (err instanceof TypeError) {
                history.push('/services');
                (function checkExists() {
                  if (!document.querySelector('#services')) {
                    window.requestAnimationFrame(checkExists);
                  } else {
                    document
                      .querySelector('#services')
                      .scrollIntoView({ behavior: 'auto' });
                  }
                })();
              }
            }
          }}
          className="nav-mobile-icon"
        />
        <RentalsIcon
          onClick={() => {
            // closeMobileMenu();
            try {
              document
                .querySelector('#rentals')
                .scrollIntoView({ behavior: 'smooth' });
            } catch (err) {
              if (err instanceof TypeError) {
                history.push('/rentals');
                (function checkExists() {
                  if (!document.querySelector('#rentals')) {
                    window.requestAnimationFrame(checkExists);
                  } else {
                    document
                      .querySelector('#rentals')
                      .scrollIntoView({ behavior: 'auto' });
                  }
                })();
              }
            }
          }}
          className="nav-mobile-icon"
        />
        <ContactIcon className="nav-mobile-icon" onClick={handleClickOpen} />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

const Navbar = props => {
  const classes = useStyles();
  const history = useHistory();
  const [button, setButton] = useState(true);
  const [open, setOpen] = useState(0);
  const [onHome, setOnHome] = useState(true);
  store.subscribe(() => {
    console.log(store.getState());
    let state = store.getState();
    if (state.value) {
      setOnHome(true);
    } else {
      setOnHome(false);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openExternalURL = url => {
    let win = window.open(url, '_blank');
    win.focus();
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
      document.querySelector('.navbar').style.background = 'black';
    } else {
      setButton(true);
      document.querySelector('.navbar').style.background = 'transparent';
    }
  };

  const changeBackground = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 800) {
    } else {
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src={LogoImage} className="logo-image" />
          <img src={LogoName} className="logo-name" />
        </Link>
        <div className="navbar-container">
          <div className="menu-icon"></div>
          <ul className="nav-menu">
            <li className="nav-item">
              <LinkTransition
                className="nav-links"
                to="/"
                targetContainer="#root"
                sideEffect={true}
                props={props}
              >
                Home
              </LinkTransition>
            </li>
            <li className="nav-item">
              <LinkTransition
                className="nav-links"
                to="/gallery"
                targetContainer="#root"
                sideEffect={false}
                props={props}
              >
                Gallery
              </LinkTransition>
            </li>
            <li className="nav-item">
              <LinkTransition
                className="nav-links"
                to="/services"
                targetContainer="#root"
                sideEffect={false}
                props={props}
              >
                Services
              </LinkTransition>
            </li>
            <li className="nav-item">
              <LinkTransition
                className="nav-links"
                to="/rentals"
                targetContainer="#root"
                sideEffect={false}
                props={props}
              >
                Rentals
              </LinkTransition>
            </li>
            <li className="nav-item">
              <Link
                className="nav-links"
                onClick={() => {
                  openExternalURL('http://mixonesoundstage.com/');
                }}
              >
                Staging Website
              </Link>
            </li>
          </ul>

          <Button
            // to="/contact"
            buttonStyle="btn--nav"
            onClick={handleClickOpen}
          >
            Contact
          </Button>
        </div>
      </nav>

      <Dialog
        class={classes.dialogContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

      <NavbarMobile />
    </>
  );
};

export default Navbar;
