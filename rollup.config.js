// rollup.config.js

import terser from '@rollup/plugin-terser';

// 用于 UMD 格式的临时全局变量名，避免命名冲突
const TEMP_GLOBAL_NAME = '__YCL_GLOBAL_EXPORTS__';
// Banner 内容
const bannerText = `/*!
 * YCL public function Library by @YCL with MIT License
 * Built: ${new Date().toISOString().slice(0, 10)}
 */`;

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

        // 添加Banner
        banner: bannerText,

        // 通过 footer 注入全局挂载代码
        footer: `
            (function () {
                if (typeof window === 'undefined') return;
                var exports = window['${TEMP_GLOBAL_NAME}'];
                if (exports) {
                    for (var key in exports) {
                        if (exports.hasOwnProperty(key)) {
                            window[key] = exports[key];
                        }
                    }
                    delete window['${TEMP_GLOBAL_NAME}'];
                }
            })();
        `,
    },

    plugins: [
        terser({
            compress: {
                passes: 2 // 压缩
            },
            format: {
                comments: /^\!/, // 保持Banner
            }
        })
    ]
};