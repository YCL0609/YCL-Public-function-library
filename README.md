# YCL Public Library
一个 JavaScript 公共函数库，包含常用工具函数，使用 Rollup 打包。
## 项目概述
这是一个小型的公共函数集合，入口文件为 `src/index.js`。打包配置为 `rollup.config.js`，输出文件为`dist/function.bundle.min.js`。
## 构建
需要node.js环境
```bash
git clone https://github.com/YCL0609/YCL-Public-library.git
cd YCL-Public-library
npm i
npm run build
```
## 函数清单
```javascript
/**
 * 检查是否处于调试模式
 * @returns {boolean} 是否处于调试模式
 */
isDebug();

/**
 * 判断访问设备
 * @returns {boolean} true为手机, false为电脑
 */
isMobile();

/**
 * 网页URL参数获取
 * @param {string} [name] 不传返回所有值，传入则返回对应值
 * @returns {string|object|undefined} 参数值或所有参数对象，若URL中没有参数返回空对象，当给定参数不存在返回 undefined。
 */
getUrlParams();

/**
 * 生成指定长度的随机字符串
 * @param {number} [length=32] - 随机字符串的长度，默认32位
 * @returns {string} 一个长度为 length 的随机字符串
 */
RandomString();

/**
 * 测试并选择最快的服务器
 * @param {string[]} TestURLs 需要测试的服务器 URL 数组
 * @param {boolean} [isDebug=false] 调试模式：输出详细结果到控制台。
 * @returns {Promise<object[]>} 一个对象数组，包含每个服务器的 URL、耗时、是否出错、出错信息、是否最快等信息。
 */
ServerChoose();

/**
 * 异步加载资源函数
 * @param {string} url 资源路径
 * @param {string} type 资源类型 ('js' 或 'css')
 * @param {boolean} [isModule=false] js资源是否为ES module
 * @param {boolean} [isasync=false] js资源是否为异步加载
 * @returns {Promise<void>} 返回一个Promise对象
 */
loadExternalResource();

/**
 * @class DbgTimmer
 * 性能调试计时器。通过创建实例并调用 setEnable(true) 来启用计时功能。
 */
class DbgTimmer {};

/**
 * @class IndexedDBControl
 * 基于 Promise 封装的 IndexedDB 数据库操作静态类。
 */
class IndexedDBControl{};
```