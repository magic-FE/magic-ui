import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { classnamesPrefix } from '../_utils_/prefix';
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
    onClick: PropTypes.func
  }
  static defaultProps = {
    type: 'default',
    children: '',
    size: '',
    ghost: false,
    disabled: false,
    onClick: noop
  }
  render() {
    const {
      type,
      children,
      size,
      ghost,
      disabled,
      onClick
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
      >
        {children}
      </button>
    );
  }
}

export default Button;
