import { Route } from 'react-router';
import React from 'react';
import Main from './App';
import BreadcrumbWithRouter from './BreadcrumbWithRouter';
import BreadcrumbWithRouterWithParam from './BreadcrumbWithParam';

export default (
  <Route path="/" component={Main} breadcrumbLabel="首页">
    <Route path="breadWithRouter" component={BreadcrumbWithRouter} breadcrumbLabel="面包">
      <Route path=":id" component={BreadcrumbWithRouterWithParam} />
    </Route>
  </Route>
);
