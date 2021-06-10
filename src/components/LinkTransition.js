import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import store from '../state/store.js';

const LinkTransition = ({
  to,
  children,
  sideEffect,
  className,
  targetContainer = '#root',
}) => {
  const history = useHistory();

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  const delayTransition = async (event, sideEffect = false) => {
    console.log(`to: ${to}`);
    let inner_dir =
      window.location.href.split('/')[
        window.location.href.split('/').length - 1
      ];
    console.log(`inner_dir: ${inner_dir}`);

    if (to.replace('/', '') == inner_dir) {
      return;
    }

    // if (sideEffect) {
    //   store.dispatch({ type: 'onHome' });
    // } else {
    //   store.dispatch({ type: 'offHome' });
    // }
    event.preventDefault();

    const opacity_start = 1;

    const opacity_floor = 0.8;
    const transition_time_ms = 250;
    const transition_interval_ms = 10;
    const number_of_increments = transition_time_ms / transition_interval_ms;

    const opacity_delta =
      (opacity_start - opacity_floor) / number_of_increments;

    // Fade out current page with given targetContainer selector
    let opacity_accumulator = opacity_start;
    for (let interval = 0; interval < number_of_increments; interval++) {
      opacity_accumulator -= opacity_delta;
      document.querySelector(targetContainer).style.opacity =
        opacity_accumulator;
      await sleep(transition_interval_ms);
    }

    await history.push(to);

    // Fade in next page with same targetContainer selector
    // Wait for the element to load
    let page_loaded = async () => {
      let target = document.querySelector(targetContainer);
      if (target != null) {
        return true;
      }
      await sleep(1);
    };

    while (true) {
      // If the target selector is not null, begin fading
      if (await page_loaded()) {
        for (let interval = 0; interval < number_of_increments; interval++) {
          opacity_accumulator += opacity_delta;
          document.querySelector(targetContainer).style.opacity =
            opacity_accumulator;
          await sleep(transition_interval_ms);
        }
        break;
      }
    }
  };
  return (
    <>
      <Link
        to={to}
        onClick={event => delayTransition(event, sideEffect)}
        class={className}
      >
        {children}
      </Link>
    </>
  );
};

export default LinkTransition;
