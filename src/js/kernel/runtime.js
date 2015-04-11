// chrome.runtime
// -----------------
// ref:
//   - http://chrome.liuyixi.com/runtime.html

(function (root, factory) {
    'use strict';

    if ('function' === typeof define && define.amd) {
        define([], factory);
    } else {
        root.runtime = factory();
    }

}(window, function () {
    'use strict';

    var runtime = {
        // 扩展或应用的 ID
        id: chrome.runtime.id,
        // 扩展或应用的完整根路径
        baseURI: chrome.runtime.getURL(''),

        /* *
         * 将一个相对扩展或应用根目录的相对路径转换为完全路径
         *
         * @method getURL
         * @param {String} 扩展或应用中的资源路径
         * @returns {String} 完整路径
         * */
        getURL: function (path) {
            var fullPath = this.baseURI;

            if (path && 'string' === typeof path) {
                fullPath += path[0] === '/' ? path.substr(1) : path;
            }

            return fullPath;
        }
    };

    return Object.freeze(runtime);
}));