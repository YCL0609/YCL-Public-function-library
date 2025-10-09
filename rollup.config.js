// rollup.config.js

import terser from '@rollup/plugin-terser';

// 用于 UMD 格式的临时全局变量名，避免命名冲突
const TEMP_GLOBAL_NAME = '__YCL_GLOBAL_EXPORTS__';

export default {
    input: 'src/index.js',

    output: {
        file: 'dist/function.bundle.min.js',

        // 格式：umd (通用模块定义)，保证最大兼容性
        format: 'umd',

        // 临时挂载名：Rollup 将导出的对象赋给 window.__YCL_GLOBAL_EXPORTS__
        name: TEMP_GLOBAL_NAME,

        // 确保导出所有 API
        exports: 'named',

        // 通过 footer 注入全局挂载代码
        footer: `
            (function () {
                // 确保在浏览器环境
                if (typeof window === 'undefined') return;

                // 获取 Rollup 临时挂载的导出对象
                var exports = window['${TEMP_GLOBAL_NAME}'];
                
                if (exports) {
                    // 遍历导出的所有属性，直接挂载到 window
                    for (var key in exports) {
                        if (exports.hasOwnProperty(key)) {
                            window[key] = exports[key];
                        }
                    }
                    // 清理临时命名空间，保持 window 干净
                    delete window['${TEMP_GLOBAL_NAME}'];
                }
            })();
        `,
    },

    plugins: [
        terser({
            // 压缩配置
            compress: {
                // 启用尽可能的优化
                passes: 2
            },
            // 保留授权和重要的 JSDoc 注释
            format: {
                comments: false,
            }
        })
    ]
};