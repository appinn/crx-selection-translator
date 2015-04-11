// chrome.extension
// -----------------
// ref:
//   - https://developer.chrome.com/extensions/extension
//   - http://chrome.liuyixi.com/extension.html

(function (root, factory) {
    'use strict';

    if ('function' === typeof define && define.amd) {
        define([], factory);
    } else {
        root.extension = factory();
    }

}(window, function () {
    'use strict';

    var extension = {
        // 扩展或应用的完整根路径
        baseURI: chrome.extension.getURL(''),

        /* *
         * 将一个相对扩展或应用根目录的相对路径转换为完全路径
         *
         * @method getURL
         * @param {String} path 扩展或应用中的资源路径
         * @returns {String} 完整路径
         * */
        getURL: function (path) {
            var fullPath = this.baseURI;

            if (path && 'string' === typeof path) {
                fullPath += path[0] === '/' ? path.substr(1) : path;
            }

            return fullPath;
        },

        /* *
         * 获取运行在当前扩展或应用中页面的 window 对象
         *
         * @method getViews
         * @param {Object} (optional) fetchProperties
         * @returns {Window} window 对象
         * */
        getViews: function (fetchProperties) {
            return chrome.extension.getViews(fetchProperties);
        },

        /* *
         * 获取扩展或应用 backgroundPage 的 window 对象
         *
         * @method getBackgroundPage
         * */
        getBackgroundPage: function () {
            return chrome.extension.getBackgroundPage();
        },

        /* *
         * 获取扩展或应用是否可以在隐身模式下启用，这取决于用于在浏览器中的设置
         *
         * @method isAllowedIncognitoAccess
         * */
        isAllowedIncognitoAccess: function () {
            return new Promise(function (resolve) {
                chrome.extension.isAllowedIncognitoAccess(function (isAllowedAccess) {
                    resolve(isAllowedAccess);
                });
            });
        },

        /* *
         * 获取扩展或应用是否可以访问文件网址，这取决于用于在浏览器中的设置
         *
         * @method isAllowedIncognitoAccess
         * */
        isAllowedFileSchemeAccess: function () {
            return new Promise(function (resolve) {
                chrome.extension.isAllowedFileSchemeAccess(function (isAllowedAccess) {
                    resolve(isAllowedAccess);
                });
            });
        },

        /* *
         * 设置扩展或应用的更新路径，托管在 Chrome 应用中心的扩展或应用将忽略方法
         *
         * @method setUpdateUrlData
         * @param {String} data 扩展或应用中的更新路径
         * */
        setUpdateUrlData: function (data) {
            chrome.extension.setUpdateUrlData(data);
        }
    };

    return Object.freeze(extension);
}));