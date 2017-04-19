import React, { PureComponent } from 'react';

class BreadcrumbWithRouter extends PureComponent {
  render() {
    return <span>路由测试{this.props.children}</span>;
  }
}

export default BreadcrumbWithRouter;
