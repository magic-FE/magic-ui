import React from 'react';
import { Button, Breadcrumb } from 'magicd';
import { Link } from 'react-router';

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

const renderItem = (name, path, index, length) => index === length - 1 ? name : <Link to={path}>{name}</Link>;

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.any
  }
  static defaultProps = {
    children: ''
  }
  render() {
    const { routes, params } = this.props;
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
        <Breadcrumb routes={routes} params={params} renderItem={renderItem} />
        <ul>
          <li><Link to="/" >首页</Link></li>
          <li><Link to="/breadWithRouter" >面包片</Link>
            <ul>
              <li><Link to="breadWithRouter/1" >面包片1</Link></li>
              <li><Link to="breadWithRouter/2" >面包片2</Link></li>
            </ul>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;
