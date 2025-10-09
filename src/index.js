import { isDebug, isMobile, getUrlParams, RandomString } from './core.js';
import { loadExternalResource, ServerChoose } from './net.js';
import { IndexedDBControl } from './storage.js';
import { DbgTimmer } from './debug.js';


if (typeof console !== 'undefined') console.log(`
+---------------------------------------------------------+

         %co     o          %co o o          %co
           %co o           %co               %co
            %co           %co                %co
            %co            %co               %co
            %co             %co o o          %co o o o%c    
     
+--------------------------------------------------------+

我们一日日度过的所谓的日常，实际上可能是接连不断的奇迹！--京阿尼《日常》`,
    'color:#ff0', 'color:#0f0', 'color:#0ff',
    'color:#ff0', 'color:#0f0', 'color:#0ff',
    'color:#ff0', 'color:#0f0', 'color:#0ff',
    'color:#ff0', 'color:#0f0', 'color:#0ff',
    'color:#ff0', 'color:#0f0', 'color:#0ff',
    'color #fff');

export {
    isDebug,
    isMobile,
    getUrlParams,
    ServerChoose,
    RandomString,
    loadExternalResource,
    DbgTimmer,
    IndexedDBControl
};