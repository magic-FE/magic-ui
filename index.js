import React from 'react';
import { render } from 'react-dom';
import { Button } from 'magicd';

const containerStyle = {
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
};

class App extends React.Component {
  render() {
    return (
      <div style={containerStyle}>
        <Button >default</Button>
        <Button type="primary" >primary</Button>
        <Button type="info" >info</Button>
        <Button type="info" >info</Button>
        <Button type="danger" >default</Button>
        <Button type="warning" >warning</Button>
        <Button type="inverse" >inverse</Button>
        <Button type="success" >success</Button>
        <Button ghost >ghost</Button>
        <Button disabled >disabled</Button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#root'));
