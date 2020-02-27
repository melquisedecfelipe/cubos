import React from 'react';
import { Router } from 'react-router-dom';

import history from './services/history';
import { Provider } from 'react-redux';

import Routes from './routes';

import store from './store';
import './App.scss';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
}
