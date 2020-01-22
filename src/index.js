import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import css from './assets/style/main.css';

import App from './App';

const title = 'Rick & Morty Show';

ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);

// eslint-disable-next-line no-undef
module.hot.accept();
