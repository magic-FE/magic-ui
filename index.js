import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Main from './App';

const MOUNT_NODE = document.querySelector('#root');

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;
    unmountComponentAtNode(MOUNT_NODE);
    render(<App />, MOUNT_NODE);
  });
}

render(<Main />, MOUNT_NODE);
