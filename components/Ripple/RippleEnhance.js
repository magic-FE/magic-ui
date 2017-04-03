import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { getMousePosition } from '../_utils_/events';
import Ripple from './Ripple';

const defaultOptions = {
  isCenter: false,
  spread: 2,
  multiple: true
};

const noop = () => { };

export default (options = {}) => {
  const {
    center,
    spread,
    multiple
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
        children: PropTypes.any.isRequired,
        onMouseDown: PropTypes.func,
        disabled: PropTypes.bool,
        style: PropTypes.object,
        ripple: PropTypes.bool
      }
      static defaultProps = {
        rippleCenter: center,
        rippleSpread: spread,
        rippleMultiple: multiple,
        onMouseDown: noop,
        disabled: false,
        style: {},
        ripple: true
      }
      constructor(props) {
        super(props);
        this.state = {
          rippleRectProps: {}
        };
      }
      rippleNodes = {}
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
        if (
          this.rippleNodes[key] && !this.props.rippleMultiple
        ) {
          // if singleRipple, we should restart the animate, and send the new rectProps
          this.rippleNodes[key].animateScale(clientRect);
          return; // we should stop setState(re-render) in this component;
        }
        this.setState({
          rippleRectProps: {
            ...rippleRectProps,
            [key]: clientRect
          }
        });
      }
      removeFromState = (key) => {
        const rippleRectProps = { ...this.state.rippleRectProps };
        delete rippleRectProps[key];
        delete this.rippleNodes[key];
        this.setState({
          rippleRectProps
        });
      }
      renderWave = (key, clientRect) => (<Ripple
        key={key}
        ref={(node) => { this.rippleNodes[key] = node; }}
        indexKey={key}
        {...clientRect}
        onfinish={this.removeFromState}
      />);
      handleOnMouseDown = (e) => {
        const { ripple } = this.props;
        if (this.props.disabled) return;
        if (typeof this.props.onMouseDown === 'function') this.props.onMouseDown(e);
        if (ripple) this.addRipples(this.getRippleDescriptor(getMousePosition(e)));
      }
      render() {
        const { rippleRectProps } = this.state;
        const ripples = Object.keys(rippleRectProps).map(
          key => this.renderWave(key, rippleRectProps[key])
        );
        const {
           rippleCenter,
           rippleSpread,
           rippleMultiple,
           children,
           style,
           ...otherProps } = this.props;
        return (
          <WrapperComponent
            {...otherProps}
            onMouseDown={this.handleOnMouseDown}
            style={Object.assign({}, { position: 'relative' }, { style })}
          >
            {children}
            {ripples}
          </WrapperComponent>
        );
      }
    };
};

