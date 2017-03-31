const TRANSITIONS_MAPS = {
  transition: 'transitionend',
  OTransition: 'oTransitionEnd',
  MozTransition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd'
};

export default {
  getTransationEndEventName() {
    const keys = Object.keys(TRANSITIONS_MAPS);
    const len = keys.length;
    for (let i = 0; i < len; i += 1) {
      if (document.body.style[keys[i]]) {
        return keys[i];
      }
    }
    return null;
  },
  getMousePosition(event) {
    return {
      x: event.pageX - (window.scrollX || window.pageXOffset),
      y: event.pageY - (window.scrollY || window.pageYOffset)
    };
  }
};
