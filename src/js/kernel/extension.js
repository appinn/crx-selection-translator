// chrome.extension
// -----------------
// ref:
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
        // 扩展或应用的 ID
        id: chrome.runtime.id,
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
         * 向扩展或应用发送消息
         *
         * @method sendMessage
         * @param {String} extensionId 扩展或应用中的 ID，省略时表示发送给自己
         * @param {Any} message 消息内容
         * @returns {Promise}
         * */
        sendMessage: function (extensionId, message) {
            var argsCount = arguments.length;
            if (!argsCount) {
                return;
            }

            var hasExtensionId = argsCount === 2;

            if (argsCount === 1) {
                message = extensionId;
            }

            return new Promise(function (resolve, reject) {
                function cb(response) {
                    var error = chrome.extension.lastError;
                    error ? reject(error) : resolve(response);
                }

                hasExtensionId
                    ? chrome.extension.sendMessage(extensionId, message, cb)
                    : chrome.extension.sendMessage(message, cb);
            });
        }
    };

    return Object.freeze(extension);
}));