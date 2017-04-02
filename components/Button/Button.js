import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { classnamesPrefix } from '../_utils_/prefix';
import RippleEnhance from '../Ripple';
import './button.less';

const noop = () => {};

class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'warning',
      'primary',
      'danger',
      'success',
      'inverse',
      'info',
      'default'
    ]),
    children: PropTypes.any,
    size: PropTypes.oneOf([
      'xs',
      'sm',
      'lg',
      'hg'
    ]),
    ghost: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func
  }
  static defaultProps = {
    type: 'default',
    children: '',
    size: 'lg',
    ghost: false,
    disabled: false,
    onClick: noop,
    onMouseDown: noop,
    onMouseUp: noop
  }
  render() {
    const {
      type,
      children,
      size,
      ghost,
      disabled,
      onClick,
      onMouseDown,
      onMouseUp
    } = this.props;
    const cls = classnames(
      'btn',
      `btn-${type}`, { 'btn-ghost': ghost }, {
        [`btn-${size}`]: !!size
      }
    );
    return (
      <button
        className={classnamesPrefix(cls)}
        disabled={disabled}
        onClick={disabled ? null : onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {children}
      </button>
    );
  }
}
export default RippleEnhance()(Button);
