/**
 * 检查是否处于调试模式
 * @returns {boolean} 是否处于调试模式
 */
export function isDebug() {
    const urldebug = (getUrlParams('debug') !== undefined);
    const hostdebug = /^localhost|^127(?:\.0(?:\.0(?:\.0?)?)?\.0?)|(?:0*:)?::1$/i.test(window.location.hostname);
    return urldebug || hostdebug;
}

/**
 * 判断访问设备
 * @returns {boolean} true为手机, false为电脑
 */
export function isMobile() {
    // UA检测
    const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|SymbianOS|Windows Phone|iPad/i;
    const isMobileUA = mobileRegex.test(navigator.userAgent);
    // 视口宽度检测
    const isSmallScreen = window.innerWidth < 768;
    // 触摸能力检测
    const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    return isMobileUA || (hasTouch && isSmallScreen);
}

/**
 * 网页URL参数获取
 * @param {string} [name] 不传返回所有值，传入则返回对应值
 * @returns {string|object|undefined} 参数值或所有参数对象。如果URL中没有参数，返回空对象或undefined。
 */
export function getUrlParams(name) {
    const urlSearch = window.location.search;
    if (!urlSearch || urlSearch === '?') {
        if (urlSearch && urlSearch.indexOf('?') === 0 && urlSearch.length === 1) {
            return false;
        }
    }
    const params = new URLSearchParams(urlSearch);
    if (!name) {
        const allParams = {};
        for (const [key, value] of params.entries()) {
            allParams[key] = value;
        }
        return allParams;
    } else {
        const value = params.get(name);
        return value === null ? undefined : value;
    }
}

/**
 * 生成指定长度的随机字符串
 * @param {number} [length=32] - 随机字符串的长度，默认32位
 * @returns {string} 一个长度为 length 的随机字符串
 */
export function RandomString(length = 32) {
    const chatr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const result = new Array(length);
    for (let i = 0; i < length; i++) result[i] = chatr.charAt(Math.floor(Math.random() * chatr.length));
    return result.join('');
}