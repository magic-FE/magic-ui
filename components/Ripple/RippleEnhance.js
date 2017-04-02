import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { getMousePosition } from '../_utils_/events';
import Ripple from './Ripple';

const defaultOptions = {
  isCenter: false,
  spread: 2,
  multiple: true
};

export default (options = {}) => {
  const {
    center, // eslint-disable-line
    spread, // eslint-disable-line
    multiple // eslint-disable-line
  } = {
    ...defaultOptions,
    ...options
  };
  return WrapperComponent =>
    class RippleEnhance extends Component {
      static propTypes = {
        rippleCenter: PropTypes.bool,
        rippleSpread: PropTypes.number,
        rippleMultiple: PropTypes.bool,
        children: PropTypes.any.isRequired
      }
      static defaultProps = {
        rippleCenter: center,
        rippleSpread: spread,
        rippleMultiple: multiple
      }
      constructor(props) {
        super(props);
        this.state = {
          rippleRectProps: {}
        };
      }
      getWrapperDescriptor = () => ReactDOM.findDOMNode(this).getBoundingClientRect() // eslint-disable-line
      getRippleDescriptor = ({ x, y }) => {
        const { left, top, height, width } = this.getWrapperDescriptor();
        const { rippleCenter, rippleSpread } = this.props;
        const rippleWidth = width * rippleSpread;
        return {
          left: rippleCenter ? (width - rippleWidth) / 2 : x - left - (rippleWidth / 2),
          top: rippleCenter ? (height - rippleWidth) / 2 : y - top - (rippleWidth / 2),
          width: rippleWidth,
          height: rippleWidth
        };
      }
      getNextKey() {
        this.currentCount = this.currentCount ? this.currentCount + 1 : 1;
        return `ripple${this.currentCount}`;
      }
      getLastKey() {
        return `ripple${this.currentCount}`;
      }
      addRipples = (clientRect) => {
        const { rippleRectProps } = this.state;
        const noRipplesActive = Object.keys(rippleRectProps).length === 0;
        const key = (this.props.rippleMultiple || noRipplesActive)
          ? this.getNextKey()
          : this.getLastKey();
        this.setState({
          rippleRectProps: {
            ...rippleRectProps,
            [key]: clientRect
          }
        });
      }
      removeFromState = (key) => {
        const rippleRectProps = [...this.state.rippleRectProps];
        delete rippleRectProps[key];
        this.setState({
          rippleRectProps
        });
      }
      renderWave = (key, clientRect) => (<Ripple
        key={key}
        indexKey={key}
        onfinish={this.props.rippleMultiple ? 0 : this.removeFromState}
        {...clientRect}
      />);
      handleOnMouseDown = (e) => {
        this.addRipples(this.getRippleDescriptor(getMousePosition(e)));
      }
      render() {
        const { rippleRectProps } = this.state;
        const ripples = Object.keys(rippleRectProps).map(
          key => this.renderWave(key, rippleRectProps[key])
        );
        const { rippleCenter, rippleSpread, rippleMultiple, children, ...otherProps } = this.props;
        return (
          <WrapperComponent
            onMouseDown={this.handleOnMouseDown}
            {...otherProps}
          >
            {ripples}
            {children}
          </WrapperComponent>
        );
      }
    };
};

