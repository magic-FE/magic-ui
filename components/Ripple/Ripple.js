import React, { PropTypes, Component } from 'react';
import 'web-animations-js';
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
    this.animateScale();
  }
  animateScale = ({ left, top } = { }) => {
    if (this.scale) this.scale.cancel();
    // because this.opacity is exist,so this is re-animate and we should cancel the opacity
    // stop the remove action
    if (this.opacity) this.opacity.cancel();
    if (left && top) {
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
    }
    this.scale = this.element.animate([
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
      onfinish(indexKey);
    };
  }
  render() {
    const { left, top, width } = this.props;
    const style = { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${width}px` };
    return (
      <span onMouseUp={this.up} className={`${__PREFIX__}ripple-wrapper`} ref={(node) => { this.wrapElement = node; }}>
        <span style={style} ref={(node) => { this.element = node; }} className={`${__PREFIX__}ripple`} />
      </span>
    );
  }
}

export default Ripple;
