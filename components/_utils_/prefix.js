export const prefixCls = 'magicd';

export default prefixCls;

export const classnamesPrefix = (classnames, prefix = prefixCls) => classnames.split(' ').map(cls => `${prefix}-${cls}`).join(' ');
