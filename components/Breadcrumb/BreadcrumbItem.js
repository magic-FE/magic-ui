import React, { Component, PropTypes } from 'react';
import './breadcrumb.less';

class BreadcrumbItem extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    separator: PropTypes.string.isRequired
  }
  render() {
    const { children, separator } = this.props;
    return (
      <li data-breadcrumb-separator={separator}>
        {children}
      </li>
    );
  }
}

export default BreadcrumbItem;
