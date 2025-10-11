/**
 * 异步加载资源函数
 * @param {string} url 资源路径
 * @param {string} type 资源类型 ('js' 或 'css')
 * @param {boolean} [isModule=false] js资源是否为module (设置 <script type="module">)
 * @returns {Promise<void>} 返回一个Promise对象
 */
export function loadExternalResource(url, type, isModule = false) {
    if (typeof document === 'undefined' || !document.head) {
        const envError = new Error('loadExternalResource: Must be executed in DOM environment.');
        return Promise.reject(envError);
    }

    return new Promise((resolve, reject) => {
        let tag;
        if (type === "css") {
            tag = document.createElement("link");
            tag.rel = "stylesheet";
            tag.href = url;
        } else if (type === "js") {
            tag = document.createElement("script");
            if (isModule) tag.type = "module";
            tag.src = url;
            tag.async = true;
        } else {
            const error = new Error(`loadExternalResource: Invalid type "${type}".`);
            return reject(error);
        }
        tag.onload = () => resolve();
        tag.onerror = () => {
            const loadError = new Error(`Failed to load resource: ${url}`);
            reject(loadError);
        };
        document.head.appendChild(tag);
    });
}

/**
 * 选择最快的服务器
 *
 * @param {string[]} TestURLs 需要测试的服务器 URL 数组
 * @param {boolean} [isDebug=false] 调试模式：输出详细结果到控制台。
 * @returns {Promise<object[]>} 一个对象数组，包含每个服务器的 URL、耗时、是否出错、出错信息、是否最快等信息。
 */
export async function ServerChoose(TestURLs, isDebug = false) {
    if (!Array.isArray(TestURLs) || TestURLs.length === 0) {
        if (isDebug) console.warn("TestURLs 数组为空或无效。");
        return [];
    }
    const TIMEOUT_MS = 3000;
    const results = await Promise.all(
        TestURLs.map(async (url, index) => {
            const controller = new AbortController();
            const start = performance.now();
            let timeoutId;
            const timeoutPromise = new Promise((_, reject) => {
                timeoutId = setTimeout(() => {
                    controller.abort();
                    reject(new Error(`Timeout after ${TIMEOUT_MS}ms`));
                }, TIMEOUT_MS);
            });

            try {
                const testUrl = `${url.endsWith('/') ? url : url + '/'}test.bin`;
                const fetchPromise = fetch(testUrl, { signal: controller.signal });
                const response = await Promise.race([fetchPromise, timeoutPromise]);
                clearTimeout(timeoutId);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText || ''}`);
                }
                await response.arrayBuffer();
                return { url, elapsedTime: performance.now() - start, isError: false, error: null, index };
            } catch (error) {
                clearTimeout(timeoutId);
                const end = performance.now();
                return {
                    url,
                    elapsedTime: end - start,
                    isError: true,
                    error: error.message || error.toString(),
                    index
                };
            }
        })
    );
    const validResults = results.filter(r => !r.isError);
    const minElapsedTime = validResults.length > 0
        ? Math.min(...validResults.map(r => r.elapsedTime))
        : Infinity;
    const finalResults = results.map(result => ({
        url: result.url,
        elapsedTime: Number(result.elapsedTime.toFixed(2)),
        isError: result.isError,
        errorMessage: result.error,
        isFastest: !result.isError && result.elapsedTime === minElapsedTime,
    }));
    if (isDebug) {
        finalResults.forEach(e => {
            const timeColor = e.isFastest ? '#00ff7f' : (e.elapsedTime < 1000 ? '#ffff00' : '#ffffff');
            const errorColor = e.isError ? '#ff4500' : '#32cd32';
            console.log(
                `%c[${e.isFastest ? 'FASTEST' : 'NORMAL'}] %cURL: ${e.url} | %c耗时: ${e.elapsedTime}ms | %c出错: ${e.isError}`,
                `font-weight: bold; color: ${e.isFastest ? '#00ff7f' : '#1e90ff'}`,
                'color: #ffffff',
                `color: ${timeColor}; font-weight: bold;`,
                `color: ${errorColor}; font-weight: bold;`
            );
            if (e.isError) {
                console.log(`%c错误信息: ${e.errorMessage}`, 'color:red');
            }
        });
    }
    return finalResults;
}