/**
 * @class DbgTimmer
 * 性能调试计时器。通过创建实例并调用 setEnable(true) 来启用计时功能。
 */
export class DbgTimmer {
    #isEnabled = false;
    #timings = new Map();
    /**
     * 构造函数。默认情况下计时器是禁用的。
     * @param {boolean} [startEnabled=false] - 如果为 true，则创建时即启用计时器。
     */
    constructor(startEnabled = false) {
        this.#isEnabled = startEnabled
    }
    /**
     * 设置计时器的启用状态。
     * @param {boolean} [status=false] - 如果为 true 则启用计时器，否则禁用。
     * @returns {void}
     */
    setEnable(status = false) {
        this.#isEnabled = status;
        if (!this.#isEnabled) this.#timings.clear();
    }
    /**
     * 开始一个名为 name 的计时。
     * 只有在计时器启用时才记录当前高精度时间。
     * @param {string} [name='noname'] - 计时器的名称。
     * @returns {void}
     */
    Start(name = 'noname') {
        if (!this.#isEnabled) return;
        this.#timings.set(name, performance.now());
    }
    /**
     * 停止名为 name 的计时，计算经过时间，并输出结果到控制台。
     * 如果计时器未启用或未找到起始时间，则不执行任何操作。
     * @param {string} [name='noname'] - 要停止的计时器的名称。
     * @param {string} [text=''] - 输出时显示的前缀文本。
     * @returns {number | undefined} 经过的时间（毫秒），如果未计时则返回 undefined。
     */
    Stop(name = 'noname', text = '') {
        if (!this.#isEnabled) return;
        const startTime = this.#timings.get(name);
        if (!startTime) return undefined;
        const now = performance.now();
        const time = now - startTime;
        if (typeof console !== 'undefined') {
            console.log(`${text || name}: %c${time}ms`, 'color: #6495ed');
        }
        this.#timings.delete(name);
        return time;
    }
}