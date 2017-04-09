import React, { PureComponent } from 'react';

class BreadcrumbWithRouter extends PureComponent {
  render() {
    return (
      <span>{this.props.params.id}</span>  
    );
  }
}

export default BreadcrumbWithRouter;
