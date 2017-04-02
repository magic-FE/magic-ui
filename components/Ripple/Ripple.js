import React, { PropTypes, Component } from 'react';
import { prefixCls } from '../_utils_/prefix';
import './ripple.less';

class Ripple extends Component {
  static propTypes = {
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    onfinish: PropTypes.any.isRequired,
    indexKey: PropTypes.any.isRequired
  }
  componentDidMount() {
    this.element.animate([
        { transform: 'scale(0)' },
        { transform: 'scale(1)' }
    ], {
      duration: 800,
      easing: 'cubic-bezier(.22,.67,.52,.92)',
      fill: 'forwards'
    });
  }
  up = () => {
    const { onfinish, indexKey } = this.props;
    this.opacity = this.element.animate([
      { opacity: 0.66 },
      { opacity: 0 }
    ], { duration: 800, easing: 'cubic-bezier(.22,.67,.52,.92)', fill: 'forwards' });
    this.opacity.onfinish = () => {
      if (typeof onfinish === 'function') return onfinish(indexKey);
      return this.wrapElement.remove();
    };
  }
  render() {
    const { left, top, width } = this.props;
    const style = { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${width}px` };
    return (
      <span onMouseUp={this.up} className={`${prefixCls}-ripple-wrapper`} ref={(node) => { this.wrapElement = node; }}>
        <span style={style} ref={(node) => { this.element = node; }} className={`${prefixCls}-ripple`} />
      </span>
    );
  }
}

export default Ripple;
