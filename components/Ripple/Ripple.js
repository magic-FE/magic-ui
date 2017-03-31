import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { classnamesPrefix, prefixCls } from '../_utils_/prefix';
import { getTransationEndEventName, getMousePosition } from '../_utils_/events';

const defaultOptions = {
  isCenter: false,
  spread: 2,
  multiple: true
};

export default (options) => {
  const {
    center, // eslint-disable-line
    spread, // eslint-disable-line
    multiple // eslint-disable-line
  } = {
    ...defaultOptions,
    ...options
  };
  return wrapperComponent =>
    class RippleWrapper extends Component {
      propTypes = {
        rippleCenter: PropTypes.bool,
        rippleSpread: PropTypes.number,
        rippleMutiple: PropTypes.bool
      }
      defaultProps = {
        rippleCenter: center,
        rippleSpread: spread,
        rippleMutiple: multiple
      }
      constructor(props) {
        super(props);
        this.state = {
          ripples: {}
        };
      }
      rippleNodes = {}
      getWrapperDescriptor = () => ReactDOM.findDOMNode(this).getBoundingClientRect() // eslint-disable-line
      getRippleDescriptor = (x, y) => {
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
      getNextRippleKey = () => {
        this.rippleCount = this.rippleCount ? this.rippleCount + 1 : 1;
        return `magicd-ripple${this.rippleCount}`;
      }
      getLastRippleKey = () => `magicd-ripple-${this.rippleCount}`
      animateRipple = (event) => {
        const { left, top, height, width } = this.getRippleDescriptor(getMousePosition(event));
        const { ripples } = this.state;
        const noRippleActive = Object.keys(ripples).length === 0;
        const key = this.getNextRippleKey();
        const initialState = {
          active: false,
          restarting: true,
          top,
          left,
          height,
          width
        };
        const runningState = {
          active: true,
          restarting: false
        };
        this.setState({
          ripples: {
            ...this.state.ripples,
            [key]: initialState
          }
        }, () => {
          this.setState({
            ripples: {
              ...this.state.ripples,
              [key]: Object.assign({}, this.state.ripples[key], runningState)
            }
          });
        });
      }
      renderRipple(key, className, { active, left, restarting, top, width }) {
        const scale = restarting ? 0 : 1;
        const transform = `scale(${scale})`;
        const _className = classnames(this.props.theme.ripple, {
          [this.props.theme.rippleActive]: active,
          [this.props.theme.rippleRestarting]: restarting,
        }, className);
        return (
          <span key={key} data-react-toolbox="ripple" className={this.props.theme.rippleWrapper} {...props}>
            <span
              className={_className}
              ref={(node) => { if (node) this.rippleNodes[key] = node; }}
              style={prefixer({ transform }, { width, height: width })}
            />
          </span>
        );
      }
      render() {

      }
    };
};
