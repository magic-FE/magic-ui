import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Main from './App';
import BreadcrumbWithRouter from './BreadcrumbWithRouter';
import BreadcrumbWithRouterWithParam from './BreadcrumbWithParam';

const MOUNT_NODE = document.querySelector('#root');
const renderfun = (App) => {
  render(
    <Router history={hashHistory} >
      <Route path="/" component={App} breadcrumbLabel="首页" >
        <Route path="breadWithRouter" component={BreadcrumbWithRouter} breadcrumbLabel="面包" >
          <Route path=":id" component={BreadcrumbWithRouterWithParam} />
        </Route>
      </Route>
    </Router>
    , MOUNT_NODE);
};

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;
    unmountComponentAtNode(MOUNT_NODE);
    renderfun(App);
  });
}


renderfun(Main);
