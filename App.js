import React from 'react';
import { Button, Breadcrumb } from 'magicd';

const containerStyle = {
  padding: '20px',
  width: '60%',
  margin: '0 auto'
};
const buttonContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
};


class App extends React.Component {
  render() {
    return (
      <div style={containerStyle}>
        <div style={buttonContainer}>
          <Button >default</Button>
          <Button type="primary">primary</Button>
          <Button type="info" rippleCenter>info</Button>
          <Button type="danger" rippleMultiple={false}>danger</Button>
          <Button type="warning">warning</Button>
          <Button type="inverse">inverse</Button>
          <Button type="success" ripple={false} >success</Button>
          <Button ghost type="inverse">ghost</Button>
          <Button disabled >disabled</Button>
        </div>
        <Breadcrumb items={['首页', <a target="_top" href="http://www.baidu.com">我的桌面</a>, '桌面详情']} />
      </div>
    );
  }
}

export default App;
