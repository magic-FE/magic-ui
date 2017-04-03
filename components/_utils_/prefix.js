export const prefixCls = 'magicd';

export default prefixCls;

/**
 * @param {String: to add prefix} classnames
 * @param {Array: not add prefix} otherClassNames
 */
export const classnamesPrefix = (classnames, otherClassNames) => classnames.split(' ').map(cls => `${prefixCls}-${cls}`).concat(otherClassNames).join(' ');
