import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import allRoutes from './routes';

const MOUNT_NODE = document.querySelector('#root');
const renderfun = (routes) => {
  render(
    <Router history={hashHistory} >
      {routes}
    </Router>
    , MOUNT_NODE);
};

if (module.hot) {
  module.hot.accept('./routes', () => {
    const routes = require('./routes').default;
    unmountComponentAtNode(MOUNT_NODE);
    renderfun(routes);
  });
}


renderfun(allRoutes);
