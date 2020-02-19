import { createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './ducks';

const store = createStore(rootReducer, composeWithDevTools());

export default store;
