// the source from https://github.com/JedWatson/classnames, make some change

const hasOwn = {}.hasOwnProperty;
const classNames = (prefix = '') => (...prefixClassses) => (...noPrefixClasses) => {
  const classes = [];
  prefixClassses.forEach((arg) => {
    if (!arg) return;
    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      classes.push(`${prefix}${arg}`);
    } else if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
    } else if (argType === 'object') {
      for (const key in arg) { // eslint-disable-line
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(`${prefix}${key}`);
        }
      }
    }
  });
  return classes.concat(noPrefixClasses).join(' ');
};

export default classNames;
