import React, { Component, PropTypes } from 'react';
import BreadcrumbItem from './BreadcrumbItem';

class Breadcrumb extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    separator: PropTypes.string
  }
  static defaultProps = {
    separator: '/'
  }
  render() {
    const { items, separator } = this.props;
    const breadcrumbItems = items.map(
      item => <BreadcrumbItem separator={separator}>{item}</BreadcrumbItem>
    );
    return (
      <ul className={`${__PREFIX__}breadcrumb`}>
        {breadcrumbItems}
      </ul>
    );
  }
}

export default Breadcrumb;
