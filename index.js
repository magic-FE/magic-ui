import React from 'react';
import { render } from 'react-dom';
import { Button as Btn } from 'magicd';

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
        <Btn >default</Btn>
        <Btn type="primary">primary</Btn>
        <Btn type="info" rippleCenter>info</Btn>
        <Btn type="danger" rippleMultiple={false}>danger</Btn>
        <Btn type="warning">warning</Btn>
        <Btn type="inverse">inverse</Btn>
        <Btn type="success">success</Btn>
        <Btn ghost type="inverse">ghost</Btn>
        <Btn disabled >disabled</Btn>
      </div>
    );
  }
}

render(<App />, document.querySelector('#root'));
