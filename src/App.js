import './App.css';
import React, { lazy, useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Fallback from './components/Fallback';
import store from './state/store.js';
import HomeScreen from './components/HomeScreen';

// const Navbar = lazy(() => import('./components/Navbar'));
// const Rentals = lazy(() => import('./components/pages/Rentals'));
// const Services = lazy(() => import('./components/Services'));

// const Gallery = lazy(() => import('./components/Gallery'));
// const Contact = lazy(() => import('./components/pages/Contact'));
import Navbar from './components/Navbar';
import Rentals from './components/pages/Rentals';
import Services from './components/Services';
import Gallery from './components/Gallery';

const App = () => {
  store.subscribe(() => {
    console.log(store.getState());
  });

  const [loaded, setLoaded] = useState(false);

  const navbarColor = () => {
    const navLinks = Array.from(document.querySelectorAll('.nav-links'));
    for (const el of navLinks) {
      el.style.color = 'white';
    }
  };

  // const HomeScreen = lazy(() => {
  //   return Promise.all([
  //     import('./components/HomeScreen'),
  //     new Promise(resolve => setTimeout(resolve, 3000)), // Set minimum hang time in ms
  //   ]).then(([moduleExports]) => moduleExports);
  // });

  return (
    <>
      <BrowserRouter>
        {/* <div>loaded: {loaded ? 'yes' : 'no'}</div> */}
        <Suspense fallback={<Fallback loaded={Fallback} />}>
          <AnimatePresence>
            <Switch>
              <>
                <Navbar />
                <Route path="/" exact>
                  <HomeScreen />
                  {/* <Fallback /> */}
                </Route>
                <Route path="/rentals" exact component={Rentals} />
                <Route path="/services" component={Services} />
                <Route path="/gallery" exact component={Gallery} />
              </>
            </Switch>
          </AnimatePresence>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
