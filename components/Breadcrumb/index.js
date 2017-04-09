import React, { Component, PropTypes } from 'react';
import BreadcrumbItem from './BreadcrumbItem';

const paramRegx = /:([a-zA-Z_$][a-zA-Z0-9_$]*)/;
class Breadcrumb extends Component {
  static propTypes = {
    items: PropTypes.array,
    separator: PropTypes.string,
    routes: PropTypes.array,
    params: PropTypes.object,
    renderItem: PropTypes.func
  }
  static defaultProps = {
    items: [],
    separator: '/',
    routes: [],
    renderItem: null
  }
  render() {
    let breadcrumbItems;
    const { items, separator, routes, params, renderItem } = this.props;
    if (routes.length) {
      breadcrumbItems = routes.map(
        (route, index) => {
          let path = route.path;
          const match = paramRegx.exec(path);
          if (match) {
            path = path.replace(`:${match[1]}`, params[match[1]]);
          }
          const name = route.breadcrumbLabel || path.replace('/', '');
          return (
            <BreadcrumbItem key={path} separator={separator}>
              {typeof renderItem === 'function' ? renderItem(name, path, index, routes.length) : name}
            </BreadcrumbItem>
          );
        }
      );
    } else {
      breadcrumbItems = items.map(
        (item, index) => {
          let key = index;
          if (item.key) {
            key = item.key;
          }
          return (
            <BreadcrumbItem key={key} separator={separator}>
              {item}
            </BreadcrumbItem>
          );
        }
      );
    }
    return (
      <ul className={`${__PREFIX__}breadcrumb`}>
        {breadcrumbItems}
      </ul>
    );
  }
}

export default Breadcrumb;
