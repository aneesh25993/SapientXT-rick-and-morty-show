import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const title = 'Rick & Morty Show';

ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);

// eslint-disable-next-line no-undef
module.hot.accept();
