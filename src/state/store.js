import { createStore } from 'redux';

// Centralized state data stored using redux
const reducer = (state = { value: true }, action) => {
  switch (action.type) {
    case 'onHome':
      return { value: true };
    case 'offHome':
      return { value: false };
    default:
      return state;
  }
};

let store = createStore(reducer);

export default store;
